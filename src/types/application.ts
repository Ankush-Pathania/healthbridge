export type ApplicationStatus = 'applied' | 'shortlisted' | 'approved' | 'rejected';

export interface JobApplication {
  id: string;
  workerUid: string;
  workerName?: string;
  workerEmail?: string;
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  employerUid?: string;
  employerName: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt?: string;
  employerNote?: string;
}
