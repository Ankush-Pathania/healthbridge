/**
 * HealthBridge brand mark: a rounded square containing a heartbeat line
 * that resolves into a cross — "bridge" between care and career.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="var(--color-primary)" />
      <path
        d="M5.5 17h3.6l1.8-4.5 2.4 9 2.3-6.5 1.6 2h4.3"
        fill="none"
        stroke="var(--color-text-inverse)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
