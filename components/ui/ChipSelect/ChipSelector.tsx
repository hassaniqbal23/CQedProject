// ChipSelector.tsx
import React, {useState} from 'react';
import Chip from './Chip'; // Assuming Chip component is in the same directory

interface ChipItem {
	label: string;
	value: string;
	gender: 'male' | 'female' | 'non-binary';
}

interface ChipSelectorProps {
	chips: ChipItem[];
	defaultValue?: string;
	onChange?: (value: string) => void;
}

const ChipSelector = ({chips, defaultValue, onChange}: ChipSelectorProps) => {
	const [selectedValue, setSelectedValue] = useState(defaultValue || '');

	const handleChipClick = (value: string) => {
		setSelectedValue(value);
		if (onChange) onChange(value);
	};

	return (
		<div className="flex w-full gap-4 items-start">
			{chips.map((chip, index) => (
				<Chip
					key={index}
					label={chip.label}
					value={chip.value}
					active={chip.value === selectedValue}
					onClick={() => handleChipClick(chip.value)}
					gender={chip.gender}
				/>
			))}
		</div>
	);
};

export default ChipSelector;
