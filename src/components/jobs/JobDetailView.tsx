import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ApplyButton from '@/components/jobs/ApplyButton';
import { formatSalary, formatRelativeDate } from '@/lib/utils';
import { JOB_TYPE_LABELS, JOB_CATEGORIES, SHIFT_TYPE_LABELS } from '@/lib/constants';
import type { Job } from '@/types/job';

export default function JobDetailView({ job }: { job: Job }) {
  const categoryLabel = JOB_CATEGORIES.find((c) => c.slug === job.category)?.label || job.category;
  const typeLabel = JOB_TYPE_LABELS[job.type] || job.type;
  const shiftLabel = SHIFT_TYPE_LABELS[job.shift] || job.shift;

  return (
    <section className="py-8 sm:py-12">
      <Container size="narrow">
        <nav className="mb-6 text-sm text-[var(--color-text-secondary)]" aria-label="Breadcrumb">
          <Link href="/jobs" className="hover:text-[var(--color-text)] no-underline text-[var(--color-text-secondary)]">
            Jobs
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--color-text)]">{job.title}</span>
        </nav>

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {job.urgent && <Badge variant="urgent">Urgent</Badge>}
            {job.featured && <Badge variant="primary">Featured</Badge>}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mb-2">
            {job.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)]">
            {job.employer.name}
            {job.employer.verified && (
              <span className="inline-flex items-center ml-1" title="Verified employer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--color-primary)" aria-label="Verified" role="img">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)] mb-8">
          <div>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5">Location</p>
            <p className="text-sm font-medium text-[var(--color-text)]">
              {job.location.city}, {job.location.provinceCode}
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5">Job Type</p>
            <p className="text-sm font-medium text-[var(--color-text)]">{typeLabel}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5">Salary</p>
            <p className="text-sm font-medium text-[var(--color-text)]">{formatSalary(job.salary)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-tertiary)] mb-0.5">Shift</p>
            <p className="text-sm font-medium text-[var(--color-text)]">{shiftLabel}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">About This Role</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">{job.description}</p>
        </div>

        {job.requirements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">Requirements</h2>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {job.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-primary)] mt-1 flex-shrink-0">•</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}

        {job.benefits.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">Benefits</h2>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {job.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                  <span className="text-[var(--color-success)] mt-1 flex-shrink-0">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8 p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
            <span>
              Category: <strong className="text-[var(--color-text)]">{categoryLabel}</strong>
            </span>
            <span>
              Posted: <strong className="text-[var(--color-text)]">{formatRelativeDate(job.postedAt)}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <ApplyButton job={job} />
          <Button variant="secondary" size="lg" href="/jobs">
            ← Back to Jobs
          </Button>
        </div>
      </Container>
    </section>
  );
}
