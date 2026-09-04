'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getWorkerApplications } from '@/lib/firebase/applications';
import { formatRelativeDate } from '@/lib/utils';
import type { JobApplication } from '@/types/application';

export default function WorkerApplications({ uid }: { uid: string }) {
  const [applications, setApplications] = useState<JobApplication[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getWorkerApplications(uid)
      .then((result) => {
        if (!cancelled) setApplications(result);
      })
      .catch((err) => {
        console.error('[applications] failed to load', err);
        if (!cancelled) setError('Could not load your applications.');
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">My Applications</h2>

      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}

      {!error && applications === null && (
        <p className="text-sm text-[var(--color-text-secondary)]">Loading…</p>
      )}

      {applications?.length === 0 && (
        <div className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            You haven&apos;t applied to any jobs yet.
          </p>
          <Button href="/jobs" size="sm">
            Browse Jobs
          </Button>
        </div>
      )}

      {applications && applications.length > 0 && (
        <ul className="flex flex-col gap-3 list-none p-0 m-0">
          {applications.map((app) => (
            <li
              key={app.id}
              className="flex items-center justify-between gap-4 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]"
            >
              <div className="min-w-0">
                <Link
                  href={`/jobs/${app.jobSlug}`}
                  className="font-medium text-[var(--color-text)] hover:text-[var(--color-primary-dark)] no-underline"
                >
                  {app.jobTitle}
                </Link>
                <p className="text-sm text-[var(--color-text-secondary)] truncate">
                  {app.employerName} · Applied {formatRelativeDate(app.appliedAt)}
                </p>
              </div>
              <Badge variant="success" className="flex-shrink-0">
                Applied
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
