export type SubscriptionPlan = 'worker' | 'employer';
export type BillingCycle = 'monthly' | 'annual';
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'incomplete';

export interface Subscription {
  uid: string;
  plan: SubscriptionPlan;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  currentPeriodEnd: string;
  updatedAt: string;
}
