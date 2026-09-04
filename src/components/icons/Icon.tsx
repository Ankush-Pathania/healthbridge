/**
 * Shared props/base for the hand-drawn line icon set used across the site.
 * All icons are 24x24, stroke-based, and inherit color via `currentColor`
 * so they can be recolored with Tailwind text-color utilities.
 */
export interface IconProps {
  className?: string;
  size?: number;
}

export const ICON_BASE_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};
