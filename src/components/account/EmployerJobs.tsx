'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getEmployerJobs } from '@/lib/firebase/jobs';
import { getEmployerApplications } from '@/lib/firebase/applications';
import { formatRelativeDate } from '@/lib/utils';
import type { Job } from '@/types/job';
import type { JobApplication } from '@/types/application';

export default function EmployerJobs({ uid }: { uid: string }) {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getEmployerJobs(uid), getEmployerApplications(uid)])
      .then(([nextJobs, nextApplications]) => {
        if (cancelled) return;
        setJobs(nextJobs);
        setApplications(nextApplications);
      })
      .catch((err) => {
        console.error('[employer jobs] failed to load', err);
        if (!cancelled) setError('Could not load your job posts.');
      });
    return () => {
      cancelled = true;
    };
  }, [uid]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">My Job Posts</h2>
        <Button href="/jobs/new" size="sm">
          Post a Job
        </Button>
      </div>

      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}

      {!error && jobs === null && (
        <p className="text-sm text-[var(--color-text-secondary)]">Loading…</p>
      )}

      {jobs?.length === 0 && (
        <div className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            You haven&apos;t posted a job yet.
          </p>
          <Button href="/jobs/new" size="sm">
            Post a Job
          </Button>
        </div>
      )}

      {jobs && jobs.length > 0 && (
        <ul className="flex flex-col gap-4 list-none p-0 m-0">
          {jobs.map((job) => {
            const applicants = applications.filter((app) => app.jobId === job.id);
            return (
              <li
                key={job.id}
                className="p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <Link
                      href={`/jobs/${job.slug}`}
                      className="font-medium text-[var(--color-text)] hover:text-[var(--color-primary-dark)] no-underline"
                    >
                      {job.title}
                    </Link>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {job.location.city}, {job.location.provinceCode} · Posted {formatRelativeDate(job.postedAt)}
                    </p>
                  </div>
                  <Badge variant="primary">{applicants.length} applicant{applicants.length === 1 ? '' : 's'}</Badge>
                </div>
                {applicants.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-tertiary)]">No applications yet.</p>
                ) : (
                  <ul className="flex flex-col gap-2 list-none p-0 m-0 mt-3">
                    {applicants.map((app) => (
                      <li key={app.id} className="text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-[var(--color-text)]">
                          {app.workerName || 'Healthcare worker'}
                        </span>
                        {app.workerEmail ? ` · ${app.workerEmail}` : ''} · Applied {formatRelativeDate(app.appliedAt)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
