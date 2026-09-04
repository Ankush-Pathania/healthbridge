'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';

export default function AuthStatus() {
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    await signOut();
    router.push('/');
  }

  if (loading) {
    return <div className="w-16 h-5" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] no-underline"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary-dark)] transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center text-sm font-semibold flex-shrink-0">
          {user.displayName.charAt(0).toUpperCase()}
        </span>
        <span className="max-w-[120px] truncate">{user.displayName}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-lg py-1 z-10"
          role="menu"
        >
          <Link
            href="/account"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] no-underline"
            role="menuitem"
          >
            Account
          </Link>
          <Link
            href={user.role === 'employer' ? '/jobs/new' : '/workers/profile'}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] no-underline"
            role="menuitem"
          >
            {user.role === 'employer' ? 'Post a Job' : 'Post Profile'}
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]"
            role="menuitem"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
