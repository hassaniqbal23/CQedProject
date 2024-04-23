// Chip.tsx
import React from 'react';
import {cn} from '@/lib/utils';

interface ChipProps {
	label: string;
	value: string;
	onClick?: () => void;
	active?: boolean;
	gender: 'male' | 'female' | 'non-binary';
	icon?: React.ReactNode; // Accept SVG icon as prop
}

const Chip = ({label, value, onClick, active, gender, icon}: ChipProps) => {
	const handleClick = () => {
		if (onClick) onClick();
	};

	const fillColors: Record<string, string> = {
		male: '#4146B8',
		female: '#FC7CB4',
		'non-binary': '#4FBA6F',
	};

	return (
		<div
			onClick={handleClick}
			className={cn(
				'flex items-center justify-center gap-2 w-[160px] h-12 font-medium text-lg text-center cursor-pointer border border-solid border-Stroke',
				active && 'text-primary border border-solid border-primary font-medium'
			)}
		>
			{icon && <div className="mr-1">{icon}</div>}{' '}
			{/* Render the icon if provided */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="21"
				height="20"
				viewBox="0 0 21 20"
				fill="none"
				className="mr-1"
			>
				<path
					d="M8.43865 18.3334C4.86949 18.3334 1.96582 15.4298 1.96582 11.8606C1.96582 8.29161 4.86949 5.38794 8.43865 5.38794C12.0077 5.38794 14.9113 8.29161 14.9113 11.8606C14.9113 15.4298 12.0077 18.3334 8.43865 18.3334ZM8.43865 7.80877C6.20432 7.80877 4.38649 9.62644 4.38649 11.8608C4.38649 14.0951 6.20415 15.9129 8.43865 15.9129C10.6728 15.9129 12.4908 14.0953 12.4908 11.8608C12.4907 9.62644 10.6728 7.80877 8.43865 7.80877Z"
					fill={fillColors[gender]}
				/>
				<path
					d="M18.632 8.13958H16.2113V4.08741H12.1592V1.66675H18.632V8.13958Z"
					fill={fillColors[gender]}
				/>
				<path
					d="M16.5645 2.02002L18.2759 3.73143L13.0143 8.99304L11.3028 7.28163L16.5645 2.02002Z"
					fill={fillColors[gender]}
				/>
			</svg>
			{label}
		</div>
	);
};

export default Chip;
