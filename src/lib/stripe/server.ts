import Stripe from 'stripe';
import type { BillingCycle, SubscriptionPlan } from '@/types/subscription';

let stripeClient: Stripe | null = null;

/** Lazily constructed so `.env.local` can be filled in after first install without a restart-order dependency. */
export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set — see .env.example.');
  }

  stripeClient = new Stripe(key);
  return stripeClient;
}

export function getPriceId(plan: SubscriptionPlan, billingCycle: BillingCycle): string {
  const envKey = `STRIPE_${plan.toUpperCase()}_${billingCycle.toUpperCase()}_PRICE_ID` as const;
  const priceId = process.env[envKey];
  if (!priceId) {
    throw new Error(`${envKey} is not set — see .env.example.`);
  }
  return priceId;
}
