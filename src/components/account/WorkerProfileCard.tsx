'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getWorkerProfile } from '@/lib/firebase/worker-profiles';
import { JOB_CATEGORIES } from '@/lib/constants';
import type { WorkerProfile } from '@/types/worker';

export default function WorkerProfileCard({ uid }: { uid: string }) {
  const [profile, setProfile] = useState<WorkerProfile | null | undefined>(undefined);

  useEffect(() => {
    getWorkerProfile(uid)
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [uid]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">My Profile</h2>
        <Button href="/workers/profile" size="sm">
          {profile ? 'Edit Profile' : 'Post Profile'}
        </Button>
      </div>

      {profile === undefined && (
        <p className="text-sm text-[var(--color-text-secondary)]">Loading…</p>
      )}

      {profile === null && (
        <div className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            Post your profile so employers can find you.
          </p>
          <Button href="/workers/profile" size="sm">
            Post Profile
          </Button>
        </div>
      )}

      {profile && (
        <div className="p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <div className="flex items-start justify-between gap-3 mb-2">
            <p className="font-medium text-[var(--color-text)]">{profile.headline}</p>
            <Badge variant={profile.availableForWork ? 'success' : 'default'}>
              {profile.availableForWork ? 'Available' : 'Not available'}
            </Badge>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">
            {JOB_CATEGORIES.find((cat) => cat.slug === profile.category)?.label} · {profile.location.city},{' '}
            {profile.location.provinceCode}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{profile.summary}</p>
        </div>
      )}
    </div>
  );
}
