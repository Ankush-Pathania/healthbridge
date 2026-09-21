import Link from 'next/link';
import type { Job } from '@/types/job';
import { formatSalary, formatRelativeDate, cn } from '@/lib/utils';
import { JOB_TYPE_LABELS, JOB_CATEGORIES, CATEGORY_ACCENT } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import CategoryIcon from '@/components/icons/CategoryIcons';

interface JobCardProps {
  job: Job;
  /** True when the viewer must subscribe to see salary/description — everyone except an actively-subscribed worker. */
  locked?: boolean;
}

const ACCENT_CHIP_STYLES: Record<string, string> = {
  yellow: 'bg-[var(--color-pastel-yellow)] text-[var(--color-pastel-yellow-fg)]',
  green: 'bg-[var(--color-pastel-green)] text-[var(--color-pastel-green-fg)]',
  pink: 'bg-[var(--color-pastel-pink)] text-[var(--color-pastel-pink-fg)]',
  blue: 'bg-[var(--color-pastel-blue)] text-[var(--color-pastel-blue-fg)]',
};

export default function JobCard({ job, locked = false }: JobCardProps) {
  const categoryLabel =
    JOB_CATEGORIES.find((c) => c.slug === job.category)?.shortLabel || job.category;
  const typeLabel = JOB_TYPE_LABELS[job.type] || job.type;
  const accent = CATEGORY_ACCENT[job.category];

  return (
    <article
      className={cn(
        'bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-5',
        'hover:shadow-[var(--shadow-xl)] hover:border-[var(--color-border-strong)] transition-all duration-[var(--transition-fast)]',
        job.featured && 'border-l-4 border-l-[var(--color-accent)]'
      )}
    >
      <div className="flex flex-col gap-3">
        <div className="flex gap-3.5">
          {/* Category icon chip */}
          <div
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
              ACCENT_CHIP_STYLES[accent]
            )}
          >
            <CategoryIcon category={job.category} size={20} />
          </div>

          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {/* Title */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-[var(--color-text)] leading-snug">
                {locked ? (
                  job.title
                ) : (
                  <Link
                    href={`/jobs/${job.slug}`}
                    className="hover:text-[var(--color-primary)] no-underline text-[var(--color-text)]"
                  >
                    {job.title}
                  </Link>
                )}
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
              <span
                className={cn(
                  'text-sm font-medium text-[var(--color-text)]',
                  locked && 'blur-sm select-none'
                )}
                aria-hidden={locked || undefined}
              >
                {formatSalary(job.salary)}
              </span>
            </div>

            {locked && (
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed blur-sm select-none pointer-events-none line-clamp-2" aria-hidden="true">
                {job.description}
              </p>
            )}
          </div>
        </div>

        {/* Footer: Posted date + View link */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-text-tertiary)]">
            {formatRelativeDate(job.postedAt)}
          </span>
          {locked ? (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--color-primary)] bg-[var(--color-pastel-yellow)] hover:bg-[var(--color-pastel-yellow)]/80 no-underline transition-colors"
            >
              Subscribe to view →
            </Link>
          ) : (
            <Link
              href={`/jobs/${job.slug}`}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--color-primary)] bg-[var(--color-bg-muted)] hover:bg-[var(--color-primary-light)] no-underline transition-colors"
            >
              View Job →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
