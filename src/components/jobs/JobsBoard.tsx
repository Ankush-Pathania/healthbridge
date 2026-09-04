'use client';

import { useEffect, useMemo, useState } from 'react';
import JobList from './JobList';
import JobFilters, { type FilterState } from './JobFilters';
import { getPostedJobs } from '@/lib/firebase/jobs';
import type { Job } from '@/types/job';

export default function JobsBoard({
  city,
  limit,
  title = 'All Jobs',
  showFilters = true,
  showCount = true,
}: {
  city?: string;
  limit?: number;
  title?: string;
  showFilters?: boolean;
  showCount?: boolean;
}) {
  const [postedJobs, setPostedJobs] = useState<Job[] | null>(null);
  const [filters, setFilters] = useState<FilterState>({ categories: [], types: [] });

  useEffect(() => {
    getPostedJobs()
      .then(setPostedJobs)
      .catch((err) => {
        console.error('[jobs] failed to load posted jobs', err);
        setPostedJobs([]);
      });
  }, []);

  const jobs = useMemo(() => {
    if (!postedJobs) return [];

    return postedJobs
      .filter((job) => {
        const cityOk = !city || job.location.city.toLowerCase() === city.toLowerCase();
        const categoryOk = filters.categories.length === 0 || filters.categories.includes(job.category);
        const typeOk = filters.types.length === 0 || filters.types.includes(job.type);
        return cityOk && categoryOk && typeOk;
      })
      .slice(0, limit ?? postedJobs.length);
  }, [postedJobs, filters, city, limit]);

  if (postedJobs === null) {
    return <p className="text-sm text-[var(--color-text-secondary)]">Loading jobs…</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {showFilters && (
        <div className="lg:w-[260px] flex-shrink-0">
          <JobFilters onFilterChange={setFilters} />
        </div>
      )}
      <div className="flex-1">
        <JobList jobs={jobs} title={title} showCount={showCount} />
      </div>
    </div>
  );
}
