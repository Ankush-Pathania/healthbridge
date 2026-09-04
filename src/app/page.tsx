import Link from 'next/link';
import Container from '@/components/ui/Container';
import JobSearch from '@/components/jobs/JobSearch';
import JobsBoard from '@/components/jobs/JobsBoard';
import EmployerCTA from '@/components/employers/EmployerCTA';
import WorkerCTA from '@/components/workers/WorkerCTA';
import CategoryIcon from '@/components/icons/CategoryIcons';
import { MapPinIcon, SearchIcon, FileSendIcon, CheckCircleIcon } from '@/components/icons/UtilityIcons';
import { JOB_CATEGORIES, POPULAR_LOCATIONS, PROVINCES } from '@/lib/constants';

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Search Jobs',
    description: 'Browse healthcare positions by category, location, or keyword across Canada.',
    icon: SearchIcon,
  },
  {
    step: '2',
    title: 'Apply Online',
    description: 'Submit your application directly to employers with your profile and resume.',
    icon: FileSendIcon,
  },
  {
    step: '3',
    title: 'Start Working',
    description: 'Get hired and begin your next healthcare role with a trusted employer.',
    icon: CheckCircleIcon,
  },
];

export default function HomePage() {
  const stats = [
    { label: 'Live job posts', value: 'New' },
    { label: 'Worker categories', value: JOB_CATEGORIES.length },
    { label: 'Provinces covered', value: PROVINCES.length },
  ];

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-[var(--color-bg-subtle)] py-16 sm:py-20">
        {/* Decorative background pattern */}
        <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[var(--color-primary-light)] opacity-70 blur-2xl" />
          <div className="absolute -bottom-32 -left-16 w-72 h-72 rounded-full bg-[var(--color-accent-light)] opacity-70 blur-2xl" />
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.35]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="var(--color-border-strong)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dots)" />
          </svg>
        </div>

        <Container size="narrow" className="relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-3 leading-tight">
              Find Healthcare Jobs Across Canada
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Browse thousands of nursing, PSW, caregiver, and healthcare assistant positions.
            </p>
          </div>
          <div className="flex justify-center">
            <JobSearch />
          </div>

          {/* Trust stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-[var(--color-primary)]">{stat.value}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Featured Jobs ===== */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-[var(--color-text)]">
              Latest Healthcare Jobs
            </h2>
            <Link
              href="/jobs"
              className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline hidden sm:inline"
            >
              View All Jobs →
            </Link>
          </div>
          <JobsBoard title="Latest posts" limit={6} showFilters={false} showCount={false} />
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/jobs"
              className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline"
            >
              View All Jobs →
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== Browse by Category ===== */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
        <Container>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {JOB_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/jobs?category=${cat.slug}`}
                className="flex gap-3.5 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-sm)] transition-all no-underline"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-[var(--radius-md)] bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center">
                  <CategoryIcon category={cat.slug} size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--color-text)] mb-1">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Employer CTA ===== */}
      <EmployerCTA />

      {/* ===== How It Works ===== */}
      <section className="py-12 sm:py-16">
        <Container size="narrow">
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative w-14 h-14 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center mx-auto mb-3">
                  <item.icon size={26} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-primary)] text-[var(--color-text-inverse)] flex items-center justify-center text-xs font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--color-text)] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Popular Locations ===== */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-subtle)] border-y border-[var(--color-border)]">
        <Container>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 text-center">
            Healthcare Jobs by Location
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {POPULAR_LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={loc.slug}
                className="flex flex-col items-center gap-1.5 p-3 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-sm)] transition-all no-underline text-center"
              >
                <MapPinIcon size={18} className="text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-[var(--color-text)]">
                  {loc.city}
                </span>
                <span className="block text-xs text-[var(--color-text-secondary)]">
                  {loc.province}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/locations"
              className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline"
            >
              View All Locations →
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== Worker CTA ===== */}
      <WorkerCTA />
    </>
  );
}
