'use client';

import { useState, useCallback } from 'react';
import ApplicantCard from './ApplicantCard';
import { updateApplicationStatus } from '@/lib/firebase/applications';
import type { JobApplication, ApplicationStatus } from '@/types/application';
import type { Job } from '@/types/job';

interface Props {
  job: Job;
  applications: JobApplication[];
  onApplicationUpdated: (id: string, status: ApplicationStatus) => void;
}

export default function ApplicantList({ job, applications, onApplicationUpdated }: Props) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const handleStatusChange = useCallback(
    async (applicationId: string, status: ApplicationStatus) => {
      setUpdatingId(applicationId);
      setErrorId(null);
      onApplicationUpdated(applicationId, status);
      try {
        await updateApplicationStatus(applicationId, status);
      } catch (err) {
        console.error('[dashboard] failed to update status', err);
        setErrorId(applicationId);
        onApplicationUpdated(applicationId, 'applied');
      } finally {
        setUpdatingId(null);
      }
    },
    [onApplicationUpdated]
  );

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">{job.title}</h2>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {job.location.city}, {job.location.provinceCode} · {applications.length}{' '}
          {applications.length === 1 ? 'applicant' : 'applicants'}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="p-8 text-center bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text-secondary)] text-sm">No applications yet for this job post.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3 list-none p-0 m-0">
          {applications.map((app) => (
            <li key={app.id}>
              {errorId === app.id && (
                <p className="text-xs text-[var(--color-error)] mb-1 pl-1" role="alert">
                  Could not update — please try again.
                </p>
              )}
              <ApplicantCard
                application={app}
                onStatusChange={handleStatusChange}
                isUpdating={updatingId === app.id}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}