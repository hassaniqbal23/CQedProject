'use client';

import React, { useState } from 'react';
import Chip from './Chip'; // Assuming Chip component is in the same directory

interface ChipItem {
  label: string;
  value: string;
  render?: (data: any) => React.ReactNode;
}

interface ChipSelectorProps {
  options: ChipItem[];
  defaultValue?: string[];
  rounded?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outlined'
    | 'secondary-outlined'
    | 'link';
  onChange?: (value: string[] | string) => void;
  multiSelect?: boolean;
}

const ChipSelector = ({
  options,
  defaultValue,
  onChange,
  rounded,
  variant,
  multiSelect,
}: ChipSelectorProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || []);

  const handleChipClick = (value: string) => {
    const isSelected = selectedValue.includes(value);

    if (multiSelect) {
      setSelectedValue(
        isSelected
          ? selectedValue.filter((v) => v !== value)
          : [...selectedValue, value]
      ); // Toggle selection
      if (onChange) onChange(selectedValue);
    } else {
      setSelectedValue([value]);
      if (onChange) onChange(value);
    }
  };

  return (
    <div className={`flex gap-2 items-start ${multiSelect && 'flex-wrap justify-center'}`}>
      {options.map((chip, index) => (
        <Chip
          key={index}
          value={chip.value}
          active={
            selectedValue.length > 0 && selectedValue.includes(chip.value)
              ? true
              : false
          }
          rounded={rounded}
          variant={variant}
          onClick={() => handleChipClick(chip.value)}
        >
          {chip.render ? chip.render(chip) : chip.label}
        </Chip>
      ))}
    </div>
  );
};

export default ChipSelector;
