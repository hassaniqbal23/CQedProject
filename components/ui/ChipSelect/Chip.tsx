// Chip.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps<T> {
  value: T;
  onClick?: (value: T) => void;
  active?: boolean;
  icon?: React.ReactNode; // Accept SVG icon as prop
  children: React.ReactNode;
  rounded?: boolean;
  variant?:
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'secondary-outlined'
  | 'link';
  className?: string;
}

function Chip<T>({
  value,
  onClick,
  active,
  children,
  rounded,
  variant,
  className,
}: ChipProps<T>) {
  return (
    <div
      onClick={() => onClick && onClick(value)}
      className={cn(
        `flex items-center justify-center text-nowrap rounded gap-2 py-2 px-[32px] font-normal text-md text-center cursor-pointer border border-solid border-Stroke ${active && 'text-primary border border-solid border-primary font-medium'}`,
        rounded ? 'rounded-full' : '',
        variant === `secondary`
          ? `${active && 'text-secondary border border-solid border-secondary font-medium'}`
          : '',
        variant === 'link'
          ? `bg-transparent ${active && 'bg-primary-50'} border-none text-sm`
          : '',
        (className = 'whitespace-nowrap')
      )}
    >
      {children}
    </div>
  );
}

export default Chip;
