import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="text-center">
          <p className="text-sm font-semibold text-[var(--color-primary)] mb-2">404</p>
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
            Page not found
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
            The job posting may also have been filled or closed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/jobs" size="lg">
              Browse Jobs
            </Button>
            <Button href="/" variant="secondary" size="lg">
              Go to Homepage
            </Button>
          </div>

          <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)] mb-3">
              Looking for something specific?
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm">
              <Link href="/locations" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline">
                Jobs by location
              </Link>
              <Link href="/workers" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline">
                For workers
              </Link>
              <Link href="/employers" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline">
                For employers
              </Link>
              <Link href="/contact" className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
