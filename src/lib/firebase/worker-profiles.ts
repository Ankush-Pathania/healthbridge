import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './config';
import type { EducationEntry, WorkExperienceEntry, WorkerProfile } from '@/types/worker';
import type { JobCategory } from '@/types/job';

type ProfileInput = Omit<WorkerProfile, 'id' | 'createdAt' | 'updatedAt'>;

function profileFromData(id: string, data: Record<string, unknown>): WorkerProfile {
  const toIso = (value: unknown) =>
    value instanceof Timestamp
      ? value.toDate().toISOString()
      : typeof value === 'string'
        ? value
        : new Date().toISOString();

  return {
    id,
    displayName: String(data.displayName ?? ''),
    email: String(data.email ?? ''),
    phone: typeof data.phone === 'string' ? data.phone : undefined,
    category: data.category as JobCategory,
    headline: String(data.headline ?? ''),
    summary: String(data.summary ?? ''),
    location: data.location as WorkerProfile['location'],
    experience: Number(data.experience ?? 0),
    certifications: Array.isArray(data.certifications) ? data.certifications.map(String) : [],
    availableForWork: Boolean(data.availableForWork),
    openToRelocate: Boolean(data.openToRelocate),
    photoUrl: typeof data.photoUrl === 'string' ? data.photoUrl : undefined,
    resumeUrl: typeof data.resumeUrl === 'string' ? data.resumeUrl : undefined,
    education: Array.isArray(data.education) ? (data.education as EducationEntry[]) : [],
    workExperience: Array.isArray(data.workExperience) ? (data.workExperience as WorkExperienceEntry[]) : [],
    createdAt: toIso(data.createdAt),
    updatedAt: toIso(data.updatedAt),
  };
}

export async function getWorkerProfile(uid: string): Promise<WorkerProfile | null> {
  const snapshot = await getDoc(doc(db, 'workerProfiles', uid));
  return snapshot.exists() ? profileFromData(snapshot.id, snapshot.data()) : null;
}

export async function saveWorkerProfile(uid: string, profile: ProfileInput): Promise<void> {
  const ref = doc(db, 'workerProfiles', uid);
  const existing = await getDoc(ref);
  const cleaned = Object.fromEntries(
    Object.entries(profile).filter(([, value]) => value !== undefined)
  );
  await setDoc(ref, {
    ...cleaned,
    createdAt: existing.exists() ? existing.data()?.createdAt ?? serverTimestamp() : serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getWorkerProfiles(): Promise<WorkerProfile[]> {
  const snapshot = await getDocs(collection(db, 'workerProfiles'));
  return snapshot.docs
    .map((docSnap) => profileFromData(docSnap.id, docSnap.data()))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
