import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { BriefcaseIcon } from '@/components/icons/UtilityIcons';

export default function EmployerCTA() {
  return (
    <section className="bg-[var(--color-bg-subtle)] py-16 border-y border-[var(--color-border)]">
      <Container size="narrow">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-primary)] flex items-center justify-center mx-auto mb-4">
            <BriefcaseIcon size={26} />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-3">
            Looking to hire healthcare workers?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-lg mx-auto leading-relaxed">
            Post your job and reach thousands of qualified nurses, PSWs, and caregivers across Canada.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/jobs/new" size="lg">
              Post a Job
            </Button>
            <Button href="/employers" variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
