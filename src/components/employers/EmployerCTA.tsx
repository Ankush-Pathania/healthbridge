import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import EmployerIllustration from '@/components/home/illustrations/EmployerIllustration';

export default function EmployerCTA() {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <div className="bg-[var(--color-pastel-blue)] rounded-[var(--radius-2xl)] py-12 sm:py-14 px-6 sm:px-10">
          <div className="grid sm:grid-cols-[1fr_auto] gap-6 sm:gap-10 items-center max-w-2xl mx-auto text-center sm:text-left">
            <div className="order-2 sm:order-1">
              <h2 className="text-2xl font-semibold text-[var(--color-pastel-blue-fg)] mb-3">
                Looking to hire healthcare workers?
              </h2>
              <p className="text-[var(--color-pastel-blue-fg)] opacity-80 mb-6 leading-relaxed">
                Post your job and reach thousands of qualified nurses, PSWs, and caregivers across Canada.
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3">
                <Button href="/jobs/new" variant="primary" size="lg">
                  Post a Job
                </Button>
                <Button href="/employers" variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <EmployerIllustration className="w-32 sm:w-40 mx-auto order-1 sm:order-2" />
          </div>
        </div>
      </Container>
    </section>
  );
}
