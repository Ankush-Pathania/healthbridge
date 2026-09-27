'use client';

import { useEffect, useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CandidateProfileModal from '@/components/workers/CandidateProfileModal';
import { getWorkerProfile } from '@/lib/firebase/worker-profiles';
import { calculateProfileCompletion } from '@/lib/profile-utils';
import { JOB_CATEGORIES } from '@/lib/constants';
import type { WorkerProfile } from '@/types/worker';

export default function WorkerProfileCard({ uid }: { uid: string }) {
  const [profile, setProfile] = useState<WorkerProfile | null | undefined>(undefined);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    getWorkerProfile(uid)
      .then(setProfile)
      .catch(() => setProfile(null));
  }, [uid]);

  const completion = useMemo(() => {
    if (!profile) return null;
    return calculateProfileCompletion(profile);
  }, [profile]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">My Worker Profile</h2>
        <div className="flex gap-2">
          {profile && (
            <Button variant="secondary" size="sm" onClick={() => setShowPreviewModal(true)}>
              👁️ Public Preview
            </Button>
          )}
          <Button href="/workers/profile" size="sm">
            {profile ? 'Edit Profile & Resume' : 'Post Profile'}
          </Button>
        </div>
      </div>

      {profile === undefined && (
        <p className="text-sm text-[var(--color-text-secondary)]">Loading profile…</p>
      )}

      {profile === null && (
        <div className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-sm text-[var(--color-text-secondary)] mb-3">
            Post your healthcare profile & upload your resume so employers can find and hire you.
          </p>
          <Button href="/workers/profile" size="sm">
            Post Profile & Resume
          </Button>
        </div>
      )}

      {profile && (
        <div className="p-5 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] flex flex-col gap-4 shadow-xs">
          {/* Profile Strength Meter */}
          {completion && (
            <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-[var(--radius-md)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-900">Profile Strength:</span>
                <div className="w-28 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${completion.score}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-blue-800">{completion.score}%</span>
              </div>
              {completion.score < 100 && (
                <a href="/workers/profile" className="text-xs text-blue-700 underline font-medium hover:text-blue-900">
                  Complete missing items ➔
                </a>
              )}
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--color-primary-light)] overflow-hidden flex-shrink-0 flex items-center justify-center border-2 border-[var(--color-primary)]">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photoUrl} alt={profile.displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-[var(--color-primary-dark)]">
                  {profile.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="font-bold text-base text-[var(--color-text)]">{profile.headline || profile.displayName}</h3>
                <Badge variant={profile.availableForWork ? 'success' : 'default'}>
                  {profile.availableForWork ? 'Available' : 'Not available'}
                </Badge>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-2">
                {JOB_CATEGORIES.find((cat) => cat.slug === profile.category)?.label} · {profile.location.city},{' '}
                {profile.location.provinceCode} · {profile.experience} years exp.
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">{profile.summary}</p>
            </div>
          </div>

          {/* Attached Resume Indicator */}
          <div className="pt-3 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">📄</span>
              {profile.resumeUrl ? (
                <span className="font-medium text-green-700">Official Resume Uploaded</span>
              ) : (
                <span className="text-amber-700">No resume uploaded — add a resume to boost application responses</span>
              )}
            </div>
            {profile.resumeUrl && (
              <div className="flex gap-2">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-[var(--radius-md)] bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
                >
                  View Resume
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-[var(--radius-md)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Download
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {showPreviewModal && uid && (
        <CandidateProfileModal
          workerUid={uid}
          isOpen={showPreviewModal}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
}
