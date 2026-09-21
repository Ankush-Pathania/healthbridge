import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import WorkerIllustration from '@/components/home/illustrations/WorkerIllustration';

export default function WorkerCTA() {
  return (
    <section className="py-6 sm:py-8">
      <Container>
        <div className="bg-[var(--color-pastel-green)] rounded-[var(--radius-2xl)] py-12 sm:py-14 px-6 sm:px-10">
          <div className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center max-w-2xl mx-auto text-center sm:text-left">
            <WorkerIllustration className="w-32 sm:w-40 mx-auto order-1" />
            <div className="order-2">
              <h2 className="text-2xl font-semibold text-[var(--color-pastel-green-fg)] mb-3">
                Ready for your next healthcare role?
              </h2>
              <p className="text-[var(--color-pastel-green-fg)] opacity-80 mb-6 leading-relaxed">
                Browse jobs across Canada or create your profile to get matched with employers looking for your skills.
              </p>
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3">
                <Button href="/jobs" variant="primary" size="lg">
                  Browse Jobs
                </Button>
                <Button href="/workers/profile" variant="secondary" size="lg">
                  Post Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
