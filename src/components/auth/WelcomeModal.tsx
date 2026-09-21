'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/icons/Logo';
import Button from '@/components/ui/Button';
import LoginForm from './LoginForm';
import HeroIllustration from '@/components/home/illustrations/HeroIllustration';
import { useAuth } from '@/lib/auth/auth-context';
import { SITE_NAME } from '@/lib/constants';

const DISMISSED_KEY = 'healthbridge-welcome-modal-dismissed';
const SHOW_DELAY_MS = 2500;
// Auth pages already show a full sign-in flow — don't stack a modal on top.
const SUPPRESS_ON = ['/login', '/signup', '/forgot-password'];

export default function WelcomeModal() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, '1');
    } catch {
      // Storage unavailable (private mode, etc.) — modal just won't persist dismissal.
    }
  }, []);

  useEffect(() => {
    if (loading || user) return;
    if (SUPPRESS_ON.some((path) => pathname?.startsWith(path))) return;

    let alreadyDismissed = false;
    try {
      alreadyDismissed = sessionStorage.getItem(DISMISSED_KEY) === '1';
    } catch {
      // Ignore — treat as not dismissed.
    }
    if (alreadyDismissed) return;

    const timer = setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [loading, user, pathname]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={close} aria-hidden="true" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sign in to HealthBridge"
        className="relative w-full max-w-[880px] max-h-[90vh] overflow-y-auto md:overflow-visible bg-white rounded-[var(--radius-2xl)] shadow-[var(--shadow-xl)] grid md:grid-cols-2"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Sign-in form */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">Sign In</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" onClick={close} className="text-[var(--color-primary)] font-medium">
              Register here
            </Link>
          </p>
          <LoginForm />
        </div>

        {/* Promo panel */}
        <div className="hidden md:block relative overflow-hidden bg-[var(--color-navy)] rounded-r-[var(--radius-2xl)] p-8">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-[var(--color-pastel-blue)] opacity-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[var(--color-pastel-pink)] opacity-20 blur-3xl" />
          </div>

          <div className="relative flex flex-col h-full">
            <div className="flex items-center gap-2">
              <Logo className="h-7 w-7 flex-shrink-0" />
              <span className="text-base font-bold text-white">{SITE_NAME}</span>
            </div>

            <h3 className="text-2xl font-bold text-white mt-6 mb-3 leading-snug">
              Your Next Healthcare Opportunity Starts Here
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Sign in to apply to jobs, save your favorites, and get matched with employers
              looking for your skills.
            </p>

            <HeroIllustration className="w-40 mx-auto mt-auto" />

            <Button href="/jobs" variant="accent" size="lg" onClick={close} className="mt-6 w-full">
              Find Your Dream Job!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
