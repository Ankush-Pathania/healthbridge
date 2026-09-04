'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import { useAuth } from '@/lib/auth/auth-context';
import type { UserRole } from '@/types/auth';

export default function RequireRole({
  role,
  children,
}: {
  role: UserRole;
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      const path = typeof window !== 'undefined' ? window.location.pathname : '/account';
      router.replace(`/login?redirect=${encodeURIComponent(path)}`);
      return;
    }
    if (user.role !== role) {
      router.replace('/account');
    }
  }, [loading, user, role, router]);

  if (loading || !user || user.role !== role) {
    return (
      <section className="py-16">
        <Container size="narrow">
          <p className="text-[var(--color-text-secondary)]">Loading…</p>
        </Container>
      </section>
    );
  }

  return <>{children}</>;
}
