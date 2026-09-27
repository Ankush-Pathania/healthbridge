'use client';

import { useEffect, useState } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import CandidateProfileModal from '@/components/workers/CandidateProfileModal';
import { getWorkerProfiles } from '@/lib/firebase/worker-profiles';
import { JOB_CATEGORIES } from '@/lib/constants';
import type { WorkerProfile } from '@/types/worker';

export default function WorkerProfilesList() {
  const [profiles, setProfiles] = useState<WorkerProfile[] | null>(null);
  const [selectedWorkerUid, setSelectedWorkerUid] = useState<string | null>(null);

  useEffect(() => {
    getWorkerProfiles()
      .then(setProfiles)
      .catch((err) => {
        console.error('[workers] failed to load profiles', err);
        setProfiles([]);
      });
  }, []);

  if (profiles === null) {
    return <Loader size="lg" text="Loading worker candidate profiles…" />;
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
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 m-0">
        {profiles.map((profile) => {
          const category = JOB_CATEGORIES.find((cat) => cat.slug === profile.category);
          return (
            <li
              key={profile.id}
              className="p-5 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] flex flex-col justify-between gap-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] overflow-hidden flex-shrink-0 flex items-center justify-center border border-[var(--color-primary)]/20">
                  {profile.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.photoUrl} alt={profile.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-lg font-semibold text-[var(--color-primary-dark)]">
                      {profile.displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-[var(--color-text)]">{profile.displayName}</h3>
                    <Badge variant={profile.availableForWork ? 'success' : 'default'}>
                      {profile.availableForWork ? 'Available' : 'Not available'}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-1">{profile.headline}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                    {category?.label || profile.category} · {profile.location.city}, {profile.location.provinceCode} ·{' '}
                    {profile.experience} yr{profile.experience === 1 ? '' : 's'} exp.
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-2">{profile.summary}</p>
                  {profile.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {profile.certifications.slice(0, 3).map((cert, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                {profile.resumeUrl ? (
                  <span className="text-xs font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200 flex items-center gap-1">
                    📄 Resume Attached
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-text-tertiary)]">
                    No resume uploaded
                  </span>
                )}

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSelectedWorkerUid(profile.id)}
                >
                  View Full Profile & Resume
                </Button>
              </div>
            </li>
          );
        })}
      </ul>

      {selectedWorkerUid && (
        <CandidateProfileModal
          workerUid={selectedWorkerUid}
          isOpen={Boolean(selectedWorkerUid)}
          onClose={() => setSelectedWorkerUid(null)}
        />
      )}
    </>
  );
}
