import type { JobCategory } from './job';

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
  createdAt: string;
  updatedAt: string;
}
