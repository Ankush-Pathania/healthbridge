import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { PROVINCES } from '@/lib/constants';

export async function generateStaticParams() {
  return PROVINCES.map((p) => ({ province: p.slug }));
}

export async function generateMetadata(
  props: PageProps<'/locations/[province]'>
): Promise<Metadata> {
  const { province } = await props.params;
  const prov = PROVINCES.find((p) => p.slug === province);
  if (!prov) return { title: 'Province Not Found' };

  return {
    title: `Healthcare Jobs in ${prov.name}`,
    description: `Browse healthcare jobs in ${prov.name}, Canada. Find nursing, PSW, caregiver, and healthcare assistant positions.`,
  };
}

export default async function ProvincePage(props: PageProps<'/locations/[province]'>) {
  const { province } = await props.params;
  const prov = PROVINCES.find((p) => p.slug === province);

  if (!prov) {
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
          <span className="text-[var(--color-text)]">{prov.name}</span>
        </nav>

        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
          Healthcare Jobs in {prov.name}
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
          Browse healthcare positions in {prov.name}. Select a city below to find jobs near you.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {prov.cities.map((city) => {
            const citySlug = city
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return (
              <Link
                key={city}
                href={`/locations/${prov.slug}/${citySlug}`}
                className="block p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-md)] hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-sm)] transition-all no-underline text-center"
              >
                <span className="text-sm font-medium text-[var(--color-text)]">{city}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
