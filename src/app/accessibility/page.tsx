import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage, { LegalHeading, LegalList } from '@/components/legal/LegalPage';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: `How ${SITE_NAME} works to keep healthcare job search accessible, including our WCAG 2.1 AA and AODA commitments.`,
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      lastUpdated="September 2, 2026"
      intro={`${SITE_NAME} is committed to making healthcare job search accessible to everyone, including people who use assistive technology. We aim to meet WCAG 2.1 Level AA and the requirements of the Accessibility for Ontarians with Disabilities Act (AODA).`}
    >
      <LegalHeading>What We Do</LegalHeading>
      <LegalList
        items={[
          'Semantic HTML with proper heading structure and landmark regions on every page.',
          'Full keyboard navigation, with a visible focus indicator on all interactive elements.',
          'Form fields with associated labels, and errors announced to screen readers.',
          'Text and interface colours that meet the 4.5:1 contrast ratio for body text.',
          'Layouts that reflow without horizontal scrolling down to a 320px viewport width.',
          'Text that remains readable and functional when zoomed to 200%.',
        ]}
      />

      <LegalHeading>Assistive Technology</LegalHeading>
      <p>
        We test with current versions of NVDA, JAWS, and VoiceOver, and with keyboard-only
        navigation in Chrome, Firefox, Safari, and Edge. If you use a tool we have not covered and
        run into a barrier, we would like to hear about it.
      </p>

      <LegalHeading>Known Limitations</LegalHeading>
      <p>
        Some job descriptions are supplied by employers and may contain formatting we do not
        control, such as tables or PDF attachments that are not fully tagged. We work with employers
        to correct these when they are reported, and we are progressively improving how uploaded
        content is rendered.
      </p>

      <LegalHeading>Accommodation Requests</LegalHeading>
      <p>
        If you need this site&apos;s content in an alternate format, or need support completing an
        application, contact us and we will provide it in a reasonable timeframe at no cost. If you
        require an accommodation during an employer&apos;s hiring process, tell the employer
        directly — they are responsible for accommodating candidates under applicable human rights
        legislation.
      </p>

      <LegalHeading>Feedback</LegalHeading>
      <p>
        Tell us about an accessibility barrier at{' '}
        <span className="text-[var(--color-primary)]">accessibility@healthbridge.ca</span> or through
        our <Link href="/contact" className="text-[var(--color-primary)]">contact page</Link>. Please
        include the page address and a description of the problem. We acknowledge reports within two
        business days.
      </p>
    </LegalPage>
  );
}
