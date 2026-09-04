'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import OAuthDivider from './OAuthDivider';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/auth-context';
import { AuthError, type UserRole } from '@/types/auth';

const MIN_PASSWORD_LENGTH = 8;
const ROLES: { value: UserRole; label: string }[] = [
  { value: 'worker', label: "I'm a Healthcare Worker" },
  { value: 'employer', label: "I'm an Employer" },
];

export default function SignupForm() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();

  const [role, setRole] = useState<UserRole>('worker');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!displayName.trim()) errors.displayName = 'Enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (password.length < MIN_PASSWORD_LENGTH) {
      errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    if (confirmPassword !== password) errors.confirmPassword = 'Passwords do not match.';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await signUp({ email, password, displayName, role });
      router.push('/account');
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setFormError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle(role);
      router.push('/account');
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        className="grid grid-cols-2 gap-1 p-1 bg-[var(--color-bg-muted)] rounded-[var(--radius-md)]"
        role="radiogroup"
        aria-label="Account type"
      >
        {ROLES.map((r) => (
          <button
            key={r.value}
            type="button"
            role="radio"
            aria-checked={role === r.value}
            onClick={() => setRole(r.value)}
            className={cn(
              'px-2 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-colors',
              role === r.value
                ? 'bg-white text-[var(--color-text)] shadow-sm'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            )}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label={role === 'worker' ? 'Full name' : 'Contact name'}
          name="displayName"
          autoComplete="name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          error={fieldErrors.displayName}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          required
        />
        <Input
          label="Confirm password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          required
        />

        {formError && (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {formError}
          </p>
        )}

        <p className="text-xs text-[var(--color-text-tertiary)] leading-relaxed">
          By creating an account you agree to our{' '}
          <a href="/terms" className="text-[var(--color-primary)]">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-[var(--color-primary)]">Privacy Policy</a>.
        </p>

        <Button type="submit" size="lg" disabled={submitting} className="w-full">
          {submitting ? 'Creating account…' : 'Create Account'}
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
