'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WorkerApplications from '@/components/account/WorkerApplications';
import WorkerProfileCard from '@/components/account/WorkerProfileCard';
import EmployerJobs from '@/components/account/EmployerJobs';
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
          <p className="text-[var(--color-text-secondary)]">Loading…</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center text-xl font-semibold flex-shrink-0">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text)]">{user.displayName}</h1>
            <p className="text-sm text-[var(--color-text-secondary)]">{user.email}</p>
          </div>
          <Badge variant="primary" className="ml-auto">
            {user.role === 'worker' ? 'Healthcare Worker' : 'Employer'}
          </Badge>
        </div>

        {user.role === 'worker' ? (
          <>
            <WorkerProfileCard uid={user.uid} />
            <WorkerApplications uid={user.uid} />
          </>
        ) : (
          <EmployerJobs uid={user.uid} />
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button href={user.role === 'worker' ? '/jobs' : '/jobs/new'} size="lg">
            {user.role === 'worker' ? 'Browse Jobs' : 'Post a Job'}
          </Button>
          <Button variant="secondary" size="lg" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </Container>
    </section>
  );
}
