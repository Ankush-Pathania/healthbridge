'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { SearchIcon, MapPinIcon } from '@/components/icons/UtilityIcons';

export default function JobSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set('q', keyword.trim());
    if (location.trim()) params.set('location', location.trim());
    router.push(`/jobs${params.toString() ? `?${params.toString()}` : ''}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-[700px]"
      role="search"
      aria-label="Search healthcare jobs"
    >
      <div className="flex-1 relative">
        <label htmlFor="job-search-keyword" className="sr-only">
          Job title or keyword
        </label>
        <SearchIcon
          size={20}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
        />
        <input
          id="job-search-keyword"
          type="text"
          placeholder="Job title or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white pl-11 pr-4 py-3 text-base text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
        />
      </div>
      <div className="flex-1 relative">
        <label htmlFor="job-search-location" className="sr-only">
          City or province
        </label>
        <MapPinIcon
          size={20}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
        />
        <input
          id="job-search-location"
          type="text"
          placeholder="City or province"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white pl-11 pr-4 py-3 text-base text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-colors"
        />
      </div>
      <Button type="submit" size="lg" className="sm:w-auto whitespace-nowrap">
        Search Jobs
      </Button>
    </form>
  );
}
