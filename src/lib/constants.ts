import type { JobCategory } from '@/types/job';

/* ============================================
   Site Configuration
   ============================================ */

export const SITE_NAME = 'HealthBridge';
export const SITE_TAGLINE = 'Find Healthcare Jobs Across Canada';
export const SITE_DESCRIPTION =
  'HealthBridge connects healthcare workers with employers across Canada. Browse nursing, PSW, caregiver, and healthcare assistant jobs.';
export const SITE_URL = 'https://healthbridge.ca';

/* ============================================
   Navigation
   ============================================ */

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'For Workers', href: '/workers' },
  { label: 'For Employers', href: '/employers' },
  { label: 'Locations', href: '/locations' },
  { label: 'About', href: '/about' },
];

export const FOOTER_LINKS = {
  forWorkers: [
    { label: 'Browse Jobs', href: '/jobs' },
    { label: 'Worker Resources', href: '/workers' },
    { label: 'Create Profile', href: '/workers/profile' },
    { label: 'Career Tips', href: '/blog' },
  ],
  forEmployers: [
    { label: 'Post a Job', href: '/jobs/new' },
    { label: 'Find Workers', href: '/workers' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Employer Resources', href: '/employers' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/about' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
} as const;

/* ============================================
   Job Categories
   ============================================ */

export interface JobCategoryInfo {
  slug: JobCategory;
  label: string;
  shortLabel: string;
  description: string;
}

export const JOB_CATEGORIES: JobCategoryInfo[] = [
  {
    slug: 'rn',
    label: 'Registered Nurse',
    shortLabel: 'RN',
    description: 'Registered Nurse positions in hospitals, clinics, and community care.',
  },
  {
    slug: 'lpn',
    label: 'Licensed Practical Nurse',
    shortLabel: 'LPN',
    description: 'Licensed Practical Nurse roles in long-term care and clinical settings.',
  },
  {
    slug: 'rpn',
    label: 'Registered Practical Nurse',
    shortLabel: 'RPN',
    description: 'Registered Practical Nurse positions across healthcare facilities.',
  },
  {
    slug: 'psw',
    label: 'Personal Support Worker',
    shortLabel: 'PSW',
    description: 'Personal Support Worker jobs in home care and residential facilities.',
  },
  {
    slug: 'caregiver',
    label: 'Caregiver',
    shortLabel: 'Caregiver',
    description: 'Caregiver positions for seniors, individuals with disabilities, and families.',
  },
  {
    slug: 'home-support',
    label: 'Home Support Worker',
    shortLabel: 'Home Support',
    description: 'Home Support Worker roles providing in-home assistance and care.',
  },
  {
    slug: 'healthcare-assistant',
    label: 'Healthcare Assistant',
    shortLabel: 'HCA',
    description: 'Healthcare Assistant positions in hospitals and care facilities.',
  },
];

/* ============================================
   Category Accent Colors (homepage bento cards,
   JobCard icon chips — one pastel token per category)
   ============================================ */

export type CategoryAccent = 'yellow' | 'green' | 'pink' | 'blue';

export const CATEGORY_ACCENT: Record<JobCategory, CategoryAccent> = {
  rn: 'blue',
  lpn: 'green',
  rpn: 'pink',
  psw: 'yellow',
  caregiver: 'green',
  'home-support': 'blue',
  'healthcare-assistant': 'pink',
};

/* ============================================
   Canadian Provinces & Major Cities
   ============================================ */

export interface ProvinceInfo {
  code: string;
  name: string;
  slug: string;
  cities: string[];
}

export const PROVINCES: ProvinceInfo[] = [
  {
    code: 'ON',
    name: 'Ontario',
    slug: 'ontario',
    cities: ['Toronto', 'Ottawa', 'Mississauga', 'Hamilton', 'London', 'Brampton'],
  },
  {
    code: 'BC',
    name: 'British Columbia',
    slug: 'british-columbia',
    cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby', 'Kelowna'],
  },
  {
    code: 'AB',
    name: 'Alberta',
    slug: 'alberta',
    cities: ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
  },
  {
    code: 'QC',
    name: 'Quebec',
    slug: 'quebec',
    cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
  },
  {
    code: 'MB',
    name: 'Manitoba',
    slug: 'manitoba',
    cities: ['Winnipeg', 'Brandon'],
  },
  {
    code: 'SK',
    name: 'Saskatchewan',
    slug: 'saskatchewan',
    cities: ['Saskatoon', 'Regina'],
  },
  {
    code: 'NS',
    name: 'Nova Scotia',
    slug: 'nova-scotia',
    cities: ['Halifax', 'Dartmouth'],
  },
  {
    code: 'NB',
    name: 'New Brunswick',
    slug: 'new-brunswick',
    cities: ['Moncton', 'Saint John', 'Fredericton'],
  },
  {
    code: 'NL',
    name: 'Newfoundland and Labrador',
    slug: 'newfoundland-and-labrador',
    cities: ["St. John's"],
  },
  {
    code: 'PE',
    name: 'Prince Edward Island',
    slug: 'prince-edward-island',
    cities: ['Charlottetown'],
  },
];

/* ============================================
   Job Type / Shift / Salary Labels
   ============================================ */

export const JOB_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  contract: 'Contract',
  casual: 'Casual',
};

export const SHIFT_TYPE_LABELS: Record<string, string> = {
  day: 'Day Shift',
  night: 'Night Shift',
  rotating: 'Rotating',
  flexible: 'Flexible',
};

export const SALARY_PERIOD_LABELS: Record<string, string> = {
  hourly: 'hr',
  annually: 'yr',
};

/* ============================================
   Popular Locations (for homepage)
   ============================================ */

export const POPULAR_LOCATIONS = [
  { city: 'Toronto', province: 'Ontario', slug: '/locations/ontario/toronto' },
  { city: 'Vancouver', province: 'British Columbia', slug: '/locations/british-columbia/vancouver' },
  { city: 'Calgary', province: 'Alberta', slug: '/locations/alberta/calgary' },
  { city: 'Ottawa', province: 'Ontario', slug: '/locations/ontario/ottawa' },
  { city: 'Montreal', province: 'Quebec', slug: '/locations/quebec/montreal' },
  { city: 'Edmonton', province: 'Alberta', slug: '/locations/alberta/edmonton' },
  { city: 'Winnipeg', province: 'Manitoba', slug: '/locations/manitoba/winnipeg' },
  { city: 'Halifax', province: 'Nova Scotia', slug: '/locations/nova-scotia/halifax' },
];
