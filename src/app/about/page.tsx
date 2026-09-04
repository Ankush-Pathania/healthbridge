import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_NAME} — connecting healthcare workers with employers across Canada.`,
};

export default function AboutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-6">
          About {SITE_NAME}
        </h1>

        <div className="flex flex-col gap-6 text-[var(--color-text-secondary)] leading-relaxed">
          <p>
            {SITE_NAME} is a Canadian healthcare recruitment platform connecting qualified healthcare workers
            with employers across the country. We serve hospitals, long-term care facilities,
            home care agencies, clinics, and other healthcare organizations.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-4">Our Mission</h2>
          <p>
            To make healthcare recruitment in Canada simpler, faster, and more accessible
            for both workers and employers. We believe that connecting the right healthcare
            professionals with the right opportunities leads to better patient outcomes and
            stronger communities.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-4">Who We Serve</h2>
          <p>
            We support Registered Nurses (RN), Licensed Practical Nurses (LPN), Registered
            Practical Nurses (RPN), Personal Support Workers (PSW), Caregivers, Home Support
            Workers, and Healthcare Assistants across all provinces and territories.
          </p>

          <h2 className="text-xl font-semibold text-[var(--color-text)] mt-4">Contact Us</h2>
          <p>
            Have questions or want to learn more? Visit our{' '}
            <a href="/contact" className="text-[var(--color-primary)]">contact page</a>{' '}
            to get in touch with our team.
          </p>
        </div>
      </Container>
    </section>
  );
}
