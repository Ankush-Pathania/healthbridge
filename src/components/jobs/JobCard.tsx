import Link from 'next/link';
import type { Job } from '@/types/job';
import { formatSalary, formatRelativeDate, cn } from '@/lib/utils';
import { JOB_TYPE_LABELS, JOB_CATEGORIES } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import CategoryIcon from '@/components/icons/CategoryIcons';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const categoryLabel =
    JOB_CATEGORIES.find((c) => c.slug === job.category)?.shortLabel || job.category;
  const typeLabel = JOB_TYPE_LABELS[job.type] || job.type;

  return (
    <article
      className={cn(
        'bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] p-5',
        'hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-strong)] transition-all duration-[var(--transition-fast)]',
        job.featured && 'border-l-3 border-l-[var(--color-primary)]'
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-3.5">
          {/* Category icon chip */}
          <div className="flex-shrink-0 w-10 h-10 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center">
            <CategoryIcon category={job.category} size={20} />
          </div>

          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {/* Title */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-[var(--color-text)] leading-snug">
                <Link
                  href={`/jobs/${job.slug}`}
                  className="hover:text-[var(--color-primary)] no-underline text-[var(--color-text)]"
                >
                  {job.title}
                </Link>
              </h3>
              {job.urgent && <Badge variant="urgent">Urgent</Badge>}
            </div>

            {/* Employer & Location */}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-[var(--color-text-secondary)]">
                {job.employer.name}
                {job.employer.verified && (
                  <span className="inline-flex items-center ml-1" title="Verified employer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-primary)" aria-label="Verified" role="img">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </span>
                )}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {job.location.city}, {job.location.provinceCode}
              </p>
            </div>

            {/* Meta: Type, Salary */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{typeLabel}</Badge>
              <Badge variant="primary">{categoryLabel}</Badge>
              <span className="text-sm font-medium text-[var(--color-text)]">
                {formatSalary(job.salary)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer: Posted date + View link */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {formatRelativeDate(job.postedAt)}
          </span>
          <Link
            href={`/jobs/${job.slug}`}
            className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline"
          >
            View Job →
          </Link>
        </div>
      </div>
    </article>
  );
}
