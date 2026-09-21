import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Logo from '@/components/icons/Logo';
import { SITE_NAME, SITE_TAGLINE, FOOTER_LINKS, POPULAR_LOCATIONS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-navy)] rounded-t-[var(--radius-2xl)]">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <Logo className="h-8 w-8 flex-shrink-0" />
              <span className="text-base font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              {SITE_TAGLINE}.
            </p>
          </div>

          {/* For Workers */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              For Workers
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {FOOTER_LINKS.forWorkers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              For Employers
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {FOOTER_LINKS.forEmployers.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              Company
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              Popular Locations
            </h3>
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              {POPULAR_LOCATIONS.slice(0, 6).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={loc.slug}
                    className="text-sm text-white/60 hover:text-white no-underline transition-colors"
                  >
                    {loc.city}, {loc.province}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <nav className="flex items-center gap-4" aria-label="Legal links">
            {FOOTER_LINKS.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/50 hover:text-white no-underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>

      {/* Colored accent strip */}
      <div className="bg-[var(--color-accent)] rounded-t-[var(--radius-2xl)] mt-2">
        <Container>
          <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
              Ready to find your next healthcare job?
            </p>
            <Button href="/jobs" variant="primary" size="lg">
              Browse Jobs
            </Button>
          </div>
        </Container>
      </div>
    </footer>
  );
}
