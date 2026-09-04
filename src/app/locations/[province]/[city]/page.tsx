import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import JobsBoard from '@/components/jobs/JobsBoard';
import { PROVINCES } from '@/lib/constants';
import { cityToSlug } from '@/lib/utils';

export async function generateStaticParams() {
  const params: { province: string; city: string }[] = [];
  for (const prov of PROVINCES) {
    for (const city of prov.cities) {
      params.push({ province: prov.slug, city: cityToSlug(city) });
    }
  }
  return params;
}

export async function generateMetadata(
  props: PageProps<'/locations/[province]/[city]'>
): Promise<Metadata> {
  const { province, city } = await props.params;
  const prov = PROVINCES.find((p) => p.slug === province);
  if (!prov) return { title: 'Location Not Found' };

  const cityName = prov.cities.find(
    (c) => cityToSlug(c) === city
  );

  if (!cityName) return { title: 'City Not Found' };

  return {
    title: `Healthcare Jobs in ${cityName}, ${prov.name}`,
    description: `Find healthcare jobs in ${cityName}, ${prov.name}. Browse nursing, PSW, caregiver, and healthcare assistant positions.`,
  };
}

export default async function CityPage(props: PageProps<'/locations/[province]/[city]'>) {
  const { province, city } = await props.params;
  const prov = PROVINCES.find((p) => p.slug === province);

  if (!prov) {
    notFound();
  }

  const cityName = prov.cities.find(
    (c) => cityToSlug(c) === city
  );

  if (!cityName) {
    notFound();
  }

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-[var(--color-text-secondary)]" aria-label="Breadcrumb">
          <Link href="/locations" className="hover:text-[var(--color-text)] no-underline text-[var(--color-text-secondary)]">
            Locations
          </Link>
          <span className="mx-2">›</span>
          <Link
            href={`/locations/${prov.slug}`}
            className="hover:text-[var(--color-text)] no-underline text-[var(--color-text-secondary)]"
          >
            {prov.name}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--color-text)]">{cityName}</span>
        </nav>

        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
          Healthcare Jobs in {cityName}, {prov.name}
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Browse healthcare positions in {cityName}. Find nursing, PSW, caregiver, and healthcare assistant jobs from local employers.
        </p>

        <JobsBoard
          city={cityName}
          title={`Jobs in ${cityName}`}
          showFilters={false}
        />

        <div className="mt-6">
          <Link
            href="/jobs"
            className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] no-underline"
          >
            ← Browse all jobs across Canada
          </Link>
        </div>
      </Container>
    </section>
  );
}
