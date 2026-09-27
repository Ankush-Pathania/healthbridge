'use client';

import { useState } from 'react';
import type { JobApplication, ApplicationStatus } from '@/types/application';
import { formatRelativeDate } from '@/lib/utils';
import CandidateProfileModal from '@/components/workers/CandidateProfileModal';

interface Props {
  application: JobApplication;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
  isUpdating: boolean;
}

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; classes: string }> = {
  applied:     { label: 'Under Review', classes: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  shortlisted: { label: 'Shortlisted',  classes: 'bg-blue-50 text-blue-800 border-blue-200' },
  approved:    { label: 'Approved',     classes: 'bg-green-50 text-green-800 border-green-200' },
  rejected:    { label: 'Not Selected', classes: 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)]' },
};

const ACTION_BUTTONS: { status: ApplicationStatus; label: string; classes: string }[] = [
  { status: 'shortlisted', label: 'Shortlist', classes: 'border border-blue-300 text-blue-700 hover:bg-blue-50' },
  { status: 'approved',    label: 'Approve',   classes: 'border border-green-300 text-green-700 hover:bg-green-50' },
  { status: 'rejected',    label: 'Reject',    classes: 'border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)]' },
];

export default function ApplicantCard({ application, onStatusChange, isUpdating }: Props) {
  const [showModal, setShowModal] = useState(false);
  const { label, classes } = STATUS_CONFIG[application.status] ?? STATUS_CONFIG.applied;
  const initials = (application.workerName || 'H')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] transition-shadow hover:shadow-sm">
        <div
          onClick={() => setShowModal(true)}
          className="w-10 h-10 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center text-sm font-semibold flex-shrink-0 cursor-pointer hover:ring-2 ring-[var(--color-primary)] transition-all"
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary-dark)] transition-colors text-left cursor-pointer truncate"
            >
              {application.workerName || 'Healthcare Worker'}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors font-medium flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              📄 View Profile & Resume
            </button>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] truncate mt-0.5">
            {application.workerEmail && (
              <a
                href={'mailto:' + application.workerEmail}
                className="hover:text-[var(--color-primary-dark)] transition-colors"
              >
                {application.workerEmail}
              </a>
            )}
            {application.workerEmail && ' · '}
            Applied {formatRelativeDate(application.appliedAt)}
          </p>
        </div>

        <span className={'text-xs font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ' + classes}>
          {label}
        </span>

        <div className="flex gap-2 flex-shrink-0">
          {ACTION_BUTTONS.map(({ status, label: btnLabel, classes: btnClasses }) => (
            <button
              key={status}
              disabled={isUpdating || application.status === status}
              onClick={() => onStatusChange(application.id, status)}
              aria-label={btnLabel + ' application from ' + (application.workerName || 'this worker')}
              className={'text-xs font-medium px-3 py-1.5 rounded-[var(--radius)] transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ' + btnClasses}
            >
              {btnLabel}
            </button>
          ))}
        </div>
      </div>

      <CandidateProfileModal
        workerUid={application.workerUid}
        workerName={application.workerName}
        workerEmail={application.workerEmail}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}