import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';
import { getPriceId, getStripe } from '@/lib/stripe/server';
import type { BillingCycle, SubscriptionPlan } from '@/types/subscription';

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
    console.error('[api/checkout] Auth verification error:', err);
    return NextResponse.json({ error: 'Invalid session. Please check Firebase Admin service account key or re-login.' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const plan = body?.plan as SubscriptionPlan | undefined;
  const billingCycle = body?.billingCycle as BillingCycle | undefined;
  if (plan !== 'worker' && plan !== 'employer') {
    return NextResponse.json({ error: 'Invalid plan.' }, { status: 400 });
  }
  if (billingCycle !== 'monthly' && billingCycle !== 'annual') {
    return NextResponse.json({ error: 'Invalid billing cycle.' }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const subRef = getAdminDb().collection('subscriptions').doc(uid);
    const existing = await subRef.get();

    let stripeCustomerId = existing.exists ? (existing.data()?.stripeCustomerId as string | undefined) : undefined;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email, metadata: { uid } });
      stripeCustomerId = customer.id;
      await subRef.set(
        { uid, stripeCustomerId, status: 'incomplete', updatedAt: new Date().toISOString() },
        { merge: true }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: stripeCustomerId,
      client_reference_id: uid,
      line_items: [{ price: getPriceId(plan, billingCycle), quantity: 1 }],
      metadata: { uid, plan, billingCycle },
      subscription_data: { metadata: { uid, plan, billingCycle } },
      success_url: `${appUrl}/account?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Could not create checkout session.' }, { status: 500 });
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[api/checkout] failed', err);
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 });
  }
}
