'use client';

import { useEffect, useState } from 'react';
import Badge from '@/components/ui/Badge';
import { getWorkerProfiles } from '@/lib/firebase/worker-profiles';
import { JOB_CATEGORIES } from '@/lib/constants';
import type { WorkerProfile } from '@/types/worker';

export default function WorkerProfilesList() {
  const [profiles, setProfiles] = useState<WorkerProfile[] | null>(null);

  useEffect(() => {
    getWorkerProfiles()
      .then(setProfiles)
      .catch((err) => {
        console.error('[workers] failed to load profiles', err);
        setProfiles([]);
      });
  }, []);

  if (profiles === null) {
    return <p className="text-sm text-[var(--color-text-secondary)]">Loading workers…</p>;
  }

  if (profiles.length === 0) {
    return (
      <div className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <p className="text-sm text-[var(--color-text-secondary)]">
          No worker profiles have been posted yet.
        </p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
      {profiles.map((profile) => {
        const category = JOB_CATEGORIES.find((cat) => cat.slug === profile.category);
        return (
          <li
            key={profile.id}
            className="p-5 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]"
          >
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-[var(--color-primary-light)] overflow-hidden flex-shrink-0 flex items-center justify-center">
                {profile.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.photoUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-base font-semibold text-[var(--color-primary-dark)]">
                    {profile.displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold text-[var(--color-text)]">{profile.displayName}</h3>
                  <Badge variant={profile.availableForWork ? 'success' : 'default'}>
                    {profile.availableForWork ? 'Available' : 'Not available'}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-[var(--color-text)] mb-1">{profile.headline}</p>
                <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                  {category?.label || profile.category} · {profile.location.city}, {profile.location.provinceCode} ·{' '}
                  {profile.experience} yr{profile.experience === 1 ? '' : 's'}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">{profile.summary}</p>
                {profile.certifications.length > 0 && (
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    {profile.certifications.join(' · ')}
                  </p>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
