import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalHeading, LegalList } from '@/components/legal/LegalPage';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${SITE_NAME} collects, uses, and protects the personal information of healthcare workers and employers in Canada.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="September 2, 2026"
      intro={`${SITE_NAME} is committed to protecting your privacy. This policy explains what personal information we collect, why we collect it, and how we handle it. We follow the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial privacy legislation.`}
    >
      <LegalHeading>Information We Collect</LegalHeading>
      <p>We collect information you provide directly and information generated as you use the platform:</p>
      <LegalList
        items={[
          'Account details — name, email address, phone number, and password.',
          'Professional details — designation (RN, LPN, RPN, PSW, caregiver, home support, healthcare assistant), licence or registration number, certifications, work history, and résumé.',
          'Job preferences — desired locations, shift types, employment type, and salary expectations.',
          'Employer details — organization name, facility type, billing contact, and job postings.',
          'Usage data — pages viewed, searches run, and jobs saved or applied to.',
        ]}
      />

      <LegalHeading>How We Use Your Information</LegalHeading>
      <LegalList
        items={[
          'Matching healthcare workers with relevant job postings.',
          'Sharing your profile and application with employers you apply to.',
          'Verifying professional credentials with the relevant regulatory college where you authorize it.',
          'Sending job alerts, application updates, and service notices.',
          'Improving search relevance, platform reliability, and customer support.',
        ]}
      />

      <LegalHeading>When We Share Information</LegalHeading>
      <p>
        We share your profile with an employer only when you apply to their posting or explicitly
        make your profile visible to employers. We also use service providers for hosting, email
        delivery, and analytics, who may process data on our behalf under contract. We do not sell
        your personal information.
      </p>

      <LegalHeading>Health and Sensitive Information</LegalHeading>
      <p>
        {SITE_NAME} is a recruitment platform, not a healthcare provider. We do not request patient
        information, and you should never include patient details in a profile, message, or
        application. Do not upload personal health information about yourself unless it is required
        for a specific accommodation request.
      </p>

      <LegalHeading>Retention</LegalHeading>
      <p>
        We keep your account information while your account is active. Application records are
        retained for up to 24 months so employers can meet their own record-keeping obligations.
        You can request deletion of your account at any time, and we will remove your data except
        where retention is required by law.
      </p>

      <LegalHeading>Your Rights</LegalHeading>
      <LegalList
        items={[
          'Access the personal information we hold about you.',
          'Correct information that is inaccurate or incomplete.',
          'Withdraw consent for marketing communications at any time.',
          'Request deletion of your account and associated data.',
          'File a complaint with the Office of the Privacy Commissioner of Canada.',
        ]}
      />

      <LegalHeading>Security</LegalHeading>
      <p>
        We use encryption in transit, access controls, and regular security reviews to protect your
        information. No system is completely secure, so please use a strong, unique password and
        notify us immediately if you suspect unauthorized access to your account.
      </p>

      <LegalHeading>Contact</LegalHeading>
      <p>
        Questions about this policy or a privacy request? Reach our privacy team at{' '}
        <span className="text-[var(--color-primary)]">privacy@healthbridge.ca</span> or through our{' '}
        <Link href="/contact" className="text-[var(--color-primary)]">contact page</Link>.
      </p>
    </LegalPage>
  );
}
