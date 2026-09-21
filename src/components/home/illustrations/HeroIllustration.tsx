/**
 * Flat-style illustration of a healthcare worker for the homepage hero.
 * Hand-authored geometric shapes (no external image asset) to match the
 * premium/clean palette — kept simple (circles, rounded rects) rather than
 * detailed linework, in the spirit of Undraw/Blush-style flat art.
 */
export default function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 480" className={className} aria-hidden="true">
      {/* Backdrop blob */}
      <circle cx="240" cy="250" r="190" fill="var(--color-pastel-blue)" opacity="0.9" />

      {/* Floating badges */}
      <circle cx="390" cy="110" r="36" fill="var(--color-accent)" />
      <path
        d="M390 94v32M374 110h32"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="95" cy="345" r="32" fill="var(--color-pastel-yellow)" />
      <path
        d="M82 346l9 9 18-20"
        fill="none"
        stroke="var(--color-pastel-yellow-fg)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="400" cy="330" r="22" fill="var(--color-pastel-green)" />
      <path
        d="M400 322c-4-5-11-2-11 3.5 0 4 4 7.5 11 11.5 7-4 11-7.5 11-11.5 0-5.5-7-8.5-11-3.5Z"
        fill="var(--color-pastel-green-fg)"
      />

      {/* Legs */}
      <rect x="205" y="360" width="30" height="80" rx="14" fill="var(--color-navy)" />
      <rect x="245" y="360" width="30" height="80" rx="14" fill="var(--color-navy)" />

      {/* Body (scrubs) */}
      <path
        d="M175 265c0-38 29-65 65-65s65 27 65 65v110c0 10-8 18-18 18H193c-10 0-18-8-18-18Z"
        fill="white"
        stroke="var(--color-border)"
        strokeWidth="2"
      />
      {/* Chest pocket badge */}
      <rect x="222" y="300" width="36" height="26" rx="5" fill="var(--color-pastel-pink)" />
      <path d="M240 306v14M233 313h14" stroke="var(--color-pastel-pink-fg)" strokeWidth="3" strokeLinecap="round" />

      {/* Arms */}
      <rect x="150" y="270" width="28" height="90" rx="14" fill="white" stroke="var(--color-border)" strokeWidth="2" />
      <rect x="302" y="270" width="28" height="90" rx="14" fill="white" stroke="var(--color-border)" strokeWidth="2" />
      {/* Hands */}
      <circle cx="164" cy="366" r="15" fill="var(--color-pastel-blue-fg)" opacity="0.15" />
      <circle cx="316" cy="366" r="15" fill="var(--color-pastel-blue-fg)" opacity="0.15" />

      {/* Clipboard held in front */}
      <rect x="200" y="335" width="80" height="56" rx="6" fill="var(--color-bg-subtle)" stroke="var(--color-border-strong)" strokeWidth="2" />
      <rect x="212" y="349" width="56" height="6" rx="3" fill="var(--color-border-strong)" />
      <rect x="212" y="362" width="40" height="6" rx="3" fill="var(--color-border-strong)" />

      {/* Stethoscope */}
      <path
        d="M205 210v20c0 16 12 28 28 28h14c16 0 28-12 28-28v-20"
        fill="none"
        stroke="var(--color-navy)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="247" cy="262" r="9" fill="var(--color-navy)" />

      {/* Neck + head */}
      <rect x="222" y="150" width="36" height="30" rx="10" fill="#F3C9A0" />
      <circle cx="240" cy="130" r="52" fill="#F3C9A0" />

      {/* Nurse cap */}
      <rect x="203" y="86" width="74" height="30" rx="14" fill="white" stroke="var(--color-border-strong)" strokeWidth="2" />
      <path d="M240 92v18M231 101h18" stroke="var(--color-accent)" strokeWidth="4" strokeLinecap="round" />

      {/* Simple face */}
      <circle cx="222" cy="132" r="4" fill="var(--color-navy)" />
      <circle cx="258" cy="132" r="4" fill="var(--color-navy)" />
      <path d="M226 148q14 10 28 0" fill="none" stroke="var(--color-navy)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
