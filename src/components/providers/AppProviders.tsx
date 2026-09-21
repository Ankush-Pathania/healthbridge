'use client';

import { useEffect } from 'react';
import { AuthProvider } from '@/lib/auth/auth-context';
import { SubscriptionProvider } from '@/lib/subscription/subscription-context';
import { initAnalytics } from '@/lib/firebase/analytics';
import WelcomeModal from '@/components/auth/WelcomeModal';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <AuthProvider>
      <SubscriptionProvider>
        {children}
        <WelcomeModal />
      </SubscriptionProvider>
    </AuthProvider>
  );
}
