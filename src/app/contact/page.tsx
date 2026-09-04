import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME}. We're here to help healthcare workers and employers across Canada.`,
};

export default function ContactPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
          Contact Us
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Have questions about our platform? Looking to post jobs or need staffing support?
          We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-1">
                For Employers
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Interested in posting jobs or our staffing services? Contact our employer team.
              </p>
              <p className="text-sm text-[var(--color-primary)] mt-1">employers@healthbridge.ca</p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-1">
                For Workers
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Need help with your application or profile? Our support team is here for you.
              </p>
              <p className="text-sm text-[var(--color-primary)] mt-1">support@healthbridge.ca</p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-1">
                General Inquiries
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                For partnerships, media, or general questions.
              </p>
              <p className="text-sm text-[var(--color-primary)] mt-1">hello@healthbridge.ca</p>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
            <h2 className="text-base font-semibold text-[var(--color-text)] mb-4">
              Send Us a Message
            </h2>
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--color-text)] mb-1">Name</label>
                <input id="contact-name" type="text" className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2.5 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--color-text)] mb-1">Email</label>
                <input id="contact-email" type="email" className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2.5 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]" />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--color-text)] mb-1">Message</label>
                <textarea id="contact-message" rows={4} className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] px-3 py-2.5 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] resize-vertical" />
              </div>
              <Button type="submit" size="md">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
