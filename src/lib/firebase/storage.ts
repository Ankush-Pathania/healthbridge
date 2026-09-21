import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './config';

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;
const RESUME_CONTENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const photoRef = ref(storage, `profilePhotos/${uid}`);
  await uploadBytes(photoRef, file, { contentType: file.type });
  return getDownloadURL(photoRef);
}

export async function uploadResume(uid: string, file: File): Promise<string> {
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    throw new Error('Resume must be 5 MB or smaller.');
  }
  if (!RESUME_CONTENT_TYPES.includes(file.type)) {
    throw new Error('Resume must be a PDF or Word document.');
  }
  const resumeRef = ref(storage, `resumes/${uid}/${file.name}`);
  await uploadBytes(resumeRef, file, { contentType: file.type });
  return getDownloadURL(resumeRef);
}
