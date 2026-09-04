import type { Metadata } from 'next';
import Link from 'next/link';
import AuthCard from '@/components/auth/AuthCard';
import SignupForm from '@/components/auth/SignupForm';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Create an Account',
  description: `Create a ${SITE_NAME} account as a healthcare worker or employer.`,
};

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      subtitle="Join as a healthcare worker or an employer."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-primary)] font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
