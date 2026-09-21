'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import RequireRole from '@/components/auth/RequireRole';
import WorkerProfileForm from '@/components/workers/WorkerProfileForm';
import { useAuth } from '@/lib/auth/auth-context';
import { getWorkerProfile } from '@/lib/firebase/worker-profiles';

export default function WorkerProfilePage() {
  const { user } = useAuth();
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (!user) return;
    getWorkerProfile(user.uid)
      .then((profile) => setHasProfile(Boolean(profile)))
      .catch(() => setHasProfile(false));
  }, [user]);

  return (
    <RequireRole role="worker">
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            {hasProfile ? 'Edit Profile' : 'Post Your Profile'}
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Tell employers who you are, where you work, and when you&apos;re available.
          </p>
          <WorkerProfileForm />
        </Container>
      </section>
    </RequireRole>
  );
}
