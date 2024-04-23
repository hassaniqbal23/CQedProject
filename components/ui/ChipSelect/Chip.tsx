// Chip.tsx
import React from 'react';
import {cn} from '@/lib/utils';
import {primary} from './Chip.stories';

interface ChipProps {
	value: string;
	onClick?: (value: string) => void;
	active?: boolean;
	icon?: React.ReactNode; // Accept SVG icon as prop
	children: React.ReactNode;
	rounded?: boolean;
	variant?: 'primary' | 'secondary' | 'outlined' | 'secondary-outlined';
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
				'flex items-center justify-center gap-2 w-[160px] h-12 font-medium text-lg text-center cursor-pointer border border-solid border-Stroke',
				active && 'text-primary border border-solid border-primary font-medium',
				// (className = 'text-primary')
				rounded ? 'rounded-full' : '',
				variant ? 'bg-primary' : 'text-white'
			)}
		>
			{children}
		</div>
	);
};

export default Chip;
