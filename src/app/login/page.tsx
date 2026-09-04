import type { Metadata } from 'next';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import LoginForm from '@/components/auth/LoginForm';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sign In',
  description: `Sign in to your ${SITE_NAME} account to manage your job applications or postings.`,
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to manage your applications and profile."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[var(--color-primary)] font-medium">
            Sign up
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
