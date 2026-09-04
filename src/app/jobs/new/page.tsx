'use client';

import Container from '@/components/ui/Container';
import RequireRole from '@/components/auth/RequireRole';
import PostJobForm from '@/components/jobs/PostJobForm';

export default function NewJobPage() {
  return (
    <RequireRole role="employer">
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">Post a Job</h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Share an opening and workers can apply from the jobs board.
          </p>
          <PostJobForm />
        </Container>
      </section>
    </RequireRole>
  );
}
