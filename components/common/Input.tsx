import { FC } from 'react';
interface ListTypes {
  required: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

interface IProps {
  outerDivClassName?: string;
  labelFor?: string;
  labelTitle?: string;
  labelStyle?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  inputOuter?: string;
  maxlength?: number;
  max?: number;
  value?: string | any;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  passAlert?: string;
  onclick?: React.MouseEventHandler;
  className?: string;
  defaultValues?: ListTypes;
  register?: any;
  validations?: any;
  errors?: any;
  readOnly?: boolean;
  disabled?: boolean;
}

export const Input: FC<IProps> = ({
  outerDivClassName,
  labelFor,
  labelTitle,
  labelStyle,
  type,
  placeholder,
  icon,
  inputOuter,
  maxlength,
  max,
  passAlert,
  onclick,
  className,
  register,
  validations,
  name,
  errors,
  readOnly,
  disabled,
  ...props
}) => {
  return (
    <div
      className={`${outerDivClassName ? outerDivClassName : 'mb-6 sm:mb-8'}`}
    >
      <label
        htmlFor={labelFor}
        className={`${
          labelStyle ? labelStyle : 'mb-4'
        } block text-sm text-[#374151] font-medium pb-px`}
      >
        {labelTitle}
      </label>

      <div className={`${inputOuter} flex justify-content`}>
        <input
          readOnly={readOnly}
          disabled={disabled}
          maxLength={maxlength}
          max={max}
          autoComplete="false"
          type={type}
          className={`${className} block w-full border focus:outline-primary p-2 rounded-md`}
          placeholder={placeholder}
          {...register(name, validations ? validations : '')}
          {...props}
        />
        <span onClick={onclick}>{icon}</span>
      </div>
      <span className="text-red-400 text-xs whitespace-nowrap">
        {name && [errors].at(Number(name))[name]?.message}
      </span>
    </div>
  );
};
