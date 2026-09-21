import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './config';
import type { Subscription } from '@/types/subscription';

/** Realtime — flips the moment the Stripe webhook writes this doc, no manual refresh needed. */
export function subscribeToSubscription(
  uid: string,
  callback: (subscription: Subscription | null) => void
): () => void {
  return onSnapshot(
    doc(db, 'subscriptions', uid),
    (snapshot) => {
      callback(snapshot.exists() ? (snapshot.data() as Subscription) : null);
    },
    () => callback(null)
  );
}
