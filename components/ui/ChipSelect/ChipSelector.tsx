// ChipSelector.tsx
import React, {useState} from 'react';
import Chip from './Chip'; // Assuming Chip component is in the same directory

interface ChipItem {
	label: string;
	value: string;
	render?: (data: any) => React.ReactNode;
}

interface ChipSelectorProps {
	options: ChipItem[];
	defaultValue?: string;
	rounded?: boolean;
	variant?: 'primary' | 'secondary' | 'outlined' | 'secondary-outlined';
	onChange?: (value: string) => void;
}

const ChipSelector = ({
	options,
	defaultValue,
	onChange,
	rounded,
	variant,
}: ChipSelectorProps) => {
	const [selectedValue, setSelectedValue] = useState(defaultValue || '');

	const handleChipClick = (value: string) => {
		setSelectedValue(value);
		if (onChange) onChange(value);
	};

	return (
		<div className="flex w-full gap-4 items-start">
			{options.map((chip, index) => (
				<Chip
					key={index}
					value={chip.value}
					active={chip.value === selectedValue}
					rounded={rounded}
					variant={variant}
					onClick={(value) => {
						handleChipClick(value);
					}}
				>
					{chip.render ? chip.render(chip) : chip.label}
				</Chip>
			))}
		</div>
	);
};

export default ChipSelector;
