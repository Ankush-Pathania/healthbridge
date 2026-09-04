import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { UserCheckIcon } from '@/components/icons/UtilityIcons';

export default function WorkerCTA() {
  return (
    <section className="py-16">
      <Container size="narrow">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center mx-auto mb-4">
            <UserCheckIcon size={26} />
          </div>
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-3">
            Ready for your next healthcare role?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6 max-w-lg mx-auto leading-relaxed">
            Browse jobs across Canada or create your profile to get matched with employers looking for your skills.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/jobs" size="lg">
              Browse Jobs
            </Button>
            <Button href="/workers/profile" variant="secondary" size="lg">
              Post Profile
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
