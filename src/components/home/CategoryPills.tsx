import Link from 'next/link';
import { JOB_CATEGORIES } from '@/lib/constants';

export default function CategoryPills() {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
      <Link
        href="/jobs"
        className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-primary)] text-white no-underline"
      >
        All Jobs
      </Link>
      {JOB_CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/jobs?category=${cat.slug}`}
          className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-bg-muted)] text-[var(--color-text)] hover:bg-[var(--color-primary-light)] no-underline transition-colors"
        >
          {cat.shortLabel}
        </Link>
      ))}
    </div>
  );
}
