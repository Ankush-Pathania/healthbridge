import Container from '@/components/ui/Container';

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  intro: string;
  children: React.ReactNode;
}

/**
 * Shared scaffolding for the policy pages (privacy, terms, accessibility).
 * Keeps heading, prose, and spacing consistent across all three.
 */
export default function LegalPage({ title, lastUpdated, intro, children }: LegalPageProps) {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">{title}</h1>
        <p className="text-sm text-[var(--color-text-tertiary)] mb-6">
          Last updated: {lastUpdated}
        </p>

        <div className="flex flex-col gap-6 text-[var(--color-text-secondary)] leading-relaxed">
          <p>{intro}</p>
          {children}
        </div>
      </Container>
    </section>
  );
}

/** Section heading styled to match the rest of the site's prose pages. */
export function LegalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold text-[var(--color-text)] mt-4">{children}</h2>
  );
}

/** Bulleted list styled to match the job detail page's list treatment. */
export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 list-none p-0 m-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-[var(--color-primary)] mt-1 flex-shrink-0">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
