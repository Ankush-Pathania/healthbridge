import type { Metadata } from 'next';
import Container from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Healthcare Career Resources',
  description:
    'Career tips, industry news, and resources for healthcare workers and employers in Canada.',
};

export default function BlogPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
          Healthcare Career Resources
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Career tips, industry insights, and practical resources for healthcare workers and employers across Canada.
        </p>

        <div className="p-8 text-center bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
          <p className="text-[var(--color-text-secondary)]">
            Blog content coming soon. We&apos;re preparing helpful resources for healthcare professionals.
          </p>
        </div>
      </Container>
    </section>
  );
}
