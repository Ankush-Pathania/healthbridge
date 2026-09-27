'use client';

import { useEffect, Suspense } from 'react';
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
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center text-xl font-semibold flex-shrink-0 overflow-hidden border-2 border-[var(--color-primary)]">
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
            {user.role === 'worker' ? 'Healthcare Worker' : 'Employer Account'}
          </Badge>
        </div>

        {/* Employer dashboard shortcut */}
        {user.role === 'employer' && (
          <div className="mb-6 p-4 bg-[var(--color-primary-light)] border border-[var(--color-primary)] rounded-[var(--radius-lg)] flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[var(--color-primary-dark)] text-sm">Employer Portal</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                Review candidate applications, download resumes, and manage active job listings
              </p>
            </div>
            <Button href="/dashboard" size="sm">
              Go to Dashboard
            </Button>
          </div>
        )}

        <Suspense fallback={null}>
          <SubscriptionStatus />
        </Suspense>

        {user.role === 'worker' ? (
          <>
            <WorkerProfileCard uid={user.uid} />
            <WorkerApplications uid={user.uid} />
          </>
        ) : (
          <EmployerJobs uid={user.uid} />
        )}

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row gap-3">
          {user.role === 'worker' ? (
            <>
              <Button href="/jobs" size="lg">
                Browse Jobs
              </Button>
              <Button href="/workers/profile" variant="secondary" size="lg">
                Edit Profile & Resume
              </Button>
            </>
          ) : (
            <>
              <Button href="/dashboard" size="lg">
                Manage Applications
              </Button>
              <Button href="/jobs/new" variant="secondary" size="lg">
                Post a New Job
              </Button>
            </>
          )}
          <Button variant="ghost" size="lg" onClick={handleSignOut} className="sm:ml-auto">
            Sign Out
          </Button>
        </div>
      </Container>
    </section>
  );
}