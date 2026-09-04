import type { Job } from '@/types/job';
import JobCard from './JobCard';

interface JobListProps {
  jobs: Job[];
  title?: string;
  showCount?: boolean;
}

export default function JobList({ jobs, title, showCount = true }: JobListProps) {
  return (
    <section>
      {(title || showCount) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-[var(--color-text)]">{title}</h2>
          )}
          {showCount && (
            <p className="text-sm text-[var(--color-text-secondary)]">
              {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
            </p>
          )}
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-[var(--color-bg-subtle)] rounded-[var(--radius-lg)] border border-[var(--color-border)]">
          <p className="text-[var(--color-text-secondary)]">
            No jobs found matching your criteria.
          </p>
          <p className="text-sm text-[var(--color-text-tertiary)] mt-1">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
}
