// Chip.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  value: string;
  onClick?: (value: string) => void;
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
}

const Chip = ({
  value,
  onClick,
  active,
  children,
  rounded,
  variant,
}: ChipProps) => {
  return (
    <div
      onClick={() => onClick && onClick(value)}
      className={cn(
        `flex items-center justify-center rounded gap-2 p-2 font-medium text-lg text-center cursor-pointer border border-solid border-Stroke ${active && 'text-primary border border-solid border-primary font-medium'}`,
        rounded ? 'rounded-full' : '',
        variant === `secondary`
          ? `${active && 'text-secondary border border-solid border-secondary font-medium'}`
          : '',
        variant === 'link'
          ? `bg-transparent ${active && 'bg-primary-50'} border-none text-sm`
          : ''
      )}
    >
      {children}
    </div>
  );
};

export default Chip;
