import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from './config';
import type { JobApplication } from '@/types/application';
import type { Job } from '@/types/job';

/**
 * One doc per (worker, job) pair, keyed deterministically so applying
 * twice to the same job is a no-op rather than a duplicate application.
 * Requires a Firestore rule granting a signed-in user create/read access
 * gated on workerUid == request.auth.uid — see firestore.rules.
 */
function applicationDocId(workerUid: string, jobId: string): string {
  return `${workerUid}_${jobId}`;
}

export async function hasApplied(workerUid: string, jobId: string): Promise<boolean> {
  try {
    const snapshot = await getDoc(doc(db, 'applications', applicationDocId(workerUid, jobId)));
    return snapshot.exists();
  } catch {
    // Missing-doc reads are denied until the application exists.
    return false;
  }
}

export async function applyToJob(
  workerUid: string,
  job: Job,
  worker?: { displayName: string; email: string }
): Promise<void> {
  const ref = doc(db, 'applications', applicationDocId(workerUid, job.id));
  try {
    const existing = await getDoc(ref);
    if (existing.exists()) return;
  } catch {
    // Continue to create if the existence check is denied.
  }

  await setDoc(ref, {
    workerUid,
    workerName: worker?.displayName ?? '',
    workerEmail: worker?.email ?? '',
    jobId: job.id,
    jobSlug: job.slug,
    jobTitle: job.title,
    employerUid: job.employerUid ?? '',
    employerName: job.employer.name,
    status: 'applied',
    appliedAt: serverTimestamp(),
  });
}

/**
 * Filter on `workerUid` only and sort in memory. Combining that filter
 * with `orderBy('appliedAt')` needs a Firestore composite index that
 * is not present on a fresh project, which made the account page fail.
 */
export async function getWorkerApplications(workerUid: string): Promise<JobApplication[]> {
  const q = query(collection(db, 'applications'), where('workerUid', '==', workerUid));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((docSnap) => {
      const data = docSnap.data();
      const appliedAt =
        data.appliedAt instanceof Timestamp ? data.appliedAt.toDate().toISOString() : new Date().toISOString();

      return {
        id: docSnap.id,
        workerUid: data.workerUid,
        workerName: data.workerName,
        workerEmail: data.workerEmail,
        jobId: data.jobId,
        jobSlug: data.jobSlug,
        jobTitle: data.jobTitle,
        employerUid: data.employerUid,
        employerName: data.employerName,
        status: data.status,
        appliedAt,
      };
    })
    .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));
}

export async function getEmployerApplications(employerUid: string): Promise<JobApplication[]> {
  const q = query(collection(db, 'applications'), where('employerUid', '==', employerUid));
  const snapshot = await getDocs(q);

  return snapshot.docs
    .map((docSnap) => {
      const data = docSnap.data();
      const appliedAt =
        data.appliedAt instanceof Timestamp ? data.appliedAt.toDate().toISOString() : new Date().toISOString();

      return {
        id: docSnap.id,
        workerUid: data.workerUid,
        workerName: data.workerName,
        workerEmail: data.workerEmail,
        jobId: data.jobId,
        jobSlug: data.jobSlug,
        jobTitle: data.jobTitle,
        employerUid: data.employerUid,
        employerName: data.employerName,
        status: data.status,
        appliedAt,
      };
    })
    .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt));
}
