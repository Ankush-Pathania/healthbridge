import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'For Employers — Find Qualified Healthcare Workers',
  description:
    'Post healthcare jobs and connect with qualified nurses, PSWs, caregivers, and healthcare assistants across Canada.',
};

export default function EmployersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-subtle)] py-16 border-b border-[var(--color-border)]">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
              Find Qualified Healthcare Workers
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-6 max-w-xl mx-auto">
              Post your job and reach thousands of nurses, PSWs, caregivers, and healthcare assistants across Canada.
            </p>
            <Button size="lg" href="/jobs/new">
              Post a Job
            </Button>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-8 text-center">
            How We Help Employers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Job Posting',
                description: 'Post your healthcare positions and reach qualified candidates actively looking for work.',
              },
              {
                title: 'Candidate Matching',
                description: 'We connect you with pre-screened healthcare workers based on your requirements.',
              },
              {
                title: 'Staffing Solutions',
                description: 'Need temporary or permanent staff? We provide flexible staffing solutions for healthcare facilities.',
              },
            ].map((service) => (
              <div
                key={service.title}
                className="p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]"
              >
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-3">
              Ready to find your next hire?
            </h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Contact us to discuss your staffing needs.
            </p>
            <Button href="/jobs/new" size="lg">
              Post a Job
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
