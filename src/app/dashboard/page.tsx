'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import EmployerDashboard from '@/components/dashboard/EmployerDashboard';
import { useAuth } from '@/lib/auth/auth-context';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (user.role !== 'employer') {
      router.replace('/account');
    }
  }, [loading, user, router]);

  if (loading || !user || user.role !== 'employer') {
    return (
      <section className="py-16">
        <Container>
          <p className="text-[var(--color-text-secondary)]">Loading...</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 sm:py-14">
      <Container>
        <EmployerDashboard uid={user.uid} displayName={user.displayName} />
      </Container>
    </section>
  );
}