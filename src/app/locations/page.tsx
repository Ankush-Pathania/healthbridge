import type { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { PROVINCES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Healthcare Jobs by Location',
  description:
    'Browse healthcare jobs across all Canadian provinces and territories. Find nursing, PSW, and caregiver positions near you.',
};

export default function LocationsPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
          Healthcare Jobs by Location
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Find healthcare positions across Canada. Browse jobs by province and city.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROVINCES.map((province) => (
            <div
              key={province.code}
              className="p-5 border border-[var(--color-border)] rounded-[var(--radius-lg)]"
            >
              <h2 className="text-base font-semibold text-[var(--color-text)] mb-3">
                <Link
                  href={`/locations/${province.slug}`}
                  className="hover:text-[var(--color-primary)] no-underline text-[var(--color-text)]"
                >
                  {province.name}
                </Link>
              </h2>
              <ul className="flex flex-col gap-1.5 list-none p-0 m-0">
                {province.cities.map((city) => {
                  const citySlug = city
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                  return (
                    <li key={city}>
                      <Link
                        href={`/locations/${province.slug}/${citySlug}`}
                        className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] no-underline"
                      >
                        {city}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
