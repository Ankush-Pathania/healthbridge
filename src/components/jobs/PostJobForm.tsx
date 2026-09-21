'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/auth-context';
import { createJob, getEmployerJobCount } from '@/lib/firebase/jobs';
import { useSubscription, isEmployerSubscribed } from '@/lib/subscription/subscription-context';
import { JOB_CATEGORIES, JOB_TYPE_LABELS, PROVINCES, SHIFT_TYPE_LABELS } from '@/lib/constants';
import type { JobCategory, JobType, SalaryPeriod, ShiftType } from '@/types/job';

const FREE_TIER_JOB_LIMIT = 1;

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function PostJobForm() {
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const router = useRouter();
  const subscribed = isEmployerSubscribed(subscription);

  const [jobCount, setJobCount] = useState<number | null>(null);

  const [title, setTitle] = useState('');
  const [employerName, setEmployerName] = useState(user?.displayName ?? '');
  const [category, setCategory] = useState<JobCategory>('rn');
  const [type, setType] = useState<JobType>('full-time');
  const [shift, setShift] = useState<ShiftType>('day');
  const [provinceSlug, setProvinceSlug] = useState(PROVINCES[0].slug);
  const [city, setCity] = useState(PROVINCES[0].cities[0]);
  const [salaryMin, setSalaryMin] = useState('30');
  const [salaryMax, setSalaryMax] = useState('45');
  const [salaryPeriod, setSalaryPeriod] = useState<SalaryPeriod>('hourly');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [benefits, setBenefits] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const province = useMemo(
    () => PROVINCES.find((item) => item.slug === provinceSlug) ?? PROVINCES[0],
    [provinceSlug]
  );

  useEffect(() => {
    if (!user) return;
    getEmployerJobCount(user.uid)
      .then(setJobCount)
      .catch(() => setJobCount(0));
  }, [user]);

  const atFreeTierLimit = !subscribed && jobCount !== null && jobCount >= FREE_TIER_JOB_LIMIT;

  function handleProvinceChange(nextSlug: string) {
    const next = PROVINCES.find((item) => item.slug === nextSlug) ?? PROVINCES[0];
    setProvinceSlug(next.slug);
    setCity(next.cities[0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    if (atFreeTierLimit) {
      setError('You’ve used your free job post. Subscribe to post unlimited jobs.');
      return;
    }

    if (!title.trim() || !employerName.trim() || !description.trim()) {
      setError('Add a job title, employer name, and description.');
      return;
    }

    const min = Number(salaryMin);
    const max = Number(salaryMax);
    if (!Number.isFinite(min) || !Number.isFinite(max) || min <= 0 || max < min) {
      setError('Enter a valid salary range.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const job = await createJob({
        employerUid: user.uid,
        title: title.trim(),
        category,
        employer: { name: employerName.trim(), verified: false },
        location: {
          city,
          province: province.name,
          provinceCode: province.code,
          remote: false,
        },
        type,
        shift,
        salary: { min, max, period: salaryPeriod },
        description: description.trim(),
        requirements: splitLines(requirements),
        benefits: splitLines(benefits),
        urgent,
      });
      router.push(`/jobs/${job.slug}`);
    } catch {
      setError('Could not post this job. Publish the latest Firestore rules, then try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (atFreeTierLimit) {
    return (
      <div className="p-6 bg-[var(--color-pastel-green)] rounded-[var(--radius-xl)] text-center">
        <h2 className="text-lg font-semibold text-[var(--color-pastel-green-fg)] mb-2">
          You&apos;ve used your free job post
        </h2>
        <p className="text-sm text-[var(--color-pastel-green-fg)] opacity-80 mb-5">
          Subscribe to post unlimited jobs and get featured placement for your listings.
        </p>
        <Button href="/pricing" variant="primary" size="lg">
          View Employer Plans →
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <Input label="Job title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input
        label="Employer / facility name"
        name="employerName"
        value={employerName}
        onChange={(e) => setEmployerName(e.target.value)}
        required
      />
      <Select label="Category" name="category" value={category} onChange={(e) => setCategory(e.target.value as JobCategory)}>
        {JOB_CATEGORIES.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.label}
          </option>
        ))}
      </Select>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select label="Job type" name="type" value={type} onChange={(e) => setType(e.target.value as JobType)}>
          {Object.entries(JOB_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select label="Shift" name="shift" value={shift} onChange={(e) => setShift(e.target.value as ShiftType)}>
          {Object.entries(SHIFT_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Salary min"
          name="salaryMin"
          type="number"
          min="1"
          value={salaryMin}
          onChange={(e) => setSalaryMin(e.target.value)}
          required
        />
        <Input
          label="Salary max"
          name="salaryMax"
          type="number"
          min="1"
          value={salaryMax}
          onChange={(e) => setSalaryMax(e.target.value)}
          required
        />
        <Select
          label="Paid"
          name="salaryPeriod"
          value={salaryPeriod}
          onChange={(e) => setSalaryPeriod(e.target.value as SalaryPeriod)}
        >
          <option value="hourly">Hourly</option>
          <option value="annually">Annually</option>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-[var(--color-text)]">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
          required
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="requirements" className="text-sm font-medium text-[var(--color-text)]">
          Requirements (one per line)
        </label>
        <textarea
          id="requirements"
          name="requirements"
          rows={4}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="benefits" className="text-sm font-medium text-[var(--color-text)]">
          Benefits (one per line)
        </label>
        <textarea
          id="benefits"
          name="benefits"
          rows={4}
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
        <input
          type="checkbox"
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
          className="w-4 h-4 accent-[var(--color-primary)]"
        />
        Mark as urgent
      </label>

      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? 'Posting…' : 'Post Job'}
      </Button>
    </form>
  );
}
