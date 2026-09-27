'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Logo from '@/components/icons/Logo';
import AuthStatus from '@/components/auth/AuthStatus';
import { SITE_NAME } from '@/lib/constants';
import MobileNav from './MobileNav';
import { useAuth } from '@/lib/auth/auth-context';

export default function Header() {
  const { user } = useAuth();

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
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)]">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-[var(--color-text)] hover:text-[var(--color-primary-dark)] no-underline"
          >
            <Logo className="h-8 w-8 flex-shrink-0" />
            {SITE_NAME}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] rounded-[var(--radius-md)] transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <AuthStatus />
            {user?.role === 'employer' ? (
              <Button href="/jobs/new" size="sm">
                Post a Job
              </Button>
            ) : (
              <Button href="/jobs" size="sm">
                Find a Job
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
