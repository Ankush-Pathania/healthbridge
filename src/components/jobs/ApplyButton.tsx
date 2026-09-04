'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/auth-context';
import { applyToJob, hasApplied } from '@/lib/firebase/applications';
import type { Job } from '@/types/job';

export default function ApplyButton({ job }: { job: Job }) {
  const { user, loading } = useAuth();
  const [applied, setApplied] = useState(false);
  const [checkingApplied, setCheckingApplied] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isWorker = user?.role === 'worker';

  useEffect(() => {
    if (!isWorker || !user) return;

    let cancelled = false;
    hasApplied(user.uid, job.id)
      .then((result) => {
        if (!cancelled) setApplied(result);
      })
      .finally(() => {
        if (!cancelled) setCheckingApplied(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isWorker, user, job.id]);

  async function handleApply() {
    if (!user) return;
    setSubmitting(true);
    setError(null);
    try {
      await applyToJob(user.uid, job, { displayName: user.displayName, email: user.email });
      setApplied(true);
    } catch {
      setError('Could not submit your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || (isWorker && checkingApplied)) {
    return (
      <Button size="lg" disabled>
        Apply for This Job
      </Button>
    );
  }

  if (!user) {
    return (
      <Button size="lg" href={`/login?redirect=/jobs/${job.slug}`}>
        Sign In to Apply
      </Button>
    );
  }

  if (!isWorker) {
    return (
      <Button size="lg" disabled title="Employer accounts can't apply to jobs">
        Apply for This Job
      </Button>
    );
  }

  if (applied) {
    return (
      <Button size="lg" disabled>
        ✓ Applied
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button size="lg" onClick={handleApply} disabled={submitting}>
        {submitting ? 'Submitting…' : 'Apply for This Job'}
      </Button>
      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
