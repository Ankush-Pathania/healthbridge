import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Logo from '@/components/icons/Logo';
import AuthStatus from '@/components/auth/AuthStatus';
import { SITE_NAME, NAV_LINKS } from '@/lib/constants';
import MobileNav from './MobileNav';

export default function Header() {
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
            {NAV_LINKS.map((link) => (
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
            <Button href="/jobs" size="sm">
              Find a Job
            </Button>
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
