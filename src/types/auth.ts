export type UserRole = 'worker' | 'employer';

export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
}

export interface SignUpInput {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
}

export interface SignInInput {
  email: string;
  password: string;
}

export class AuthError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Auth backend contract, implemented by `FirebaseAuthService`
 * (src/lib/auth/firebase-auth-service.ts). `onAuthStateChanged` must fire
 * immediately with the current state upon subscription, same as
 * Firebase's own `onAuthStateChanged` — callers rely on that first call
 * to know when the initial auth check has resolved.
 */
export interface AuthService {
  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void;
  signUp(input: SignUpInput): Promise<AuthUser>;
  signIn(input: SignInInput): Promise<AuthUser>;
  signInWithGoogle(role: UserRole): Promise<AuthUser>;
  signOutUser(): Promise<void>;
  sendPasswordReset(email: string): Promise<void>;
}
