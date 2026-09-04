import { isSupported, getAnalytics } from 'firebase/analytics';
import { firebaseApp } from './config';

/**
 * Firebase Analytics only works in the browser (it relies on
 * `window`/`indexedDB`) and isn't supported in every environment (e.g.
 * some in-app browsers), so this is initialized lazily and defensively
 * rather than at module load time like `auth`/`db`.
 */
export async function initAnalytics(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (!(await isSupported())) return;
  getAnalytics(firebaseApp);
}
