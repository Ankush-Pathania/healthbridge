import type { JobCategory } from './job';

export interface EducationEntry {
  school: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export interface WorkExperienceEntry {
  employer: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkerProfile {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  category: JobCategory;
  headline: string;
  summary: string;
  location: {
    city: string;
    province: string;
    provinceCode: string;
  };
  experience: number;
  certifications: string[];
  availableForWork: boolean;
  openToRelocate: boolean;
  photoUrl?: string;
  resumeUrl?: string;
  education: EducationEntry[];
  workExperience: WorkExperienceEntry[];
  createdAt: string;
  updatedAt: string;
}
