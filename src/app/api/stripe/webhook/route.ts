import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getAdminDb } from '@/lib/firebase/admin';
import { getStripe } from '@/lib/stripe/server';
import type { BillingCycle, SubscriptionPlan, SubscriptionStatus } from '@/types/subscription';

export const runtime = 'nodejs';

function periodEndIso(subscription: Stripe.Subscription): string {
  const seconds = subscription.items.data[0]?.current_period_end;
  return seconds ? new Date(seconds * 1000).toISOString() : new Date().toISOString();
}

async function upsertFromSubscription(subscription: Stripe.Subscription) {
  const uid = subscription.metadata?.uid;
  if (!uid) {
    console.error('[stripe webhook] subscription missing uid metadata', subscription.id);
    return;
  }

  const plan = subscription.metadata?.plan as SubscriptionPlan | undefined;
  const billingCycle = subscription.metadata?.billingCycle as BillingCycle | undefined;
  const status: SubscriptionStatus =
    subscription.status === 'active' || subscription.status === 'trialing'
      ? 'active'
      : subscription.status === 'past_due'
        ? 'past_due'
        : subscription.status === 'canceled' || subscription.status === 'unpaid'
          ? 'canceled'
          : 'incomplete';

  await getAdminDb()
    .collection('subscriptions')
    .doc(uid)
    .set(
      {
        uid,
        plan,
        billingCycle,
        status,
        stripeCustomerId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id,
        stripeSubscriptionId: subscription.id,
        currentPeriodEnd: periodEndIso(subscription),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
}

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret.' }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('[stripe webhook] signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (typeof session.subscription === 'string') {
          const subscription = await getStripe().subscriptions.retrieve(session.subscription);
          await upsertFromSubscription(subscription);
        }
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        await upsertFromSubscription(event.data.object as Stripe.Subscription);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error(`[stripe webhook] failed handling ${event.type}`, err);
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
