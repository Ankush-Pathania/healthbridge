import Container from '@/components/ui/Container';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <section className="py-12 sm:py-20">
      <Container size="narrow">
        <div className="max-w-[420px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">{title}</h1>
            {subtitle && (
              <p className="text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
            )}
          </div>

          <div className="p-6 sm:p-8 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]">
            {children}
          </div>

          {footer && (
            <div className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
              {footer}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
