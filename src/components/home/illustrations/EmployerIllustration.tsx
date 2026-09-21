/** Flat illustration: a clipboard + search, for the employer CTA card. */
export default function EmployerIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <circle cx="120" cy="120" r="100" fill="white" opacity="0.5" />

      {/* Clipboard */}
      <rect x="70" y="55" width="90" height="120" rx="10" fill="white" stroke="var(--color-border-strong)" strokeWidth="2" />
      <rect x="95" y="46" width="40" height="18" rx="6" fill="var(--color-navy)" />
      <rect x="86" y="86" width="58" height="7" rx="3.5" fill="var(--color-border-strong)" />
      <rect x="86" y="104" width="58" height="7" rx="3.5" fill="var(--color-border-strong)" />
      <rect x="86" y="122" width="34" height="7" rx="3.5" fill="var(--color-border-strong)" />

      {/* Magnifier */}
      <circle cx="152" cy="150" r="30" fill="var(--color-accent)" />
      <circle cx="145" cy="143" r="14" fill="none" stroke="white" strokeWidth="6" />
      <path d="M155 153l14 14" stroke="white" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
