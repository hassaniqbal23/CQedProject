import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ShieldAlert, LoaderIcon, Eye, EyeOff } from 'lucide-react';
import { Label } from '../label/label';

interface InputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
  id?: string;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autocomplete?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      disabled,
      loading,
      type = 'text',
      id,
      className,
      placeholder,
      value,
      onChange,
      onBlur,
      name,
      required,
      autocomplete = 'off',
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputType = showPassword ? 'text' : type;
    const isError = !!error;

    return (
      <div>
        {label && (
          <Label
            htmlFor={id}
            className="text-foreground-primary font-montserrat font-semibold text-base leading-[26.9px]"
          >
            {label}
          </Label>
        )}
        <div className="relative">
          <input
            ref={ref}
            {...props}
            placeholder={placeholder}
            type={inputType}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            autoComplete={autocomplete}
            className={cn(
              'flex h-14 w-full bg-[#F8F9FB] rounded-md border font-medium px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50',
              isError ? 'border-red-500' : 'border-[#D1D5DB]',
              className
            )}
            disabled={disabled}
          />
          {type === 'password' && !error && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          {isError && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
              <ShieldAlert />
            </span>
          )}
          {loading && type !== 'password' && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <LoaderIcon className="animate-spin" />
            </span>
          )}
        </div>
        {error && (
          <div className="text-red-500 mt-0 text-bold text-sm">{error}</div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
