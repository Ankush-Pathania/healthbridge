import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import WorkerProfilesList from '@/components/workers/WorkerProfilesList';
import { JOB_CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'For Healthcare Workers',
  description:
    'Find your next healthcare role in Canada. Browse jobs, create your profile, and connect with top employers across the country.',
};

export default function WorkersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-bg-subtle)] py-16 border-b border-[var(--color-border)]">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
              Your Next Healthcare Role Starts Here
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-6 max-w-xl mx-auto">
              Browse thousands of healthcare jobs across Canada. Create your profile and let employers find you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" href="/jobs">
                Browse Jobs
              </Button>
              <Button size="lg" variant="secondary" href="/workers/profile">
                Post Profile
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 text-center">
            Workers Looking for Work
          </h2>
          <WorkerProfilesList />
        </Container>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
        <Container>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 text-center">
            Jobs by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JOB_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/jobs?category=${cat.slug}`}
                className="block p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)] transition-all no-underline"
              >
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-1">
                  {cat.label} ({cat.shortLabel})
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <Container size="narrow">
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create Your Profile', description: 'Sign up and build your healthcare worker profile with your qualifications and experience.' },
              { step: '2', title: 'Browse & Apply', description: 'Search for jobs that match your skills, location, and preferences. Apply with one click.' },
              { step: '3', title: 'Get Hired', description: 'Connect with employers directly and start your next role in healthcare.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-text-inverse)] flex items-center justify-center text-base font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
