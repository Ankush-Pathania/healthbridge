'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Loader from '@/components/ui/Loader';
import { useSubscription } from '@/lib/subscription/subscription-context';
import { auth } from '@/lib/firebase/config';

export default function SubscriptionStatus() {
  const { subscription, loading } = useSubscription();
  const searchParams = useSearchParams();
  const checkoutParam = searchParams.get('checkout');

  const [syncing, setSyncing] = useState(false);
  const [openingPortal, setOpeningPortal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const syncWithStripe = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) return;
      const res = await fetch('/api/stripe/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      if (res.ok && data.synced) {
        setSuccessBanner('🎉 Active subscription verified with Stripe!');
      } else if (!data.synced) {
        if (checkoutParam === 'success') {
          setError('Payment completed, but Stripe status is updating. Click "Sync Status" below to retry.');
        }
      }
    } catch {
      setError('Could not verify status with Stripe.');
    } finally {
      setSyncing(false);
    }
  }, [checkoutParam]);

  useEffect(() => {
    if (checkoutParam === 'success' || (!loading && (!subscription || subscription.status !== 'active'))) {
      syncWithStripe();
    }
  }, [checkoutParam, loading, subscription?.status, syncWithStripe]);

  async function handleManage() {
    setError(null);
    setOpeningPortal(true);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? 'Could not open billing portal.');
      setOpeningPortal(false);
    } catch {
      setError('Could not open billing portal.');
      setOpeningPortal(false);
    }
  }

  if (loading) {
    return <Loader size="md" text="Loading subscription details…" />;
  }

  const isActive = subscription?.status === 'active';

  return (
    <div className="mb-6 flex flex-col gap-3">
      {successBanner && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-[var(--radius-lg)] text-xs font-semibold text-green-800 flex items-center justify-between">
          <span>{successBanner}</span>
          <button
            onClick={() => setSuccessBanner(null)}
            className="text-green-700 hover:text-green-900 cursor-pointer font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-between gap-4 flex-wrap shadow-xs relative">
        {syncing && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs rounded-[var(--radius-lg)] flex items-center justify-center z-10">
            <Loader size="sm" text="Syncing with Stripe…" />
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="font-semibold text-[var(--color-text)] text-sm">Subscription Status</p>
            {subscription && (
              <Badge variant={isActive ? 'success' : 'default'}>
                {isActive ? 'Active' : subscription.status.replace('_', ' ')}
              </Badge>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {isActive && subscription
              ? `${subscription.plan === 'worker' ? 'Healthcare Worker' : 'Employer'} Plan · Billed ${subscription.billingCycle}`
              : "You do not have an active plan."}
          </p>
          {error && (
            <p className="text-xs text-[var(--color-error)] mt-1" role="alert">
              ⚠️ {error}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isActive && (
            <Button variant="secondary" size="sm" onClick={syncWithStripe} loading={syncing}>
              {syncing ? 'Syncing…' : '🔄 Sync Status'}
            </Button>
          )}

          {subscription?.stripeCustomerId ? (
            <Button variant="secondary" size="sm" onClick={handleManage} loading={openingPortal}>
              {openingPortal ? 'Opening Portal…' : 'Manage Subscription'}
            </Button>
          ) : (
            <Button href="/pricing" size="sm">
              View Plans & Subscribe
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
