'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import JobSidebar from './JobSidebar';
import ApplicantList from './ApplicantList';
import { getEmployerJobs } from '@/lib/firebase/jobs';
import { getEmployerApplications } from '@/lib/firebase/applications';
import type { Job } from '@/types/job';
import type { JobApplication, ApplicationStatus } from '@/types/application';

interface Props {
  uid: string;
  displayName: string;
}

export default function EmployerDashboard({ uid, displayName }: Props) {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'jobs' | 'applicants'>('jobs');

  useEffect(() => {
    let cancelled = false;
    Promise.all([getEmployerJobs(uid), getEmployerApplications(uid)])
      .then(([fetchedJobs, fetchedApps]) => {
        if (cancelled) return;
        setJobs(fetchedJobs);
        setApplications(fetchedApps);
        if (fetchedJobs.length > 0) setSelectedJobId(fetchedJobs[0].id);
      })
      .catch((err) => {
        console.error('[dashboard] failed to load', err);
        if (!cancelled) setError('Could not load your dashboard. Please refresh.');
      });
    return () => { cancelled = true; };
  }, [uid]);

  const handleJobSelect = useCallback((jobId: string) => {
    setSelectedJobId(jobId);
    setMobileView('applicants');
  }, []);

  const handleApplicationUpdated = useCallback((applicationId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status } : app))
    );
  }, []);

  const selectedJob = jobs?.find((j) => j.id === selectedJobId) ?? null;
  const selectedApplications = applications.filter((a) => a.jobId === selectedJobId);
  const totalApplicants = applications.length;

  if (jobs === null && !error) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--color-text-secondary)]">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--color-error)]" role="alert">{error}</p>
      </div>
    );
  }

  if (jobs && jobs.length === 0) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-lg font-semibold text-[var(--color-text)] mb-2">No job posts yet</h2>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Post your first job to start receiving applications.
        </p>
        <Button href="/jobs/new">Post a Job</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Employer Dashboard</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
            {displayName} · {jobs?.length ?? 0} job{jobs?.length !== 1 ? 's' : ''} · {totalApplicants} applicant{totalApplicants !== 1 ? 's' : ''} total
          </p>
        </div>
        <Button href="/jobs/new" size="sm">Post a Job</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <aside
          className={'lg:block ' + (mobileView === 'applicants' ? 'hidden' : 'block')}
          aria-label="Your job posts"
        >
          <div className="bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-2">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide px-2 py-2">
              Job Posts
            </p>
            <JobSidebar
              jobs={jobs ?? []}
              applications={applications}
              selectedJobId={selectedJobId}
              onSelect={handleJobSelect}
            />
          </div>
        </aside>

        <section
          className={'lg:block ' + (mobileView === 'jobs' ? 'hidden' : 'block')}
          aria-label="Applications for selected job"
        >
          <button
            className="lg:hidden flex items-center gap-1 text-sm text-[var(--color-primary-dark)] mb-4 cursor-pointer"
            onClick={() => setMobileView('jobs')}
          >
            Back to Jobs
          </button>

          {selectedJob ? (
            <ApplicantList
              job={selectedJob}
              applications={selectedApplications}
              onApplicationUpdated={handleApplicationUpdated}
            />
          ) : (
            <div className="p-8 text-center text-[var(--color-text-secondary)] text-sm">
              Select a job from the left to view applications.
            </div>
          )}
        </section>
      </div>

      <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
        <Link href="/account" className="hover:text-[var(--color-primary-dark)] transition-colors">
          Back to Account
        </Link>
      </div>
    </div>
  );
}