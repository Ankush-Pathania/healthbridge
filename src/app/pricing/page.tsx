import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import PricingSection from '@/components/pricing/PricingSection';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `Subscribe to ${SITE_NAME} to unlock full job listings as a worker, or post unlimited jobs as an employer.`,
};

export default function PricingPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">Simple, Transparent Pricing</h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Whether you&apos;re looking for your next healthcare role or hiring qualified staff, we have a plan for you.
          </p>
        </div>
        <PricingSection />
      </Container>
    </section>
  );
}
