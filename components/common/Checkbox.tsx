import { FC } from 'react';
interface IProps {
  type?: string;
  className?: string;
  labelFor?: string;
  value?: string;
  name?: string;
  labelTitle?: string;
  checked?: boolean;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  checkClass?: string;
  labelClassName?: string;
}

export const Checkbox: FC<IProps> = ({
  type,
  className,
  labelFor,
  value,
  name,
  onChange,
  checked,
  labelTitle,
  checkClass,
  labelClassName,
}) => {
  return (
    <div className={`${checkClass} flex`}>
      <input
        type={type}
        name={name}
        className={`${className} `}
        onChange={onChange}
        checked={checked}
        value={value}
      />
      <label className={` ${labelClassName} ml-2 `} htmlFor={labelFor}>
        {labelTitle}
      </label>
    </div>
  );
};
