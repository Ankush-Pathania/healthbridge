import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import JobSearch from '@/components/jobs/JobSearch';
import JobsBoard from '@/components/jobs/JobsBoard';

export const metadata: Metadata = {
  title: 'Healthcare Jobs in Canada',
  description:
    'Browse healthcare jobs across Canada. Find nursing, PSW, caregiver, and healthcare assistant positions from trusted employers.',
};

export default function JobsPage() {
  return (
    <>
      {/* Search Header */}
      <section className="bg-[var(--color-bg-subtle)] py-8 border-b border-[var(--color-border)]">
        <Container>
          <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">
            Healthcare Jobs in Canada
          </h1>
          <JobSearch />
        </Container>
      </section>

      {/* Results */}
      <section className="py-8">
        <Container>
          <JobsBoard />
        </Container>
      </section>
    </>
  );
}
