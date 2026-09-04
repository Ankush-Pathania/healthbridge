import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide';
  className?: string;
  as?: 'div' | 'section' | 'main' | 'article';
}

const sizeMap = {
  default: 'max-w-[1200px]',
  narrow: 'max-w-[800px]',
  wide: 'max-w-[1400px]',
} as const;

export default function Container({
  children,
  size = 'default',
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)}>
      {children}
    </Tag>
  );
}
