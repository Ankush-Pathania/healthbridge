import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '@/lib/firebase/config';
import { createUserProfile, getUserProfile } from '@/lib/firebase/user-profile';
import { getWorkerProfile } from '@/lib/firebase/worker-profiles';
import {
  AuthError,
  type AuthService,
  type AuthUser,
  type SignInInput,
  type SignUpInput,
  type UserRole,
} from '@/types/auth';

const ERROR_MESSAGES: Record<string, string> = {
  'auth/email-already-in-use': 'An account with this email already exists.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/wrong-password': 'Incorrect email or password.',
  'auth/user-not-found': 'Incorrect email or password.',
  'auth/weak-password': 'Choose a stronger password (at least 6 characters).',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled for this project yet.',
  'auth/configuration-not-found': 'This sign-in method is not enabled for this project yet.',
  'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'Invalid Firebase API key — check the project configuration.',
  'auth/invalid-api-key': 'Invalid Firebase API key — check the project configuration.',
  'auth/project-not-found': 'Firebase project not found — check the project configuration.',
};

function toAuthError(err: unknown): AuthError {
  if (err instanceof FirebaseError) {
    // Logged so the exact Firebase error code is visible in dev tools —
    // the UI only ever shows the friendly, mapped message above.
    console.error(`[firebase-auth] ${err.code}`, err.message);
    return new AuthError(err.code, ERROR_MESSAGES[err.code] ?? `Something went wrong (${err.code}).`);
  }
  console.error('[firebase-auth] unexpected error', err);
  return new AuthError('unknown', 'Something went wrong. Please try again.');
}

async function toAuthUser(firebaseUser: FirebaseUser, fallbackRole?: UserRole): Promise<AuthUser> {
  let profile = await getUserProfile(firebaseUser.uid);

  if (!profile) {
    // Profile doc missing (e.g. first Google sign-in) — create it now.
    profile = {
      email: firebaseUser.email ?? '',
      displayName: firebaseUser.displayName ?? firebaseUser.email ?? 'User',
      role: fallbackRole ?? 'worker',
    };
    await createUserProfile(firebaseUser.uid, profile);
  }

  const photoUrl =
    profile.role === 'worker'
      ? (await getWorkerProfile(firebaseUser.uid).catch(() => null))?.photoUrl
      : undefined;

  return {
    uid: firebaseUser.uid,
    email: profile.email,
    displayName: profile.displayName,
    role: profile.role,
    photoUrl,
  };
}

/**
 * Firebase-backed implementation of `AuthService`. Requires, on the
 * Firebase project:
 *   - Authentication > Sign-in method: Email/Password and Google enabled.
 *   - Firestore Database created, with a rule allowing a signed-in user
 *     to read/write users/{uid} (see src/lib/firebase/user-profile.ts).
 */
class FirebaseAuthService implements AuthService {
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onFirebaseAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }
      try {
        callback(await toAuthUser(firebaseUser));
      } catch {
        callback(null);
      }
    });
  }

  async signUp({ email, password, displayName, role }: SignUpInput): Promise<AuthUser> {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(credential.user, { displayName: displayName.trim() });
      const profile = { email: email.trim().toLowerCase(), displayName: displayName.trim(), role };
      await createUserProfile(credential.user.uid, profile);
      return { uid: credential.user.uid, ...profile };
    } catch (err) {
      throw toAuthError(err);
    }
  }

  async signIn({ email, password }: SignInInput): Promise<AuthUser> {
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      return await toAuthUser(credential.user);
    } catch (err) {
      throw toAuthError(err);
    }
  }

  async signInWithGoogle(role: UserRole): Promise<AuthUser> {
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      return await toAuthUser(credential.user, role);
    } catch (err) {
      throw toAuthError(err);
    }
  }

  async signOutUser(): Promise<void> {
    await signOut(auth);
  }

  async sendPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err) {
      // Swallow user-not-found so the UI can show a single, non-enumerating
      // "if an account exists..." message regardless of outcome.
      if (err instanceof FirebaseError && err.code === 'auth/user-not-found') return;
      throw toAuthError(err);
    }
  }

  async refreshUser(): Promise<AuthUser | null> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;
    return toAuthUser(firebaseUser);
  }
}

export const authService = new FirebaseAuthService();
