import React, { useState } from 'react';
import Chip from './Chip'; // Assuming Chip component is in the same directory

export interface ChipItem<T> {
  label: string;
  value: T;
  render?: (data: any) => React.ReactNode;
}

interface ChipSelectorProps<T> {
  options: ChipItem<T>[];
  defaultValue?: any[];
  value?: T;
  rounded?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outlined'
    | 'secondary-outlined'
    | 'link';
  onChange?: (value: T[] | T) => void;
  multiSelect?: boolean;
  size?: 'sm' | 'md' | 'lg'; // Added size prop
}

function ChipSelector<T>({
  options,
  defaultValue,
  onChange,
  rounded,
  variant,
  multiSelect,
  value,
  size,
}: ChipSelectorProps<T>) {
  const [selectedValue, setSelectedValue] = useState(defaultValue || []);

  React.useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        setSelectedValue(value);
      } else {
        setSelectedValue([value]);
      }
    }
  }, [value]);

  const handleChipClick = (value: T) => {
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
    <div
      className={`flex gap-2 items-start ${
        multiSelect && 'flex-wrap justify-center'
      } 
        ${size === 'sm' ? 'gap-2' : ''}  {/* Added size specific class */}
        ${size === 'md' ? 'gap-4' : ''}  {/* Added size specific class */}
        ${size === 'lg' && 'flex-wrap gap-8 '}  {/* Added size specific class */}
      `}
    >
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
}

export default ChipSelector;
