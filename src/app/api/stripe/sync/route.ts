import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';
import { getStripe } from '@/lib/stripe/server';
import type { BillingCycle, SubscriptionPlan, SubscriptionStatus } from '@/types/subscription';
import type Stripe from 'stripe';

function periodEndIso(subscription: Stripe.Subscription): string {
  const seconds = subscription.items.data[0]?.current_period_end;
  return seconds ? new Date(seconds * 1000).toISOString() : new Date().toISOString();
}

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!idToken) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  let uid: string;
  try {
    uid = (await getAdminAuth().verifyIdToken(idToken)).uid;
  } catch (err) {
    console.error('[api/stripe/sync] Auth verification error:', err);
    return NextResponse.json({ error: 'Invalid session.' }, { status: 401 });
  }

  try {
    const stripe = getStripe();
    const subs = await stripe.subscriptions.list({ limit: 10 });
    const userSub = subs.data.find((s) => s.metadata?.uid === uid && (s.status === 'active' || s.status === 'trialing'));

    if (userSub) {
      const plan = (userSub.metadata?.plan as SubscriptionPlan) || 'worker';
      const billingCycle = (userSub.metadata?.billingCycle as BillingCycle) || 'monthly';
      const status: SubscriptionStatus = 'active';

      const data = {
        uid,
        plan,
        billingCycle,
        status,
        stripeCustomerId: typeof userSub.customer === 'string' ? userSub.customer : userSub.customer.id,
        stripeSubscriptionId: userSub.id,
        currentPeriodEnd: periodEndIso(userSub),
        updatedAt: new Date().toISOString(),
      };

      await getAdminDb().collection('subscriptions').doc(uid).set(data, { merge: true });

      return NextResponse.json({ synced: true, subscription: data });
    }

    return NextResponse.json({ synced: false, message: 'No active subscription found in Stripe.' });
  } catch (err) {
    console.error('[api/stripe/sync] Sync error:', err);
    return NextResponse.json({ error: 'Could not sync subscription.' }, { status: 500 });
  }
}
