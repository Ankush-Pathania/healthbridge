import Link from 'next/link';
import Container from '@/components/ui/Container';
import { SearchIcon, BriefcaseIcon, UserCheckIcon, GridIcon } from '@/components/icons/UtilityIcons';

const ACTIONS = [
  {
    href: '/jobs',
    title: 'Search Jobs',
    description: 'Browse open healthcare roles',
    icon: SearchIcon,
    bg: 'bg-[var(--color-pastel-blue)]',
    fg: 'text-[var(--color-pastel-blue-fg)]',
  },
  {
    href: '/jobs/new',
    title: 'Post a Job',
    description: 'Reach qualified candidates fast',
    icon: BriefcaseIcon,
    bg: 'bg-[var(--color-pastel-pink)]',
    fg: 'text-[var(--color-pastel-pink-fg)]',
  },
  {
    href: '/workers',
    title: 'Browse Workers',
    description: 'Find available healthcare talent',
    icon: UserCheckIcon,
    bg: 'bg-[var(--color-pastel-green)]',
    fg: 'text-[var(--color-pastel-green-fg)]',
  },
  {
    href: '/jobs',
    title: 'Browse by Category',
    description: 'RN, PSW, LPN, and more',
    icon: GridIcon,
    bg: 'bg-[var(--color-pastel-yellow)]',
    fg: 'text-[var(--color-pastel-yellow-fg)]',
  },
];

export default function QuickActions() {
  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ACTIONS.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={`flex flex-col gap-3 p-5 rounded-[var(--radius-xl)] ${action.bg} ${action.fg} no-underline hover:shadow-[var(--shadow-xl)] hover:-translate-y-0.5 transition-all duration-[var(--transition-fast)]`}
            >
              <div className="w-11 h-11 rounded-full bg-white/60 flex items-center justify-center">
                <action.icon size={22} />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-0.5">{action.title}</h3>
                <p className="text-sm opacity-80 leading-snug">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
