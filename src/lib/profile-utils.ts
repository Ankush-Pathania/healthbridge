import type { WorkerProfile } from '@/types/worker';

export interface CompletionItem {
  id: string;
  label: string;
  weight: number;
  completed: boolean;
}

export interface ProfileCompletionResult {
  score: number;
  items: CompletionItem[];
}

export function calculateProfileCompletion(
  profile: Partial<WorkerProfile> & {
    photoFile?: File | null;
    resumeFile?: File | null;
  }
): ProfileCompletionResult {
  const items: CompletionItem[] = [
    {
      id: 'photo',
      label: 'Profile photo',
      weight: 15,
      completed: Boolean(profile.photoUrl || profile.photoFile),
    },
    {
      id: 'headline',
      label: 'Professional title / headline',
      weight: 15,
      completed: Boolean(profile.headline && profile.headline.trim().length > 3),
    },
    {
      id: 'summary',
      label: 'Bio / Summary',
      weight: 15,
      completed: Boolean(profile.summary && profile.summary.trim().length > 15),
    },
    {
      id: 'resume',
      label: 'Resume document uploaded',
      weight: 15,
      completed: Boolean(profile.resumeUrl || profile.resumeFile),
    },
    {
      id: 'category',
      label: 'Role / category',
      weight: 10,
      completed: Boolean(profile.category),
    },
    {
      id: 'location_experience',
      label: 'Location & years of experience',
      weight: 10,
      completed: Boolean(profile.location?.city && profile.experience !== undefined),
    },
    {
      id: 'history',
      label: 'Work experience or education',
      weight: 10,
      completed: Boolean(
        (profile.workExperience && profile.workExperience.length > 0) ||
        (profile.education && profile.education.length > 0)
      ),
    },
    {
      id: 'certifications',
      label: 'Certifications or phone number',
      weight: 10,
      completed: Boolean(
        (profile.certifications && profile.certifications.length > 0) || profile.phone
      ),
    },
  ];

  const score = items.reduce((acc, item) => (item.completed ? acc + item.weight : acc), 0);

  return { score, items };
}
