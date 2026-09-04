import { ICON_BASE_PROPS, type IconProps } from './Icon';

export function SearchIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </svg>
  );
}

export function MapPinIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <path d="M12 21.5S5 15.3 5 10a7 7 0 0 1 14 0c0 5.3-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function BriefcaseIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
      <path d="M10.5 12.5h3v2h-3z" />
    </svg>
  );
}

export function UserCheckIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3.5 20v-1a5.5 5.5 0 0 1 5.5-5.5h2a5.5 5.5 0 0 1 1.7.27" />
      <path d="M16 16.5l2 2 3-3.5" />
    </svg>
  );
}

export function FileSendIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
      <path d="M14 3.5V8h4" />
      <path d="M8.5 14.5h4.5" />
      <path d="M8.5 17.5h6.5" />
    </svg>
  );
}

export function CheckCircleIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 12.3l2.5 2.5 5-5.3" />
    </svg>
  );
}

export function ChevronRightIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
