import type { JobCategory } from '@/types/job';
import { ICON_BASE_PROPS, type IconProps } from './Icon';

function StethoscopeIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <path d="M5 4v6a4 4 0 0 0 8 0V4" />
      <path d="M9 14v2a5 5 0 0 0 10 0v-2.5" />
      <circle cx="19" cy="9.5" r="2" />
      <circle cx="5" cy="4" r="1.4" />
      <circle cx="13" cy="4" r="1.4" />
    </svg>
  );
}

function HeartPulseIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <path d="M3 12h3.5l1.8-3.4L11 16l2.2-7 1.6 3h5.2" />
      <path d="M12 20.5c-3.6-2.4-8-5.6-8-9.8A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8 3.5c0 4.2-4.4 7.4-8 9.8Z" />
    </svg>
  );
}

function ClipboardCheckIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <rect x="5.5" y="4.5" width="13" height="17" rx="2" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 13.5l2.2 2.2L15.5 11" />
    </svg>
  );
}

function HandHeartIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <path d="M3 13.5h3.2l2.6-1.4 5 1.1a1.3 1.3 0 0 1-.4 2.5l-4-.3" />
      <path d="M8.8 12.6l6-1.6a1.5 1.5 0 0 1 1 2.8L10 16.3l-4.2-1.2" />
      <path d="M3 13v6.5h3V13" />
      <path d="M15.5 6.8c-2.2-2-5-.2-4.2 2.3.5 1.5 2.5 3 4.2 3.9 1.7-.9 3.7-2.4 4.2-3.9.8-2.5-2-4.3-4.2-2.3Z" />
    </svg>
  );
}

function UsersIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20" />
      <path d="M15.5 5.3a3 3 0 0 1 0 5.8" />
      <path d="M17.5 14.2a4.2 4.2 0 0 1 3 4V20" />
    </svg>
  );
}

function HomeHeartIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9.5a1 1 0 0 0 1 1h3v-5.2h4v5.2h3a1 1 0 0 0 1-1V10" />
      <path d="M12 14.2c-1.7-1.5-3.7-.1-3.1 1.7.4 1.1 1.9 2.2 3.1 2.9 1.2-.7 2.7-1.8 3.1-2.9.6-1.8-1.4-3.2-3.1-1.7Z" />
    </svg>
  );
}

function FirstAidIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...ICON_BASE_PROPS} width={size} height={size} className={className}>
      <rect x="3.5" y="7" width="17" height="13" rx="2.5" />
      <path d="M9 7V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M12 11v5" />
      <path d="M9.5 13.5h5" />
    </svg>
  );
}

const CATEGORY_ICON_MAP: Record<JobCategory, (props: IconProps) => React.ReactElement> = {
  rn: StethoscopeIcon,
  lpn: HeartPulseIcon,
  rpn: ClipboardCheckIcon,
  psw: HandHeartIcon,
  caregiver: UsersIcon,
  'home-support': HomeHeartIcon,
  'healthcare-assistant': FirstAidIcon,
};

/** Renders the icon associated with a job category. */
export default function CategoryIcon({
  category,
  className,
  size,
}: IconProps & { category: JobCategory }) {
  const IconComponent = CATEGORY_ICON_MAP[category] || FirstAidIcon;
  return <IconComponent className={className} size={size} />;
}
