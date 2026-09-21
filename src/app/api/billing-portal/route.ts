import { NextResponse } from 'next/server';
import { getAdminAuth, getAdminDb } from '@/lib/firebase/admin';
import { getStripe } from '@/lib/stripe/server';

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
    console.error('[api/billing-portal] Auth verification error:', err);
    return NextResponse.json({ error: 'Invalid session.' }, { status: 401 });
  }

  try {
    const subDoc = await getAdminDb().collection('subscriptions').doc(uid).get();
    const stripeCustomerId = subDoc.data()?.stripeCustomerId as string | undefined;
    if (!stripeCustomerId) {
      return NextResponse.json({ error: 'No billing account found.' }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
    const session = await getStripe().billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${appUrl}/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('[api/billing-portal] failed', err);
    return NextResponse.json({ error: 'Could not open billing portal.' }, { status: 500 });
  }
}
