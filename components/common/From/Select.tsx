import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@/components/ui';

interface ISelectItem {
  value: string;
  label: string;
}

interface SelectInputProps {
  placeholder: string;
  label?: string;
  options: ISelectItem[];
  onChange: (value: string) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  placeholder,
  label,
  options,
  onChange,
}) => {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="mt-3.4">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((item) => (
            <>
              <SelectItem
                key={item.value}
                value={item.value}
                onSelect={() => onChange(item.value)}
              >
                {item.label}
              </SelectItem>
              <Separator />
            </>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
