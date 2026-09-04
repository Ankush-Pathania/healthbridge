import type { Job } from '@/types/job';

/**
 * Realistic placeholder job data for frontend development.
 * Distributed across Canadian cities, all 7 worker categories,
 * and realistic employer names.
 *
 * In production, this will be replaced by API/database queries.
 */

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const PLACEHOLDER_JOBS: Job[] = [
  {
    id: '1',
    slug: 'registered-nurse-icu-toronto',
    title: 'Registered Nurse — ICU',
    category: 'rn',
    employer: { name: 'Sunnybrook Health Sciences Centre', verified: true },
    location: { city: 'Toronto', province: 'Ontario', provinceCode: 'ON', remote: false },
    type: 'full-time',
    shift: 'rotating',
    salary: { min: 39, max: 56, period: 'hourly' },
    description:
      'Seeking an experienced ICU Registered Nurse to join our critical care team. You will provide advanced nursing care to critically ill patients in a fast-paced, collaborative environment.',
    requirements: [
      'Current CNO registration as a Registered Nurse',
      'BScN or equivalent nursing degree',
      'Minimum 2 years ICU experience',
      'ACLS and BLS certification',
      'Strong critical thinking and assessment skills',
    ],
    benefits: [
      'Comprehensive health and dental benefits',
      'Pension plan (HOOPP)',
      'Tuition reimbursement',
      'Paid professional development days',
    ],
    postedAt: daysAgo(1),
    urgent: false,
    featured: true,
  },
  {
    id: '2',
    slug: 'lpn-long-term-care-vancouver',
    title: 'Licensed Practical Nurse — Long-Term Care',
    category: 'lpn',
    employer: { name: 'Vancouver Coastal Health', verified: true },
    location: { city: 'Vancouver', province: 'British Columbia', provinceCode: 'BC', remote: false },
    type: 'full-time',
    shift: 'day',
    salary: { min: 32, max: 42, period: 'hourly' },
    description:
      'Join our long-term care facility as a Licensed Practical Nurse providing compassionate, resident-centred care to elderly residents.',
    requirements: [
      'Current BCCNM registration as an LPN',
      'Graduation from a recognized practical nursing program',
      'Experience in long-term care preferred',
      'Strong communication skills',
    ],
    benefits: [
      'Extended health and dental coverage',
      'Municipal Pension Plan',
      'Employee wellness programs',
      'Shift differentials for evenings and weekends',
    ],
    postedAt: daysAgo(2),
    urgent: false,
    featured: true,
  },
  {
    id: '3',
    slug: 'psw-home-care-mississauga',
    title: 'Personal Support Worker — Home Care',
    category: 'psw',
    employer: { name: 'SE Health', verified: true },
    location: { city: 'Mississauga', province: 'Ontario', provinceCode: 'ON', remote: false },
    type: 'full-time',
    shift: 'flexible',
    salary: { min: 22, max: 28, period: 'hourly' },
    description:
      'Provide personal care and support services to clients in their homes. Assist with daily living activities, medication reminders, and companionship.',
    requirements: [
      'PSW Certificate from a recognized Ontario program',
      'Valid driver\u0027s license and reliable vehicle',
      'Current First Aid and CPR certification',
      'Clear Vulnerable Sector Check',
    ],
    benefits: [
      'Flexible scheduling options',
      'Mileage reimbursement',
      'Health and dental benefits',
      'Ongoing training and education',
    ],
    postedAt: daysAgo(3),
    urgent: true,
    featured: true,
  },
  {
    id: '4',
    slug: 'registered-nurse-emergency-calgary',
    title: 'Registered Nurse — Emergency Department',
    category: 'rn',
    employer: { name: 'Alberta Health Services', verified: true },
    location: { city: 'Calgary', province: 'Alberta', provinceCode: 'AB', remote: false },
    type: 'full-time',
    shift: 'rotating',
    salary: { min: 40, max: 58, period: 'hourly' },
    description:
      'Join the Emergency Department at Foothills Medical Centre. Provide rapid assessment, triage, and emergency nursing care to patients of all ages.',
    requirements: [
      'Active registration with CRNA',
      'BScN or equivalent',
      'Minimum 1 year emergency nursing experience',
      'TNCC and ENPC certification preferred',
    ],
    benefits: [
      'Competitive salary with northern living allowance options',
      'LAPP pension plan',
      'Relocation assistance available',
      'Comprehensive benefits package',
    ],
    postedAt: daysAgo(1),
    urgent: true,
    featured: true,
  },
  {
    id: '5',
    slug: 'caregiver-senior-care-ottawa',
    title: 'Caregiver — Senior Care',
    category: 'caregiver',
    employer: { name: 'Bayshore HealthCare', verified: true },
    location: { city: 'Ottawa', province: 'Ontario', provinceCode: 'ON', remote: false },
    type: 'part-time',
    shift: 'day',
    salary: { min: 20, max: 25, period: 'hourly' },
    description:
      'Provide compassionate in-home care for seniors. Assist with personal hygiene, meal preparation, light housekeeping, and companionship.',
    requirements: [
      'PSW or caregiver certificate an asset',
      'Experience caring for elderly individuals',
      'Empathetic and patient demeanour',
      'Ability to work independently',
    ],
    benefits: [
      'Flexible hours',
      'Paid orientation and training',
      'Employee Assistance Program',
      'Opportunities for full-time placement',
    ],
    postedAt: daysAgo(5),
    urgent: false,
    featured: true,
  },
  {
    id: '6',
    slug: 'rpn-mental-health-hamilton',
    title: 'Registered Practical Nurse — Mental Health',
    category: 'rpn',
    employer: { name: "St. Joseph's Healthcare Hamilton", verified: true },
    location: { city: 'Hamilton', province: 'Ontario', provinceCode: 'ON', remote: false },
    type: 'full-time',
    shift: 'rotating',
    salary: { min: 33, max: 43, period: 'hourly' },
    description:
      'Provide nursing care in our inpatient mental health unit. Work collaboratively within an interprofessional team to support patient recovery.',
    requirements: [
      'Current CNO registration as an RPN',
      'Mental health nursing experience preferred',
      'De-escalation and crisis intervention training',
      'Strong therapeutic communication skills',
    ],
    benefits: [
      'HOOPP pension plan',
      'Comprehensive benefits from day one',
      'Mental health and wellness supports',
      'Professional development funding',
    ],
    postedAt: daysAgo(4),
    urgent: false,
    featured: true,
  },
  {
    id: '7',
    slug: 'home-support-worker-victoria',
    title: 'Home Support Worker',
    category: 'home-support',
    employer: { name: 'Island Health', verified: true },
    location: { city: 'Victoria', province: 'British Columbia', provinceCode: 'BC', remote: false },
    type: 'part-time',
    shift: 'flexible',
    salary: { min: 24, max: 29, period: 'hourly' },
    description:
      'Provide in-home support services including personal care, meal preparation, and assistance with daily activities for clients in the Victoria area.',
    requirements: [
      'Health Care Assistant certificate or equivalent',
      'Registration with the BC Care Aide & Community Health Worker Registry',
      'Valid BC driver\u0027s license',
      'Food Safe certification an asset',
    ],
    benefits: [
      'Extended health and dental benefits',
      'Municipal Pension Plan',
      'Paid sick leave',
      'Ongoing education opportunities',
    ],
    postedAt: daysAgo(6),
    urgent: false,
    featured: false,
  },
  {
    id: '8',
    slug: 'healthcare-assistant-edmonton',
    title: 'Healthcare Assistant — Acute Care',
    category: 'healthcare-assistant',
    employer: { name: 'Alberta Health Services', verified: true },
    location: { city: 'Edmonton', province: 'Alberta', provinceCode: 'AB', remote: false },
    type: 'full-time',
    shift: 'day',
    salary: { min: 21, max: 27, period: 'hourly' },
    description:
      'Support nursing staff in delivering patient care on our medical-surgical unit. Assist with vital signs, patient mobility, and activities of daily living.',
    requirements: [
      'Health Care Aide certificate',
      'Current BLS certification',
      'Experience in acute care setting preferred',
      'Physical ability to assist with patient transfers',
    ],
    benefits: [
      'LAPP pension plan',
      'Health and dental benefits',
      'Paid training programs',
      'Career advancement opportunities',
    ],
    postedAt: daysAgo(2),
    urgent: false,
    featured: false,
  },
  {
    id: '9',
    slug: 'registered-nurse-community-health-winnipeg',
    title: 'Registered Nurse — Community Health',
    category: 'rn',
    employer: { name: 'Winnipeg Regional Health Authority', verified: true },
    location: { city: 'Winnipeg', province: 'Manitoba', provinceCode: 'MB', remote: false },
    type: 'full-time',
    shift: 'day',
    salary: { min: 38, max: 52, period: 'hourly' },
    description:
      'Deliver community-based nursing services including health assessments, chronic disease management, and health promotion in diverse neighbourhoods.',
    requirements: [
      'Current CRNM registration',
      'BN or BScN degree',
      'Community health nursing experience an asset',
      'Valid Manitoba driver\u0027s license',
    ],
    benefits: [
      'Civil Service Superannuation Board pension',
      'Comprehensive group benefits',
      'Professional development support',
      'Monday to Friday schedule',
    ],
    postedAt: daysAgo(7),
    urgent: false,
    featured: false,
  },
  {
    id: '10',
    slug: 'psw-retirement-residence-brampton',
    title: 'Personal Support Worker — Retirement Residence',
    category: 'psw',
    employer: { name: 'Chartwell Retirement Residences', verified: true },
    location: { city: 'Brampton', province: 'Ontario', provinceCode: 'ON', remote: false },
    type: 'part-time',
    shift: 'night',
    salary: { min: 21, max: 26, period: 'hourly' },
    description:
      'Provide personal care and support to residents in a warm, home-like retirement setting. Night shift premium included.',
    requirements: [
      'PSW Certificate from an approved Ontario college',
      'Experience in retirement or long-term care',
      'Ability to work overnight shifts',
      'Current First Aid and CPR',
    ],
    benefits: [
      'Night shift premium',
      'Employee meal program',
      'Health and dental benefits (qualifying hours)',
      'Staff recognition programs',
    ],
    postedAt: daysAgo(3),
    urgent: true,
    featured: false,
  },
  {
    id: '11',
    slug: 'lpn-clinic-surrey',
    title: 'Licensed Practical Nurse — Walk-In Clinic',
    category: 'lpn',
    employer: { name: 'Medicentres Canada', verified: true },
    location: { city: 'Surrey', province: 'British Columbia', provinceCode: 'BC', remote: false },
    type: 'contract',
    shift: 'day',
    salary: { min: 30, max: 38, period: 'hourly' },
    description:
      'Work in a busy walk-in clinic providing nursing assessments, wound care, immunizations, and patient education. 6-month contract with potential for extension.',
    requirements: [
      'BCCNM registration as an LPN',
      'Clinic or primary care experience preferred',
      'Immunization certification',
      'Strong organizational skills',
    ],
    benefits: [
      'Competitive hourly rate',
      'No weekends or evenings',
      'Modern clinic facilities',
      'Potential for permanent placement',
    ],
    postedAt: daysAgo(4),
    closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    urgent: false,
    featured: false,
  },
  {
    id: '12',
    slug: 'caregiver-live-in-montreal',
    title: 'Caregiver — Live-In Care',
    category: 'caregiver',
    employer: { name: 'CareGuard Home Health', verified: false },
    location: { city: 'Montreal', province: 'Quebec', provinceCode: 'QC', remote: false },
    type: 'full-time',
    shift: 'flexible',
    salary: { min: 19, max: 24, period: 'hourly' },
    description:
      'Provide live-in care for an elderly client in their Montreal home. Duties include personal care assistance, meal preparation, medication reminders, and companionship.',
    requirements: [
      'Caregiver training or equivalent experience',
      'Bilingual (French/English) strongly preferred',
      'Valid work authorization in Canada',
      'References from previous care positions',
    ],
    benefits: [
      'Room and board provided',
      'Paid time off',
      'Supportive supervision',
      'Annual salary review',
    ],
    postedAt: daysAgo(8),
    urgent: false,
    featured: false,
  },
  {
    id: '13',
    slug: 'rn-pediatrics-halifax',
    title: 'Registered Nurse — Pediatrics',
    category: 'rn',
    employer: { name: 'IWK Health Centre', verified: true },
    location: { city: 'Halifax', province: 'Nova Scotia', provinceCode: 'NS', remote: false },
    type: 'full-time',
    shift: 'rotating',
    salary: { min: 37, max: 51, period: 'hourly' },
    description:
      'Join our pediatric nursing team providing family-centred care to children and youth. Opportunities in both inpatient and ambulatory care settings.',
    requirements: [
      'Current NSCN registration as an RN',
      'BScN required',
      'Pediatric nursing experience preferred',
      'PALS certification an asset',
    ],
    benefits: [
      'Nova Scotia Health Employees Pension Plan',
      'Comprehensive health benefits',
      'Relocation support for out-of-province candidates',
      'On-site childcare centre',
    ],
    postedAt: daysAgo(5),
    urgent: false,
    featured: false,
  },
  {
    id: '14',
    slug: 'healthcare-assistant-kelowna',
    title: 'Healthcare Assistant — Residential Care',
    category: 'healthcare-assistant',
    employer: { name: 'Interior Health', verified: true },
    location: { city: 'Kelowna', province: 'British Columbia', provinceCode: 'BC', remote: false },
    type: 'casual',
    shift: 'flexible',
    salary: { min: 23, max: 28, period: 'hourly' },
    description:
      'Casual Healthcare Assistant positions available across residential care facilities in the Kelowna area. Flexible scheduling to suit your availability.',
    requirements: [
      'HCA certificate from a recognized BC program',
      'BC Care Aide Registry registration',
      'Ability to work various shifts including weekends',
      'Compassionate and reliable',
    ],
    benefits: [
      'Flexible casual scheduling',
      'Shift premiums',
      'Path to regular employment',
      'Beautiful Okanagan location',
    ],
    postedAt: daysAgo(6),
    urgent: false,
    featured: false,
  },
];

/**
 * Get featured jobs (for homepage).
 */
export function getFeaturedJobs(count = 6): Job[] {
  return PLACEHOLDER_JOBS.filter((job) => job.featured).slice(0, count);
}

/**
 * Get a job by its slug.
 */
export function getJobBySlug(slug: string): Job | undefined {
  return PLACEHOLDER_JOBS.find((job) => job.slug === slug);
}

/**
 * Get all job slugs (for static generation).
 */
export function getAllJobSlugs(): string[] {
  return PLACEHOLDER_JOBS.map((job) => job.slug);
}
