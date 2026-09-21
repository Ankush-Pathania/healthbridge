'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useSubscription } from '@/lib/subscription/subscription-context';
import { auth } from '@/lib/firebase/config';

export default function SubscriptionStatus() {
  const { subscription, loading } = useSubscription();
  const [openingPortal, setOpeningPortal] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch {
      setError('Could not open billing portal.');
    } finally {
      setOpeningPortal(false);
    }
  }

  if (loading) return null;

  const isActive = subscription?.status === 'active';

  return (
    <div className="mb-6 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-between gap-4 flex-wrap">
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-medium text-[var(--color-text)] text-sm">Subscription</p>
          {subscription && (
            <Badge variant={isActive ? 'success' : 'default'}>
              {subscription.status === 'active' ? 'Active' : subscription.status.replace('_', ' ')}
            </Badge>
          )}
        </div>
        <p className="text-xs text-[var(--color-text-secondary)]">
          {subscription
            ? `${subscription.plan === 'worker' ? 'Worker' : 'Employer'} plan · billed ${subscription.billingCycle}`
            : "You're not subscribed yet."}
        </p>
        {error && (
          <p className="text-xs text-[var(--color-error)] mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
      {subscription?.stripeCustomerId ? (
        <Button variant="secondary" size="sm" onClick={handleManage} disabled={openingPortal}>
          {openingPortal ? 'Opening…' : 'Manage Subscription'}
        </Button>
      ) : (
        <Button href="/pricing" size="sm">
          View Plans
        </Button>
      )}
    </div>
  );
}
