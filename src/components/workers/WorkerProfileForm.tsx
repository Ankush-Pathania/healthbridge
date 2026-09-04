'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/auth-context';
import { getWorkerProfile, saveWorkerProfile } from '@/lib/firebase/worker-profiles';
import { JOB_CATEGORIES, PROVINCES } from '@/lib/constants';
import type { JobCategory } from '@/types/job';

function splitList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function WorkerProfileForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState(user?.displayName ?? '');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<JobCategory>('psw');
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [provinceSlug, setProvinceSlug] = useState(PROVINCES[0].slug);
  const [city, setCity] = useState(PROVINCES[0].cities[0]);
  const [experience, setExperience] = useState('1');
  const [certifications, setCertifications] = useState('');
  const [availableForWork, setAvailableForWork] = useState(true);
  const [openToRelocate, setOpenToRelocate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const province = useMemo(
    () => PROVINCES.find((item) => item.slug === provinceSlug) ?? PROVINCES[0],
    [provinceSlug]
  );

  useEffect(() => {
    if (!user) return;
    getWorkerProfile(user.uid)
      .then((profile) => {
        if (!profile) return;
        setDisplayName(profile.displayName);
        setPhone(profile.phone ?? '');
        setCategory(profile.category);
        setHeadline(profile.headline);
        setSummary(profile.summary);
        const match = PROVINCES.find((item) => item.code === profile.location.provinceCode);
        if (match) {
          setProvinceSlug(match.slug);
          setCity(profile.location.city);
        }
        setExperience(String(profile.experience));
        setCertifications(profile.certifications.join('\n'));
        setAvailableForWork(profile.availableForWork);
        setOpenToRelocate(profile.openToRelocate);
      })
      .catch((err) => console.error('[worker profile] failed to load', err))
      .finally(() => setLoadingProfile(false));
  }, [user]);

  function handleProvinceChange(nextSlug: string) {
    const next = PROVINCES.find((item) => item.slug === nextSlug) ?? PROVINCES[0];
    setProvinceSlug(next.slug);
    setCity(next.cities[0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    if (!displayName.trim() || !headline.trim() || !summary.trim()) {
      setError('Add your name, a short headline, and a summary.');
      return;
    }

    const years = Number(experience);
    if (!Number.isFinite(years) || years < 0) {
      setError('Enter years of experience.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await saveWorkerProfile(user.uid, {
        displayName: displayName.trim(),
        email: user.email,
        phone: phone.trim() || undefined,
        category,
        headline: headline.trim(),
        summary: summary.trim(),
        location: {
          city,
          province: province.name,
          provinceCode: province.code,
        },
        experience: years,
        certifications: splitList(certifications),
        availableForWork,
        openToRelocate,
      });
      router.push('/account');
    } catch {
      setError('Could not save your profile. Publish the latest Firestore rules, then try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingProfile) {
    return <p className="text-[var(--color-text-secondary)]">Loading…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Input
        label="Full name"
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
      />
      <Input
        label="Headline"
        name="headline"
        placeholder="PSW available for home care in Toronto"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        required
      />
      <Select
        label="Role / category"
        name="category"
        value={category}
        onChange={(e) => setCategory(e.target.value as JobCategory)}
      >
        {JOB_CATEGORIES.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.label}
          </option>
        ))}
      </Select>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Province"
          name="province"
          value={provinceSlug}
          onChange={(e) => handleProvinceChange(e.target.value)}
        >
          {PROVINCES.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </Select>
        <Select label="City" name="city" value={city} onChange={(e) => setCity(e.target.value)}>
          {province.cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Years of experience"
          name="experience"
          type="number"
          min="0"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <Input
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="summary" className="text-sm font-medium text-[var(--color-text)]">
          About you
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={5}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="certifications" className="text-sm font-medium text-[var(--color-text)]">
          Certifications (comma or one per line)
        </label>
        <textarea
          id="certifications"
          name="certifications"
          rows={3}
          value={certifications}
          onChange={(e) => setCertifications(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
        <input
          type="checkbox"
          checked={availableForWork}
          onChange={(e) => setAvailableForWork(e.target.checked)}
          className="w-4 h-4 accent-[var(--color-primary)]"
        />
        Available for work
      </label>
      <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
        <input
          type="checkbox"
          checked={openToRelocate}
          onChange={(e) => setOpenToRelocate(e.target.checked)}
          className="w-4 h-4 accent-[var(--color-primary)]"
        />
        Open to relocate
      </label>

      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? 'Saving…' : 'Post Profile'}
      </Button>
    </form>
  );
}
