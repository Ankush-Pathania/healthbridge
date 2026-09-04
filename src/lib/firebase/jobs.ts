import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  where,
  type DocumentData,
} from 'firebase/firestore';
import { db } from './config';
import { slugify } from '@/lib/utils';
import type { Job } from '@/types/job';

export type NewJobInput = Omit<Job, 'id' | 'slug' | 'postedAt' | 'featured'> & {
  employerUid: string;
};

function jobFromDoc(id: string, data: DocumentData): Job {
  const postedAt =
    data.postedAt instanceof Timestamp
      ? data.postedAt.toDate().toISOString()
      : typeof data.postedAt === 'string'
        ? data.postedAt
        : new Date().toISOString();

  return {
    id,
    slug: data.slug,
    title: data.title,
    category: data.category,
    employerUid: data.employerUid,
    employer: data.employer,
    location: data.location,
    type: data.type,
    shift: data.shift,
    salary: data.salary,
    description: data.description,
    requirements: data.requirements ?? [],
    benefits: data.benefits ?? [],
    postedAt,
    urgent: Boolean(data.urgent),
    featured: Boolean(data.featured),
  };
}

export async function createJob(input: NewJobInput): Promise<Job> {
  const slug = `${slugify(input.title)}-${slugify(input.location.city)}-${Date.now().toString(36)}`;
  const ref = await addDoc(collection(db, 'jobs'), {
    employerUid: input.employerUid,
    slug,
    title: input.title,
    category: input.category,
    employer: input.employer,
    location: input.location,
    type: input.type,
    shift: input.shift,
    salary: input.salary,
    description: input.description,
    requirements: input.requirements,
    benefits: input.benefits,
    urgent: input.urgent,
    featured: false,
    postedAt: serverTimestamp(),
  });

  return {
    ...input,
    id: ref.id,
    slug,
    featured: false,
    postedAt: new Date().toISOString(),
  };
}

export async function getPostedJobs(): Promise<Job[]> {
  const snapshot = await getDocs(collection(db, 'jobs'));
  return snapshot.docs
    .map((docSnap) => jobFromDoc(docSnap.id, docSnap.data()))
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}

export async function getPostedJobBySlug(slug: string): Promise<Job | null> {
  const q = query(collection(db, 'jobs'), where('slug', '==', slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return jobFromDoc(docSnap.id, docSnap.data());
}

export async function getEmployerJobs(employerUid: string): Promise<Job[]> {
  const q = query(collection(db, 'jobs'), where('employerUid', '==', employerUid));
  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((docSnap) => jobFromDoc(docSnap.id, docSnap.data()))
    .sort((a, b) => b.postedAt.localeCompare(a.postedAt));
}
