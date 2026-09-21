import Container from '@/components/ui/Container';
import { JOB_CATEGORIES, PROVINCES } from '@/lib/constants';

const STATS = [
  { label: 'Healthcare Categories', value: `${JOB_CATEGORIES.length}+` },
  { label: 'Provinces Covered', value: `${PROVINCES.length}` },
  { label: 'Trusted by Employers', value: 'Growing' },
];

// Sample copy — swap for a real employer/worker quote once available.
const TESTIMONIAL = {
  quote:
    "HealthBridge helped me find a PSW role close to home within a week of posting my profile. The whole process felt effortless.",
  name: 'Priya Nair',
  role: 'Personal Support Worker, Toronto',
};

export default function StatsAndTestimonial() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-3xl font-bold text-[var(--color-primary)]">{stat.value}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 p-6 sm:p-8 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-xl)]">
            <p className="text-lg text-[var(--color-text)] leading-relaxed mb-4">
              &ldquo;{TESTIMONIAL.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-pastel-green)] text-[var(--color-pastel-green-fg)] flex items-center justify-center font-semibold">
                {TESTIMONIAL.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">{TESTIMONIAL.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{TESTIMONIAL.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
