'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { useAuth } from '@/lib/auth/auth-context';
import { getWorkerProfile, saveWorkerProfile } from '@/lib/firebase/worker-profiles';
import { uploadProfilePhoto, uploadResume } from '@/lib/firebase/storage';
import { JOB_CATEGORIES, PROVINCES } from '@/lib/constants';
import type { JobCategory } from '@/types/job';
import type { EducationEntry, WorkExperienceEntry } from '@/types/worker';

function splitList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

const emptyEducation: EducationEntry = { school: '', degree: '', field: '', startYear: '', endYear: '' };
const emptyExperience: WorkExperienceEntry = {
  employer: '',
  role: '',
  startDate: '',
  endDate: '',
  description: '',
};

const textareaClasses =
  'w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-3 py-2.5 text-base text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]';

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold text-[var(--color-text)] mt-4 border-t border-[var(--color-border)] pt-6 first:mt-0 first:border-0 first:pt-0">
      {title}
    </h2>
  );
}

export default function WorkerProfileForm() {
  const { user, refreshUser } = useAuth();
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

  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);

  const [resumeUrl, setResumeUrl] = useState<string | undefined>(undefined);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperienceEntry[]>([]);

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
        setPhotoUrl(profile.photoUrl);
        setResumeUrl(profile.resumeUrl);
        setEducation(profile.education ?? []);
        setWorkExperience(profile.workExperience ?? []);
      })
      .catch((err) => console.error('[worker profile] failed to load', err))
      .finally(() => setLoadingProfile(false));
  }, [user]);

  useEffect(() => {
    if (!photoFile) return;
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  function handleProvinceChange(nextSlug: string) {
    const next = PROVINCES.find((item) => item.slug === nextSlug) ?? PROVINCES[0];
    setProvinceSlug(next.slug);
    setCity(next.cities[0]);
  }

  function updateEducation(index: number, patch: Partial<EducationEntry>) {
    setEducation((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function updateExperience(index: number, patch: Partial<WorkExperienceEntry>) {
    setWorkExperience((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
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
      let finalPhotoUrl = photoUrl;
      if (photoFile) {
        finalPhotoUrl = await uploadProfilePhoto(user.uid, photoFile);
      }

      let finalResumeUrl = resumeUrl;
      if (resumeFile) {
        finalResumeUrl = await uploadResume(user.uid, resumeFile);
      }

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
        photoUrl: finalPhotoUrl,
        resumeUrl: finalResumeUrl,
        education: education.filter((row) => row.school.trim() || row.degree.trim()),
        workExperience: workExperience.filter((row) => row.employer.trim() || row.role.trim()),
      });
      await refreshUser();
      router.push('/account');
    } catch (err) {
      setError(
        err instanceof Error && (err.message.includes('5 MB') || err.message.includes('PDF'))
          ? err.message
          : 'Could not save your profile. Publish the latest Firestore rules, then try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingProfile) {
    return <p className="text-[var(--color-text-secondary)]">Loading…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <SectionHeading title="Photo" />
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-[var(--color-primary-light)] overflow-hidden flex-shrink-0 flex items-center justify-center">
          {photoPreview || photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoPreview ?? photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-semibold text-[var(--color-primary-dark)]">
              {displayName.charAt(0).toUpperCase() || '?'}
            </span>
          )}
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-[var(--color-text)]">Upload photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
            className="text-sm text-[var(--color-text-secondary)]"
          />
        </label>
      </div>

      <SectionHeading title="Basic Info" />
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

      <SectionHeading title="Location" />
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

      <SectionHeading title="About" />
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
          className={textareaClasses}
          required
        />
      </div>

      <SectionHeading title="Education" />
      <div className="flex flex-col gap-4">
        {education.map((row, index) => (
          <div key={index} className="p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="School"
                value={row.school}
                onChange={(e) => updateEducation(index, { school: e.target.value })}
              />
              <Input
                label="Degree"
                value={row.degree}
                onChange={(e) => updateEducation(index, { degree: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="Field of study"
                value={row.field}
                onChange={(e) => updateEducation(index, { field: e.target.value })}
              />
              <Input
                label="Start year"
                value={row.startYear}
                onChange={(e) => updateEducation(index, { startYear: e.target.value })}
              />
              <Input
                label="End year"
                value={row.endYear}
                onChange={(e) => updateEducation(index, { endYear: e.target.value })}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="self-start"
              onClick={() => setEducation((rows) => rows.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="self-start"
          onClick={() => setEducation((rows) => [...rows, { ...emptyEducation }])}
        >
          Add education
        </Button>
      </div>

      <SectionHeading title="Experience" />
      <div className="flex flex-col gap-4">
        {workExperience.map((row, index) => (
          <div key={index} className="p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] flex flex-col gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Employer"
                value={row.employer}
                onChange={(e) => updateExperience(index, { employer: e.target.value })}
              />
              <Input
                label="Role"
                value={row.role}
                onChange={(e) => updateExperience(index, { role: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Start date"
                placeholder="e.g. Jan 2020"
                value={row.startDate}
                onChange={(e) => updateExperience(index, { startDate: e.target.value })}
              />
              <Input
                label="End date"
                placeholder="e.g. Present"
                value={row.endDate}
                onChange={(e) => updateExperience(index, { endDate: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[var(--color-text)]">Description</label>
              <textarea
                rows={3}
                value={row.description}
                onChange={(e) => updateExperience(index, { description: e.target.value })}
                className={textareaClasses}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="self-start"
              onClick={() => setWorkExperience((rows) => rows.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="self-start"
          onClick={() => setWorkExperience((rows) => [...rows, { ...emptyExperience }])}
        >
          Add experience
        </Button>
      </div>

      <SectionHeading title="Certifications" />
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
          className={textareaClasses}
        />
      </div>

      <SectionHeading title="Resume" />
      <div className="flex flex-col gap-2">
        {resumeUrl && !resumeFile && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-primary)] underline w-fit"
          >
            View current resume
          </a>
        )}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
          className="text-sm text-[var(--color-text-secondary)]"
        />
        <p className="text-xs text-[var(--color-text-tertiary)]">PDF or Word document, up to 5 MB.</p>
      </div>

      <SectionHeading title="Availability" />
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
        {submitting ? 'Saving…' : 'Save Profile'}
      </Button>
    </form>
  );
}
