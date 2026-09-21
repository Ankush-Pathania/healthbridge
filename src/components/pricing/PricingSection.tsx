'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/auth-context';
import { useSubscription, isWorkerSubscribed, isEmployerSubscribed } from '@/lib/subscription/subscription-context';
import { auth } from '@/lib/firebase/config';
import type { BillingCycle, SubscriptionPlan } from '@/types/subscription';

const PLANS: {
  key: SubscriptionPlan;
  label: string;
  monthly: number;
  annual: number;
  bg: string;
  fg: string;
  features: string[];
}[] = [
  {
    key: 'worker',
    label: 'Worker',
    monthly: 9.99,
    annual: 99,
    bg: 'bg-[var(--color-pastel-blue)]',
    fg: 'text-[var(--color-pastel-blue-fg)]',
    features: [
      'See full job descriptions & salary',
      'Apply directly to unlimited jobs',
      'Get matched with employers',
    ],
  },
  {
    key: 'employer',
    label: 'Employer',
    monthly: 49,
    annual: 490,
    bg: 'bg-[var(--color-pastel-green)]',
    fg: 'text-[var(--color-pastel-green-fg)]',
    features: [
      'Unlimited active job posts',
      'Featured placement on listings',
      'Reach thousands of healthcare workers',
    ],
  },
];

export default function PricingSection() {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const router = useRouter();

  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<SubscriptionPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe(plan: SubscriptionPlan) {
    if (!user) {
      router.push('/login?redirect=/pricing');
      return;
    }

    setError(null);
    setLoadingPlan(plan);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ plan, billingCycle }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? 'Could not start checkout.');
    } catch {
      setError('Could not start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-[var(--color-bg-muted)] rounded-full">
          {(['monthly', 'annual'] as BillingCycle[]).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === cycle
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {cycle === 'monthly' ? 'Monthly' : 'Annual — save ~15%'}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-center text-sm text-[var(--color-error)] mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {PLANS.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.monthly : plan.annual;
          const period = billingCycle === 'monthly' ? '/mo' : '/yr';
          const roleMatches = !user || user.role === plan.key;
          const alreadySubscribed =
            plan.key === 'worker' ? isWorkerSubscribed(subscription) : isEmployerSubscribed(subscription);

          return (
            <div key={plan.key} className={`p-6 sm:p-8 rounded-[var(--radius-2xl)] ${plan.bg} ${plan.fg}`}>
              <h3 className="text-xl font-bold mb-1">{plan.label}</h3>
              <p className="text-sm opacity-70 mb-4">For healthcare {plan.key === 'worker' ? 'workers' : 'employers'}</p>
              <p className="mb-6">
                <span className="text-4xl font-bold">${price}</span>
                <span className="text-sm opacity-70">{period}</span>
              </p>
              <ul className="flex flex-col gap-2 mb-6 list-none p-0 m-0">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm flex items-start gap-2">
                    <span aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {alreadySubscribed ? (
                <Button variant="secondary" size="lg" className="w-full" disabled>
                  Current Plan
                </Button>
              ) : !roleMatches ? (
                <p className="text-xs opacity-70">
                  Sign in with a {plan.key} account to subscribe to this plan.
                </p>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loadingPlan === plan.key}
                  onClick={() => handleSubscribe(plan.key)}
                >
                  {loadingPlan === plan.key ? 'Redirecting…' : `Subscribe ${billingCycle === 'monthly' ? 'Monthly' : 'Annually'}`}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
