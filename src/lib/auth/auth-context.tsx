'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { authService } from './firebase-auth-service';
import type { AuthUser, SignInInput, SignUpInput, UserRole } from '@/types/auth';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signUp: (input: SignUpInput) => Promise<AuthUser>;
  signIn: (input: SignInInput) => Promise<AuthUser>;
  signInWithGoogle: (role: UserRole) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return authService.onAuthStateChanged((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  const signUp = useCallback((input: SignUpInput) => authService.signUp(input), []);
  const signIn = useCallback((input: SignInInput) => authService.signIn(input), []);
  const signInWithGoogle = useCallback((role: UserRole) => authService.signInWithGoogle(role), []);
  const signOut = useCallback(() => authService.signOutUser(), []);
  const sendPasswordReset = useCallback((email: string) => authService.sendPasswordReset(email), []);
  const refreshUser = useCallback(async () => {
    setUser(await authService.refreshUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signInWithGoogle, signOut, sendPasswordReset, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
