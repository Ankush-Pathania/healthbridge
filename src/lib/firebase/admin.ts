import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Server-only Firebase Admin SDK — verifies ID tokens on API routes and
 * writes `subscriptions/{uid}` from the Stripe webhook with elevated
 * privileges, bypassing firestore.rules (which deny all client writes to
 * that collection). Never import this from a 'use client' file.
 */
function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set — see .env.example.');
  }

  const serviceAccount = JSON.parse(raw);
  if (typeof serviceAccount.private_key === 'string') {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  return initializeApp({ credential: cert(serviceAccount) });
}

// Exported as functions, not top-level consts — Next.js evaluates a route's
// module body during the build's "Collecting page data" step (even without
// a request), which would otherwise throw before env vars are configured.
export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
