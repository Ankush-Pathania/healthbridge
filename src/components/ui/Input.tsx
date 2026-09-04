import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  id,
  className,
  ...props
}: InputProps) {
  const inputId = id || props.name;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-text)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-[var(--radius-md)] border border-[var(--color-border)]',
            'bg-white px-3 py-2.5 text-base text-[var(--color-text)]',
            'placeholder:text-[var(--color-text-tertiary)]',
            'transition-colors duration-[var(--transition-fast)]',
            'hover:border-[var(--color-border-strong)]',
            'focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]',
            icon ? 'pl-10' : undefined,
            error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]',
            className
          )}
          aria-describedby={errorId}
          aria-invalid={error ? true : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={errorId} className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
