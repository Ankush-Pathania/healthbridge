'use client';

import { formatRelativeDate } from '@/lib/utils';
import type { Job } from '@/types/job';
import type { JobApplication } from '@/types/application';

interface Props {
  jobs: Job[];
  applications: JobApplication[];
  selectedJobId: string | null;
  onSelect: (jobId: string) => void;
}

export default function JobSidebar({ jobs, applications, selectedJobId, onSelect }: Props) {
  if (jobs.length === 0) {
    return (
      <div className="p-4 text-sm text-[var(--color-text-secondary)]">
        No job posts yet.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-1 list-none p-0 m-0">
      {jobs.map((job) => {
        const count = applications.filter((a) => a.jobId === job.id).length;
        const isSelected = selectedJobId === job.id;

        return (
          <li key={job.id}>
            <button
              id={'job-sidebar-' + job.id}
              onClick={() => onSelect(job.id)}
              aria-pressed={isSelected}
              className={'w-full text-left px-4 py-3 rounded-[var(--radius-lg)] transition-colors cursor-pointer ' + (isSelected ? 'bg-[var(--color-primary-light)] border border-[var(--color-primary)]' : 'hover:bg-[var(--color-bg-subtle)] border border-transparent')}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={'text-sm font-medium truncate ' + (isSelected ? 'text-[var(--color-primary-dark)]' : 'text-[var(--color-text)]')}>
                  {job.title}
                </span>
                <span className={'text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ' + (count > 0 ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-tertiary)]')}>
                  {count}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">
                {job.location.city}, {job.location.provinceCode} · {formatRelativeDate(job.postedAt)}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}