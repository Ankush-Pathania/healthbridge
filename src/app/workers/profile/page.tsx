'use client';

import Container from '@/components/ui/Container';
import RequireRole from '@/components/auth/RequireRole';
import WorkerProfileForm from '@/components/workers/WorkerProfileForm';

export default function WorkerProfilePage() {
  return (
    <RequireRole role="worker">
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">Post Your Profile</h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Tell employers who you are, where you work, and when you&apos;re available.
          </p>
          <WorkerProfileForm />
        </Container>
      </section>
    </RequireRole>
  );
}
