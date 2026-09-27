'use client';

import { useEffect, useState } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { getWorkerProfile } from '@/lib/firebase/worker-profiles';
import { JOB_CATEGORIES } from '@/lib/constants';
import type { WorkerProfile } from '@/types/worker';

interface Props {
  workerUid: string;
  workerName?: string;
  workerEmail?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CandidateProfileModal({
  workerUid,
  workerName,
  workerEmail,
  isOpen,
  onClose,
}: Props) {
  const [profile, setProfile] = useState<WorkerProfile | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !workerUid) return;
    setLoading(true);
    getWorkerProfile(workerUid)
      .then((data) => setProfile(data))
      .catch((err) => {
        console.error('[candidate modal] failed to load worker profile', err);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, [workerUid, isOpen]);

  if (!isOpen) return null;

  const categoryLabel =
    JOB_CATEGORIES.find((cat) => cat.slug === profile?.category)?.label || profile?.category || 'Healthcare Professional';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="candidate-modal-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[var(--radius-xl)] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
          <div>
            <h2 id="candidate-modal-title" className="text-xl font-bold text-[var(--color-text)]">
              Candidate Profile
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Detailed qualifications & attached resume
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg text-[var(--color-text-secondary)] hover:bg-gray-200 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {loading ? (
            <div className="py-12 flex items-center justify-center">
              <Loader size="lg" text="Fetching candidate profile & attached resume…" />
            </div>
          ) : !profile ? (
            <div className="py-8 text-center bg-[var(--color-bg-subtle)] rounded-[var(--radius-lg)] p-6">
              <p className="text-base font-semibold text-[var(--color-text)] mb-1">
                {workerName || 'Healthcare Worker'}
              </p>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                {workerEmail && <a href={`mailto:${workerEmail}`} className="underline">{workerEmail}</a>}
              </p>
              <p className="text-xs text-[var(--color-text-tertiary)]">
                This candidate has not filled out a detailed worker profile yet.
              </p>
            </div>
          ) : (
            <>
              {/* Basic Details Card */}
              <div className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary-light)] overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {profile.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.photoUrl}
                      alt={profile.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-[var(--color-primary-dark)]">
                      {(profile.displayName || workerName || 'W').charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[var(--color-text)]">
                      {profile.displayName || workerName}
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant={profile.availableForWork ? 'success' : 'default'}>
                        {profile.availableForWork ? 'Available' : 'Not available'}
                      </Badge>
                      {profile.openToRelocate && <Badge variant="primary">Open to relocate</Badge>}
                    </div>
                  </div>

                  <p className="text-sm font-medium text-[var(--color-primary-dark)] mb-1">
                    {profile.headline || categoryLabel}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-secondary)]">
                    <span>📍 {profile.location.city}, {profile.location.provinceCode}</span>
                    <span>💼 {profile.experience} year{profile.experience === 1 ? '' : 's'} exp.</span>
                    <span>🏷️ {categoryLabel}</span>
                    {profile.phone && <span>📞 {profile.phone}</span>}
                    {profile.email && (
                      <span>
                        ✉️ <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Resume Card */}
              <div className="p-4 border border-[var(--color-primary)]/30 bg-[var(--color-primary-light)]/40 rounded-[var(--radius-lg)]">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      📄
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--color-text)]">
                        Attached Resume / CV
                      </h4>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {profile.resumeUrl ? 'Verified candidate resume uploaded' : 'No resume file uploaded yet'}
                      </p>
                    </div>
                  </div>

                  {profile.resumeUrl ? (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity"
                      >
                        👁️ View Resume
                      </a>
                      <a
                        href={profile.resumeUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white text-[var(--color-text)] hover:bg-gray-50 transition-colors"
                      >
                        ⬇️ Download
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      No File
                    </span>
                  )}
                </div>
              </div>

              {/* About / Bio */}
              {profile.summary && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2 uppercase tracking-wider text-xs">
                    About / Professional Bio
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line bg-gray-50 p-3 rounded-[var(--radius-md)] border border-gray-100">
                    {profile.summary}
                  </p>
                </div>
              )}

              {/* Work Experience */}
              {profile.workExperience && profile.workExperience.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider text-xs">
                    Work Experience
                  </h4>
                  <div className="flex flex-col gap-3">
                    {profile.workExperience.map((exp, idx) => (
                      <div key={idx} className="p-3 border border-[var(--color-border)] rounded-[var(--radius-md)]">
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold text-sm text-[var(--color-text)]">{exp.role}</h5>
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            {exp.startDate} - {exp.endDate}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-[var(--color-primary-dark)] mb-1">
                          {exp.employer}
                        </p>
                        {exp.description && (
                          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {profile.education && profile.education.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider text-xs">
                    Education & Credentials
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {profile.education.map((edu, idx) => (
                      <div key={idx} className="p-3 border border-[var(--color-border)] rounded-[var(--radius-md)] bg-gray-50">
                        <p className="font-semibold text-xs text-[var(--color-text)]">{edu.degree} in {edu.field}</p>
                        <p className="text-xs text-[var(--color-text-secondary)]">{edu.school}</p>
                        <p className="text-[10px] text-[var(--color-text-tertiary)] mt-1">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {profile.certifications && profile.certifications.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text)] mb-2 uppercase tracking-wider text-xs">
                    Certifications & Licenses
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-800 border border-blue-100"
                      >
                        ✓ {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-subtle)] flex justify-end">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
