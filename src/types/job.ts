export type JobCategory =
  | 'rn'
  | 'lpn'
  | 'rpn'
  | 'psw'
  | 'caregiver'
  | 'home-support'
  | 'healthcare-assistant';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'casual';

export type ShiftType = 'day' | 'night' | 'rotating' | 'flexible';

export type SalaryPeriod = 'hourly' | 'annually';

export interface JobEmployer {
  name: string;
  verified: boolean;
}

export interface JobLocation {
  city: string;
  province: string;
  provinceCode: string;
  remote: boolean;
}

export interface JobSalary {
  min: number;
  max: number;
  period: SalaryPeriod;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  category: JobCategory;
  employerUid?: string;
  employer: JobEmployer;
  location: JobLocation;
  type: JobType;
  shift: ShiftType;
  salary: JobSalary;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  closingDate?: string;
  urgent: boolean;
  featured: boolean;
}
