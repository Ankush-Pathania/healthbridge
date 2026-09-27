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
  let email: string | undefined;
  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    uid = decoded.uid;
    email = decoded.email;
  } catch (err) {
    console.error('[api/stripe/sync] Auth verification error:', err);
    return NextResponse.json({ error: 'Invalid session.' }, { status: 401 });
  }

  try {
    const stripe = getStripe();
    const db = getAdminDb();
    const subRef = db.collection('subscriptions').doc(uid);
    const docSnap = await subRef.get();

    let customerId = docSnap.exists ? (docSnap.data()?.stripeCustomerId as string | undefined) : undefined;

    // 1. Find customer ID in Stripe by email or metadata if not in Firestore
    if (!customerId) {
      if (email) {
        const customersByEmail = await stripe.customers.list({ email, limit: 5 });
        if (customersByEmail.data.length > 0) {
          customerId = customersByEmail.data[0].id;
        }
      }
      if (!customerId) {
        const allCustomers = await stripe.customers.list({ limit: 100 });
        const matched = allCustomers.data.find(
          (c) => c.metadata?.uid === uid || (email && c.email === email)
        );
        if (matched) customerId = matched.id;
      }
    }

    let activeSub: Stripe.Subscription | undefined = undefined;

    // 2. Search subscriptions specifically for this customer
    if (customerId) {
      const customerSubs = await stripe.subscriptions.list({ customer: customerId, limit: 10 });
      // Find active, trialing, or completed subscription
      activeSub = customerSubs.data.find(
        (s) => s.status === 'active' || s.status === 'trialing' || s.status === 'incomplete'
      );
    }

    // 3. Fallback: Search all recent subscriptions across Stripe account matching uid metadata
    if (!activeSub) {
      const recentSubs = await stripe.subscriptions.list({ limit: 100 });
      activeSub = recentSubs.data.find(
        (s) =>
          (s.metadata?.uid === uid || (customerId && s.customer === customerId)) &&
          (s.status === 'active' || s.status === 'trialing' || s.status === 'incomplete')
      );
    }

    // 4. Fallback: Check completed checkout sessions for customer
    if (!activeSub && customerId) {
      const sessions = await stripe.checkout.sessions.list({ customer: customerId, limit: 10 });
      const completedSession = sessions.data.find((s) => s.status === 'complete' && s.subscription);
      if (completedSession && typeof completedSession.subscription === 'string') {
        activeSub = await stripe.subscriptions.retrieve(completedSession.subscription);
      }
    }

    if (activeSub) {
      const plan = (activeSub.metadata?.plan as SubscriptionPlan) || 'worker';
      const billingCycle = (activeSub.metadata?.billingCycle as BillingCycle) || 'monthly';
      const status: SubscriptionStatus = 'active';

      const data = {
        uid,
        plan,
        billingCycle,
        status,
        stripeCustomerId: typeof activeSub.customer === 'string' ? activeSub.customer : activeSub.customer.id,
        stripeSubscriptionId: activeSub.id,
        currentPeriodEnd: periodEndIso(activeSub),
        updatedAt: new Date().toISOString(),
      };

      await subRef.set(data, { merge: true });
      return NextResponse.json({ synced: true, subscription: data });
    }

    return NextResponse.json({ synced: false, message: 'No active subscription found in Stripe.' });
  } catch (err) {
    console.error('[api/stripe/sync] Sync error:', err);
    return NextResponse.json({ error: 'Could not sync subscription.' }, { status: 500 });
  }
}
