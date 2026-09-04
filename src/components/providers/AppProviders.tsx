'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth/auth-context';
import { initAnalytics } from '@/lib/firebase/analytics';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics();
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
