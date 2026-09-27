'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { useAuth } from '@/lib/auth/auth-context';
import { getWorkerProfile, saveWorkerProfile } from '@/lib/firebase/worker-profiles';
import { uploadProfilePhoto, uploadResume } from '@/lib/firebase/storage';
import { calculateProfileCompletion } from '@/lib/profile-utils';
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

  const completion = useMemo(() => {
    return calculateProfileCompletion({
      displayName,
      headline,
      summary,
      category,
      location: { city, province: province.name, provinceCode: province.code },
      experience: Number(experience) || 0,
      photoUrl,
      photoFile,
      resumeUrl,
      resumeFile,
      education,
      workExperience,
      certifications: splitList(certifications),
      phone,
    });
  }, [
    displayName,
    headline,
    summary,
    category,
    city,
    province,
    experience,
    photoUrl,
    photoFile,
    resumeUrl,
    resumeFile,
    education,
    workExperience,
    certifications,
    phone,
  ]);

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
          : 'Could not save your profile. Please verify files and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingProfile) {
    return <Loader size="lg" text="Loading worker profile credentials…" />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative" noValidate>
      {submitting && (
        <Loader size="full" text="Uploading files & saving your profile…" />
      )}

      {/* Dynamic Profile Completion Widget */}
      <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-[var(--radius-xl)] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              Profile Strength Meter
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                {completion.score}% Complete
              </span>
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Complete your profile to increase employer discovery and job application success.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden mb-4">
          <div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completion.score}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {completion.items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-1.5 p-1.5 rounded-md border ${
                item.completed
                  ? 'bg-white/80 border-green-200 text-green-800 font-medium'
                  : 'bg-white/40 border-gray-200 text-gray-500'
              }`}
            >
              <span>{item.completed ? '✓' : '○'}</span>
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Section */}
      <SectionHeading title="Profile Photo" />
      <div className="flex items-center gap-4 p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <div className="w-20 h-20 rounded-full bg-[var(--color-primary-light)] overflow-hidden flex-shrink-0 flex items-center justify-center border-2 border-[var(--color-primary)]">
          {photoPreview || photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoPreview ?? photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-[var(--color-primary-dark)]">
              {displayName.charAt(0).toUpperCase() || '?'}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] hover:bg-blue-100 transition-colors">
            📷 Choose Photo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
          {photoFile && (
            <p className="text-xs text-green-700 font-medium">Selected: {photoFile.name}</p>
          )}
          <p className="text-xs text-[var(--color-text-tertiary)]">JPG or PNG. Maximum size 5 MB.</p>
        </div>
      </div>

      {/* Basic Info */}
      <SectionHeading title="Basic Information" />
      <Input
        label="Full name"
        name="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
      />
      <Input
        label="Professional Title / Headline"
        name="headline"
        placeholder="e.g. Registered Nurse (RN) specializing in ICU & Critical Care"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        required
      />
      <Select
        label="Role Category"
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
          label="Years of Experience"
          name="experience"
          type="number"
          min="0"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <Input
          label="Phone Number (Optional)"
          name="phone"
          type="tel"
          placeholder="e.g. (416) 555-0199"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* Location */}
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

      {/* Bio */}
      <SectionHeading title="Professional Bio & Summary" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="summary" className="text-sm font-medium text-[var(--color-text)]">
          Summary / Cover Bio
        </label>
        <textarea
          id="summary"
          name="summary"
          rows={5}
          placeholder="Describe your healthcare background, clinical skills, passion for patient care, and goals..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className={textareaClasses}
          required
        />
      </div>

      {/* Dedicated Resume Upload & Preview Section */}
      <SectionHeading title="Resume & CV Upload" />
      <div className="p-5 border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-[var(--radius-xl)] flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-sm">
            📄
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-gray-900">Upload Your Official Resume</h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Employers review your resume when assessing job applications. Upload a PDF or Word document (up to 5 MB).
            </p>
          </div>
        </div>

        {/* Existing / Uploaded Resume Action Card */}
        {resumeUrl && !resumeFile && (
          <div className="p-3.5 bg-white border border-blue-200 rounded-[var(--radius-lg)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-green-600 text-lg">✓</span>
              <div>
                <p className="text-xs font-bold text-gray-800">Resume Currently Attached</p>
                <p className="text-[11px] text-gray-500">Ready for employer review</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-[var(--radius-md)] bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-flex items-center gap-1"
              >
                👁️ Preview
              </a>
              <a
                href={resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold rounded-[var(--radius-md)] border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors inline-flex items-center gap-1"
              >
                ⬇️ Download
              </a>
            </div>
          </div>
        )}

        {/* Selected File Notice */}
        {resumeFile && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-[var(--radius-lg)] flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-900">New file selected for upload:</p>
              <p className="text-xs text-amber-800">{resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)</p>
            </div>
            <button
              type="button"
              onClick={() => setResumeFile(null)}
              className="text-xs text-amber-900 underline hover:no-underline cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* File Picker input */}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-[var(--radius-md)] bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors shadow-xs">
            📎 {resumeUrl ? 'Replace Resume' : 'Select Resume File'}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
          <span className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX (Max 5 MB)</span>
        </div>
      </div>

      {/* Education */}
      <SectionHeading title="Education & Qualifications" />
      <div className="flex flex-col gap-4">
        {education.map((row, index) => (
          <div key={index} className="p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] flex flex-col gap-3 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="School / Institution"
                value={row.school}
                onChange={(e) => updateEducation(index, { school: e.target.value })}
              />
              <Input
                label="Degree / Certification"
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
              className="self-start text-red-600 hover:text-red-700"
              onClick={() => setEducation((rows) => rows.filter((_, i) => i !== index))}
            >
              Remove Education Entry
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
          + Add Education
        </Button>
      </div>

      {/* Work Experience */}
      <SectionHeading title="Work History" />
      <div className="flex flex-col gap-4">
        {workExperience.map((row, index) => (
          <div key={index} className="p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] flex flex-col gap-3 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Employer / Hospital"
                value={row.employer}
                onChange={(e) => updateExperience(index, { employer: e.target.value })}
              />
              <Input
                label="Role Title"
                value={row.role}
                onChange={(e) => updateExperience(index, { role: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Start date"
                placeholder="e.g. Jan 2021"
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
              <label className="text-sm font-medium text-[var(--color-text)]">Key Responsibilities</label>
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
              className="self-start text-red-600 hover:text-red-700"
              onClick={() => setWorkExperience((rows) => rows.filter((_, i) => i !== index))}
            >
              Remove Experience Entry
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
          + Add Work Experience
        </Button>
      </div>

      {/* Certifications */}
      <SectionHeading title="Certifications & Licenses" />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="certifications" className="text-sm font-medium text-[var(--color-text)]">
          Certifications (e.g. CPR/AED, BLS, ACLS, CNO Registration)
        </label>
        <textarea
          id="certifications"
          name="certifications"
          rows={3}
          placeholder="Enter certifications separated by commas or lines"
          value={certifications}
          onChange={(e) => setCertifications(e.target.value)}
          className={textareaClasses}
        />
      </div>

      {/* Availability */}
      <SectionHeading title="Job Preferences" />
      <div className="p-4 bg-white border border-[var(--color-border)] rounded-[var(--radius-lg)] flex flex-col gap-3">
        <label className="flex items-center gap-2 text-sm text-[var(--color-text)] cursor-pointer">
          <input
            type="checkbox"
            checked={availableForWork}
            onChange={(e) => setAvailableForWork(e.target.checked)}
            className="w-4 h-4 accent-[var(--color-primary)]"
          />
          <strong>Immediately Available for Work</strong>
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--color-text)] cursor-pointer">
          <input
            type="checkbox"
            checked={openToRelocate}
            onChange={(e) => setOpenToRelocate(e.target.checked)}
            className="w-4 h-4 accent-[var(--color-primary)]"
          />
          Open to relocation across provinces
        </label>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-[var(--radius-md)] text-xs text-red-700" role="alert">
          ⚠️ {error}
        </div>
      )}

      <div className="pt-4 flex gap-3">
        <Button type="submit" size="lg" loading={submitting}>
          {submitting ? 'Saving Profile & Files…' : 'Save & Publish Profile'}
        </Button>
      </div>
    </form>
  );
}
