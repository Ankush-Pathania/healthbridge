'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { subscribeToSubscription } from '@/lib/firebase/subscriptions';
import { auth } from '@/lib/firebase/config';
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

    // 1. Listen via Client Firestore onSnapshot
    const unsubscribe = subscribeToSubscription(user.uid, (next) => {
      if (next) {
        setSubscription(next);
        setLoading(false);
      }
    });

    // 2. Auto-sync via Server Admin SDK & Stripe API
    auth.currentUser?.getIdToken().then((idToken) => {
      if (!idToken) return;
      fetch('/api/stripe/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.synced && data.subscription) {
            setSubscription(data.subscription);
          }
        })
        .catch((err) => console.error('[subscription sync error]', err))
        .finally(() => setLoading(false));
    });

    return unsubscribe;
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
  return Boolean(
    subscription && (subscription.status === 'active' || subscription.status === 'trialing')
  );
}

export function isEmployerSubscribed(subscription: Subscription | null): boolean {
  return Boolean(
    subscription && (subscription.status === 'active' || subscription.status === 'trialing')
  );
}
