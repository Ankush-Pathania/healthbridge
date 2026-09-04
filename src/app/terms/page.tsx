import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalHeading, LegalList } from '@/components/legal/LegalPage';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that govern use of ${SITE_NAME} by healthcare workers and employers across Canada.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="September 2, 2026"
      intro={`These terms govern your use of ${SITE_NAME}. By creating an account, posting a job, or applying to a position, you agree to them. If you do not agree, please do not use the platform.`}
    >
      <LegalHeading>What We Do</LegalHeading>
      <p>
        {SITE_NAME} is a job board and recruitment platform connecting healthcare workers with
        employers in Canada. We are not an employer, a staffing agency of record, or a party to any
        employment relationship formed through the platform. Hiring decisions, employment terms, and
        compensation are between the worker and the employer.
      </p>

      <LegalHeading>Eligibility</LegalHeading>
      <LegalList
        items={[
          'You must be at least 18 years old.',
          'You must be legally entitled to work in Canada to apply for postings.',
          'You must hold and maintain any registration, licence, or certification a role requires.',
          'Employers must be a legitimate organization recruiting for genuine, currently open positions.',
        ]}
      />

      <LegalHeading>Worker Responsibilities</LegalHeading>
      <p>
        You are responsible for the accuracy of your profile, resume, and credentials.
        Misrepresenting a licence, registration status, certification, or work history is grounds
        for immediate account termination, and may be reported to the relevant regulatory college.
      </p>

      <LegalHeading>Employer Responsibilities</LegalHeading>
      <LegalList
        items={[
          'Post only real, currently open positions with accurate descriptions, locations, and compensation.',
          'Comply with applicable employment standards, human rights, and pay transparency legislation in your province.',
          'Use candidate information solely to evaluate applicants for the posting they applied to.',
          'Do not post roles that require an unpaid trial shift or charge workers a fee to apply.',
        ]}
      />

      <LegalHeading>Prohibited Use</LegalHeading>
      <LegalList
        items={[
          'Scraping, bulk-downloading, or redistributing job listings or candidate profiles.',
          'Posting discriminatory, misleading, fraudulent, or multi-level-marketing listings.',
          'Contacting workers for anything other than the position they applied to.',
          'Attempting to bypass platform security or access another account.',
        ]}
      />

      <LegalHeading>Content and Licence</LegalHeading>
      <p>
        You retain ownership of the content you submit. By posting it, you grant {SITE_NAME} a
        non-exclusive licence to host, display, and distribute that content for the purpose of
        operating the platform — for example, showing your job posting in search results or sending
        your application to an employer.
      </p>

      <LegalHeading>Availability and Disclaimer</LegalHeading>
      <p>
        The platform is provided on an &quot;as is&quot; basis. We do not guarantee uninterrupted
        availability, that a posting will result in an interview or offer, or that a candidate will
        be suitable for a role. Employers remain responsible for their own credential verification,
        reference checks, and background screening.
      </p>

      <LegalHeading>Limitation of Liability</LegalHeading>
      <p>
        To the extent permitted by law, {SITE_NAME} is not liable for indirect, incidental, or
        consequential damages arising from use of the platform, including lost wages, lost profits,
        or damages arising from an employment relationship formed through it.
      </p>

      <LegalHeading>Termination</LegalHeading>
      <p>
        You may close your account at any time. We may suspend or terminate an account that
        breaches these terms, misrepresents credentials, or poses a risk to other users.
      </p>

      <LegalHeading>Governing Law</LegalHeading>
      <p>
        These terms are governed by the laws of the Province of Ontario and the federal laws of
        Canada that apply in it.
      </p>

      <LegalHeading>Contact</LegalHeading>
      <p>
        Questions about these terms? Reach us at{' '}
        <span className="text-[var(--color-primary)]">legal@healthbridge.ca</span> or through our{' '}
        <Link href="/contact" className="text-[var(--color-primary)]">contact page</Link>.
      </p>
    </LegalPage>
  );
}
