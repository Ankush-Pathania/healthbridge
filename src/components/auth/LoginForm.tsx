'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import OAuthDivider from './OAuthDivider';
import { useAuth } from '@/lib/auth/auth-context';
import { AuthError } from '@/types/auth';

// Read directly from window rather than useSearchParams() so this page can
// stay statically prerendered instead of needing a Suspense boundary.
function getRedirectTarget(): string {
  if (typeof window === 'undefined') return '/account';
  const redirect = new URLSearchParams(window.location.search).get('redirect');
  return redirect && redirect.startsWith('/') ? redirect : '/account';
}

export default function LoginForm() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Enter your email and password.');
      return;
    }

    setSubmitting(true);
    try {
      await signIn({ email, password });
      router.push(getRedirectTarget());
    } catch (err) {
      setError(err instanceof AuthError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle('worker');
      router.push(getRedirectTarget());
    } catch (err) {
      setError(err instanceof AuthError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex justify-end -mt-2">
          <Link
            href="/forgot-password"
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" disabled={submitting} className="w-full">
          {submitting ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>

      <OAuthDivider />

      <Button
        type="button"
        variant="secondary"
        size="lg"
        onClick={handleGoogle}
        disabled={submitting}
        className="w-full"
      >
        Continue with Google
      </Button>
    </div>
  );
}
