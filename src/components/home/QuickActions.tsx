'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import { SearchIcon, BriefcaseIcon, UserCheckIcon, GridIcon } from '@/components/icons/UtilityIcons';
import { useAuth } from '@/lib/auth/auth-context';

export default function QuickActions() {
  const { user } = useAuth();

  const actions = !user
    ? [
        {
          href: '/jobs',
          title: 'Search Jobs',
          description: 'Browse open healthcare roles across Canada',
          icon: SearchIcon,
          bg: 'bg-[var(--color-pastel-blue)]',
          fg: 'text-[var(--color-pastel-blue-fg)]',
        },
        {
          href: '/jobs/new',
          title: 'Post a Job',
          description: 'Reach qualified healthcare talent fast',
          icon: BriefcaseIcon,
          bg: 'bg-[var(--color-pastel-pink)]',
          fg: 'text-[var(--color-pastel-pink-fg)]',
        },
        {
          href: '/workers',
          title: 'Browse Workers',
          description: 'Find available healthcare candidates',
          icon: UserCheckIcon,
          bg: 'bg-[var(--color-pastel-green)]',
          fg: 'text-[var(--color-pastel-green-fg)]',
        },
        {
          href: '/jobs',
          title: 'Browse by Category',
          description: 'RN, PSW, LPN, and Caregiver roles',
          icon: GridIcon,
          bg: 'bg-[var(--color-pastel-yellow)]',
          fg: 'text-[var(--color-pastel-yellow-fg)]',
        },
      ]
    : user.role === 'employer'
      ? [
          {
            href: '/jobs/new',
            title: 'Post a Job',
            description: 'Create a new healthcare job post',
            icon: BriefcaseIcon,
            bg: 'bg-[var(--color-pastel-pink)]',
            fg: 'text-[var(--color-pastel-pink-fg)]',
          },
          {
            href: '/workers',
            title: 'Find Candidates',
            description: 'Browse candidate profiles & resumes',
            icon: UserCheckIcon,
            bg: 'bg-[var(--color-pastel-green)]',
            fg: 'text-[var(--color-pastel-green-fg)]',
          },
          {
            href: '/dashboard',
            title: 'Employer Dashboard',
            description: 'Review applicants & manage job posts',
            icon: SearchIcon,
            bg: 'bg-[var(--color-pastel-blue)]',
            fg: 'text-[var(--color-pastel-blue-fg)]',
          },
          {
            href: '/pricing',
            title: 'Employer Plans',
            description: 'Manage employer subscription',
            icon: GridIcon,
            bg: 'bg-[var(--color-pastel-yellow)]',
            fg: 'text-[var(--color-pastel-yellow-fg)]',
          },
        ]
      : [
          {
            href: '/jobs',
            title: 'Search Jobs',
            description: 'Explore active nursing & PSW job posts',
            icon: SearchIcon,
            bg: 'bg-[var(--color-pastel-blue)]',
            fg: 'text-[var(--color-pastel-blue-fg)]',
          },
          {
            href: '/workers/profile',
            title: 'My Profile & Resume',
            description: 'Update your profile and upload resume',
            icon: UserCheckIcon,
            bg: 'bg-[var(--color-pastel-green)]',
            fg: 'text-[var(--color-pastel-green-fg)]',
          },
          {
            href: '/account',
            title: 'My Applications',
            description: 'Track application statuses',
            icon: BriefcaseIcon,
            bg: 'bg-[var(--color-pastel-pink)]',
            fg: 'text-[var(--color-pastel-pink-fg)]',
          },
          {
            href: '/pricing',
            title: 'Worker Plans',
            description: 'Unlock full salary & job descriptions',
            icon: GridIcon,
            bg: 'bg-[var(--color-pastel-yellow)]',
            fg: 'text-[var(--color-pastel-yellow-fg)]',
          },
        ];

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
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
