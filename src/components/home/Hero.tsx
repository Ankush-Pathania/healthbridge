import Container from '@/components/ui/Container';
import JobSearch from '@/components/jobs/JobSearch';
import HeroIllustration from './illustrations/HeroIllustration';
import { JOB_CATEGORIES, PROVINCES } from '@/lib/constants';

const STATS = [
  { label: 'Live job posts', value: 'New' },
  { label: 'Worker categories', value: JOB_CATEGORIES.length },
  { label: 'Provinces covered', value: PROVINCES.length },
];

export default function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6">
      <div className="relative overflow-hidden bg-[var(--color-navy)] rounded-[var(--radius-2xl)] py-16 sm:py-24">
        {/* Decorative pastel blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[var(--color-pastel-yellow)] opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[var(--color-pastel-pink)] opacity-20 blur-3xl" />
          <div className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-[var(--color-pastel-blue)] opacity-10 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
                Find Healthcare Jobs Across Canada
              </h1>
              <p className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0">
                Browse thousands of nursing, PSW, caregiver, and healthcare assistant positions.
              </p>

              <div className="mt-8 flex justify-center lg:justify-start">
                <div className="w-full max-w-[560px] bg-white rounded-[var(--radius-xl)] p-2 shadow-[var(--shadow-xl)]">
                  <JobSearch />
                </div>
              </div>

              {/* Trust stats */}
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <HeroIllustration className="w-56 sm:w-72 lg:w-full max-w-[420px]" />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
