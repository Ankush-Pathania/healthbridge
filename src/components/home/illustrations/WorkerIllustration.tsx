/** Flat illustration: a healthcare worker badge, for the worker CTA card. */
export default function WorkerIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <circle cx="120" cy="120" r="100" fill="white" opacity="0.5" />

      {/* Person */}
      <circle cx="120" cy="95" r="34" fill="#F3C9A0" />
      <path
        d="M70 200c0-32 22-58 50-58s50 26 50 58v6H70Z"
        fill="var(--color-navy)"
      />
      <rect x="104" y="126" width="32" height="20" rx="8" fill="#F3C9A0" />

      {/* Check badge */}
      <circle cx="176" cy="164" r="30" fill="var(--color-accent)" />
      <path
        d="M163 165l9 9 18-20"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
