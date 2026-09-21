import { cn } from '@/lib/utils';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-dark)] border-transparent',
  secondary:
    'bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]',
  ghost:
    'bg-transparent text-[var(--color-text)] border-transparent hover:bg-[var(--color-bg-muted)]',
  accent:
    'bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent-dark)] border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-full border',
    'transition-colors duration-[var(--transition-fast)]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
    'disabled:opacity-50 disabled:pointer-events-none',
    'cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ('href' in props && props.href) {
    const { href, target, rel, ...rest } = props;
    if (target === '_blank' || href.startsWith('http')) {
      return (
        <a href={href} target={target} rel={rel || 'noopener noreferrer'} className={baseStyles} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={baseStyles} {...rest}>
        {children}
      </Link>
    );
  }

  const { ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={baseStyles} {...buttonProps}>
      {children}
    </button>
  );
}
