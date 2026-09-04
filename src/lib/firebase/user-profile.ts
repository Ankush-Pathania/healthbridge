import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './config';
import type { UserRole } from '@/types/auth';

/**
 * Firebase Auth has no concept of app-specific fields like `role`, so
 * profile data lives in Firestore at users/{uid}. Requires a Firestore
 * database to exist on the project and a rule granting the signed-in
 * user read/write access to their own doc, e.g.:
 *
 *   match /users/{uid} {
 *     allow read, write: if request.auth != null && request.auth.uid == uid;
 *   }
 */
interface UserProfileDoc {
  email: string;
  displayName: string;
  role: UserRole;
}

export async function getUserProfile(uid: string): Promise<UserProfileDoc | null> {
  const snapshot = await getDoc(doc(db, 'users', uid));
  return snapshot.exists() ? (snapshot.data() as UserProfileDoc) : null;
}

export async function createUserProfile(uid: string, profile: UserProfileDoc): Promise<void> {
  await setDoc(doc(db, 'users', uid), { ...profile, createdAt: serverTimestamp() });
}
