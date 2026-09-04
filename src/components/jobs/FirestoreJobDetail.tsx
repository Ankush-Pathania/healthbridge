'use client';

import { useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import JobDetailView from './JobDetailView';
import { getPostedJobBySlug } from '@/lib/firebase/jobs';
import type { Job } from '@/types/job';

export default function FirestoreJobDetail({ slug }: { slug: string }) {
  const [job, setJob] = useState<Job | null | undefined>(undefined);

  useEffect(() => {
    getPostedJobBySlug(slug).then(setJob);
  }, [slug]);

  if (job === undefined) {
    return (
      <section className="py-16">
        <Container size="narrow">
          <p className="text-[var(--color-text-secondary)]">Loading…</p>
        </Container>
      </section>
    );
  }

  if (job === null) {
    return (
      <section className="py-16">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-3">Job not found</h1>
            <p className="text-[var(--color-text-secondary)] mb-6">
              This posting may have been filled or removed.
            </p>
            <Button href="/jobs">Browse Jobs</Button>
          </div>
        </Container>
      </section>
    );
  }

  return <JobDetailView job={job} />;
}
