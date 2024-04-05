import { FC } from 'react';

interface IProps {
  className?: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  option?: React.ReactNode;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

export const Select: FC<IProps> = ({
  className,
  name,
  disabled,
  option,
  width,
  onChange,
  value,
  placeholder,
  defaultValue,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      className={`${className} hover:bg-slate-200  ${
        width ? width : 'w-full'
      } text-slate-600 p-1`}
      name={name}
      disabled={disabled}
    >
      {option}
    </select>
  );
};
