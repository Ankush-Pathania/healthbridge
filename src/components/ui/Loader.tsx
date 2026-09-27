import { cn } from '@/lib/utils';

export type LoaderSize = 'sm' | 'md' | 'lg' | 'full';

interface LoaderProps {
  size?: LoaderSize;
  text?: string;
  className?: string;
}

export default function Loader({ size = 'md', text, className }: LoaderProps) {
  if (size === 'full') {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative flex flex-col items-center justify-center p-8 rounded-[var(--radius-2xl)] bg-white border border-[var(--color-border)] shadow-2xl max-w-sm w-full text-center">
          {/* Glowing ring animation */}
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary-light)] animate-ping opacity-25" />
            <div className="w-16 h-16 rounded-full border-4 border-t-[var(--color-primary)] border-r-[var(--color-primary)] border-b-transparent border-l-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </div>
          <h3 className="text-base font-bold text-[var(--color-text)] mb-1">HealthBridge</h3>
          <p className="text-xs text-[var(--color-text-secondary)] font-medium">
            {text || 'Loading Healthcare Portal…'}
          </p>
        </div>
      </div>
    );
  }

  if (size === 'sm') {
    return (
      <span className={cn('inline-flex items-center gap-2', className)}>
        <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin flex-shrink-0" />
        {text && <span>{text}</span>}
      </span>
    );
  }

  const spinnerDimensions = size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
  const iconDimensions = size === 'lg' ? 20 : 16;

  return (
    <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
      <div className={cn('relative flex items-center justify-center mb-3', spinnerDimensions)}>
        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-primary-light)] animate-ping opacity-30" />
        <div className={cn('rounded-full border-3 border-t-[var(--color-primary)] border-r-[var(--color-primary)] border-b-transparent border-l-transparent animate-spin', spinnerDimensions)} />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width={iconDimensions}
            height={iconDimensions}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-pulse"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </div>
      </div>
      {text && (
        <p className="text-xs font-medium text-[var(--color-text-secondary)] animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}
