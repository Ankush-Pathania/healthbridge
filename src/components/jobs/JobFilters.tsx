'use client';

import { useState } from 'react';
import { JOB_CATEGORIES, JOB_TYPE_LABELS } from '@/lib/constants';
import type { JobCategory, JobType } from '@/types/job';

interface JobFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  categories: JobCategory[];
  types: JobType[];
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [types, setTypes] = useState<JobType[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleCategory(slug: JobCategory) {
    const updated = categories.includes(slug)
      ? categories.filter((c) => c !== slug)
      : [...categories, slug];
    setCategories(updated);
    onFilterChange?.({ categories: updated, types });
  }

  function toggleType(type: JobType) {
    const updated = types.includes(type)
      ? types.filter((t) => t !== type)
      : [...types, type];
    setTypes(updated);
    onFilterChange?.({ categories, types: updated });
  }

  function clearAll() {
    setCategories([]);
    setTypes([]);
    onFilterChange?.({ categories: [], types: [] });
  }

  const hasFilters = categories.length > 0 || types.length > 0;

  return (
    <aside aria-label="Job filters">
      {/* Mobile toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] text-sm font-medium text-[var(--color-text)] lg:hidden"
        aria-expanded={isExpanded}
      >
        <span>Filters {hasFilters && `(${categories.length + types.length})`}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Filter panels */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block mt-3 lg:mt-0`}>
        <div className="flex flex-col gap-6">
          {/* Header with clear */}
          {hasFilters && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--color-text)]">Active Filters</span>
              <button
                onClick={clearAll}
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Category Filter */}
          <fieldset className="border-none p-0 m-0">
            <legend className="text-sm font-semibold text-[var(--color-text)] mb-2">
              Category
            </legend>
            <div className="flex flex-col gap-1.5">
              {JOB_CATEGORIES.map((cat) => (
                <label
                  key={cat.slug}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-muted)] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={categories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    className="w-4 h-4 rounded accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-text)]">{cat.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Job Type Filter */}
          <fieldset className="border-none p-0 m-0">
            <legend className="text-sm font-semibold text-[var(--color-text)] mb-2">
              Job Type
            </legend>
            <div className="flex flex-col gap-1.5">
              {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-bg-muted)] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={types.includes(value as JobType)}
                    onChange={() => toggleType(value as JobType)}
                    className="w-4 h-4 rounded accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-[var(--color-text)]">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </aside>
  );
}
