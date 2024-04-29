import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import Image from 'next/image';

interface ISelectItem {
  value: string;
  label: string;
  flag?: string;
}

interface SelectInputProps {
  placeholder?: string;
  label?: string;
  options: ISelectItem[];
  onChange: (value: string) => void;
  value?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  placeholder,
  label,
  options,
  onChange,
  value,
}) => {
  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onChange(value);
      }}
    >
      <SelectTrigger className="w-full py-7">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="mt-3.4 w-full">
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {options.map((item, index) => (
            <SelectItem
              className={`border-b border-gray-200 ${index === options.length - 3 || options.length - 0 ? '' : 'border-b  '}`}
              key={item.label}
              value={item.value}
            >
              <div className="flex items-center">
                {item.flag && (
                  <Image height={30} width={30} src={item.flag} alt="flag" />
                )}
                <span className="ml-2">{item.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
