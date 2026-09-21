'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { subscribeToSubscription } from '@/lib/firebase/subscriptions';
import type { Subscription } from '@/types/subscription';

interface SubscriptionContextValue {
  subscription: Subscription | null;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    return subscribeToSubscription(user.uid, (next) => {
      setSubscription(next);
      setLoading(false);
    });
  }, [user]);

  return (
    <SubscriptionContext.Provider value={{ subscription, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used within SubscriptionProvider');
  return ctx;
}

export function isWorkerSubscribed(subscription: Subscription | null): boolean {
  return subscription?.plan === 'worker' && subscription.status === 'active';
}

export function isEmployerSubscribed(subscription: Subscription | null): boolean {
  return subscription?.plan === 'employer' && subscription.status === 'active';
}
