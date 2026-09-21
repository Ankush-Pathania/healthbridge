'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WorkerApplications from '@/components/account/WorkerApplications';
import WorkerProfileCard from '@/components/account/WorkerProfileCard';
import EmployerJobs from '@/components/account/EmployerJobs';
import SubscriptionStatus from '@/components/account/SubscriptionStatus';
import { useAuth } from '@/lib/auth/auth-context';

export default function AccountPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  if (loading || !user) {
    return (
      <section className="py-16">
        <Container size="narrow">
          <p className="text-[var(--color-text-secondary)]">Loading...</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center text-xl font-semibold flex-shrink-0 overflow-hidden">
            {user.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoUrl} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              user.displayName.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">{user.displayName}</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">{user.email}</p>
          </div>
          <Badge variant="primary" className="ml-auto">
            {user.role === 'worker' ? 'Healthcare Worker' : 'Employer'}
          </Badge>
        </div>

        {/* Employer dashboard shortcut */}
        {user.role === 'employer' && (
          <div className="mb-6 p-4 bg-[var(--color-primary-light)] border border-[var(--color-primary)] rounded-[var(--radius-lg)] flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-[var(--color-primary-dark)] text-sm">Employer Dashboard</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                Review applications and approve candidates
              </p>
            </div>
            <Button href="/dashboard" size="sm">
              Go to Dashboard
            </Button>
          </div>
        )}

        <SubscriptionStatus />

        {user.role === 'worker' ? (
          <>
            <WorkerProfileCard uid={user.uid} />
            <WorkerApplications uid={user.uid} />
          </>
        ) : (
          <EmployerJobs uid={user.uid} />
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button href={user.role === 'worker' ? '/jobs' : '/dashboard'} size="lg">
            {user.role === 'worker' ? 'Browse Jobs' : 'Manage Applications'}
          </Button>
          <Button variant="secondary" size="lg" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </Container>
    </section>
  );
}