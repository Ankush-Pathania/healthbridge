'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SITE_NAME } from '@/lib/constants';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/auth-context';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const close = useCallback(() => setIsOpen(false), []);

  async function handleSignOut() {
    close();
    await signOut();
    router.push('/');
  }

  // Close on escape key
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

  const navLinks = !user
    ? [
        { label: 'Jobs', href: '/jobs' },
        { label: 'For Workers', href: '/workers' },
        { label: 'For Employers', href: '/employers' },
        { label: 'Locations', href: '/locations' },
        { label: 'About', href: '/about' },
      ]
    : user.role === 'employer'
      ? [
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Find Candidates', href: '/workers' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Locations', href: '/locations' },
          { label: 'About', href: '/about' },
        ]
      : [
          { label: 'Browse Jobs', href: '/jobs' },
          { label: 'My Profile', href: '/workers/profile' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Locations', href: '/locations' },
          { label: 'About', href: '/about' },
        ];

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-[var(--color-border)]">
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {SITE_NAME}
            </span>
            <button
              onClick={close}
              className="inline-flex items-center justify-center p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] transition-colors"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1 list-none p-0 m-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block px-3 py-2.5 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Account */}
          <div className="px-4 py-4 border-t border-[var(--color-border)] flex flex-col gap-1">
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={close}
                  className="block px-3 py-2.5 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] transition-colors no-underline"
                >
                  Account ({user.displayName})
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-left px-3 py-2.5 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={close}
                className="block px-3 py-2.5 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] rounded-[var(--radius-md)] transition-colors no-underline"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="px-4 py-4 border-t border-[var(--color-border)] flex flex-col gap-2">
            {!user ? (
              <>
                <Button href="/jobs" size="md" onClick={close}>
                  Find a Job
                </Button>
                <Button href="/employers" variant="secondary" size="md" onClick={close}>
                  Post a Job
                </Button>
              </>
            ) : user.role === 'employer' ? (
              <Button href="/jobs/new" size="md" onClick={close}>
                Post a Job
              </Button>
            ) : (
              <Button href="/jobs" size="md" onClick={close}>
                Find a Job
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
