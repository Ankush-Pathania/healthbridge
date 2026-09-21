import Link from 'next/link';
import Container from '@/components/ui/Container';
import Hero from '@/components/home/Hero';
import QuickActions from '@/components/home/QuickActions';
import CategoryPills from '@/components/home/CategoryPills';
import StatsAndTestimonial from '@/components/home/StatsAndTestimonial';
import JobsBoard from '@/components/jobs/JobsBoard';
import EmployerCTA from '@/components/employers/EmployerCTA';
import WorkerCTA from '@/components/workers/WorkerCTA';
import PricingSection from '@/components/pricing/PricingSection';
import CategoryIcon from '@/components/icons/CategoryIcons';
import { MapPinIcon, SearchIcon, FileSendIcon, CheckCircleIcon } from '@/components/icons/UtilityIcons';
import { JOB_CATEGORIES, POPULAR_LOCATIONS, CATEGORY_ACCENT, type CategoryAccent } from '@/lib/constants';

const ACCENT_CARD_STYLES: Record<CategoryAccent, { chip: string }> = {
  yellow: { chip: 'bg-[var(--color-pastel-yellow)] text-[var(--color-pastel-yellow-fg)]' },
  green: { chip: 'bg-[var(--color-pastel-green)] text-[var(--color-pastel-green-fg)]' },
  pink: { chip: 'bg-[var(--color-pastel-pink)] text-[var(--color-pastel-pink-fg)]' },
  blue: { chip: 'bg-[var(--color-pastel-blue)] text-[var(--color-pastel-blue-fg)]' },
};

const LOCATION_ACCENTS: CategoryAccent[] = ['blue', 'pink', 'green', 'yellow'];

const HOW_IT_WORKS: { step: string; title: string; description: string; icon: typeof SearchIcon; accent: CategoryAccent }[] = [
  {
    step: '1',
    title: 'Search Jobs',
    description: 'Browse healthcare positions by category, location, or keyword across Canada.',
    icon: SearchIcon,
    accent: 'blue',
  },
  {
    step: '2',
    title: 'Apply Online',
    description: 'Submit your application directly to employers with your profile and resume.',
    icon: FileSendIcon,
    accent: 'pink',
  },
  {
    step: '3',
    title: 'Start Working',
    description: 'Get hired and begin your next healthcare role with a trusted employer.',
    icon: CheckCircleIcon,
    accent: 'green',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <QuickActions />

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
          <div className="mb-6">
            <CategoryPills />
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
      <section className="py-12 sm:py-16 bg-[var(--color-bg-subtle)]">
        <Container>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {JOB_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/jobs?category=${cat.slug}`}
                className="flex gap-3.5 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-0.5 transition-all no-underline"
              >
                <div
                  className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${ACCENT_CARD_STYLES[CATEGORY_ACCENT[cat.slug]].chip}`}
                >
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
                <div
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${ACCENT_CARD_STYLES[item.accent].chip}`}
                >
                  <item.icon size={26} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-bold">
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

      {/* ===== Stats & Testimonial ===== */}
      <StatsAndTestimonial />

      {/* ===== Pricing ===== */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto">
              Unlock full job details as a worker, or post unlimited jobs as an employer.
            </p>
          </div>
          <PricingSection />
        </Container>
      </section>

      {/* ===== Popular Locations ===== */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg-subtle)]">
        <Container>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-6 text-center">
            Healthcare Jobs by Location
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {POPULAR_LOCATIONS.map((loc, index) => {
              const accent = LOCATION_ACCENTS[index % LOCATION_ACCENTS.length];
              return (
                <Link
                  key={loc.slug}
                  href={loc.slug}
                  className="flex flex-col items-center gap-1.5 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] hover:shadow-[var(--shadow-xl)] hover:-translate-y-0.5 transition-all no-underline text-center"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${ACCENT_CARD_STYLES[accent].chip}`}>
                    <MapPinIcon size={16} />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {loc.city}
                  </span>
                  <span className="block text-xs text-[var(--color-text-secondary)]">
                    {loc.province}
                  </span>
                </Link>
              );
            })}
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
