import React, { useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ShieldAlert, LoaderIcon, Eye, EyeOff, Search } from 'lucide-react';
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
  rounded?: boolean;
  accept?: string;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
  onClick?: () => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
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
      rounded = false, // Default value for rounded
      onKeyDown,
      iconPosition = 'left',
      iconColor = '',
      accept,
      onClick,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputType = showPassword ? 'text' : type;
    const isError = !!error;
    const isSearchInput = type === 'search';

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
            accept={accept}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            autoComplete={autocomplete}
            onKeyDown={onKeyDown}
            onClick={onClick}
            className={cn(
              'flex h-14 w-full bg-[#F8F9FB] border font-medium px-3 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50',
              isError ? 'border-red-500' : 'border-[#D1D5DB]',
              isSearchInput ? 'px-12' : '',
              rounded ? 'rounded-full' : 'rounded-md',
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
          {type === 'search' && (
            <>
              {iconPosition === 'left' ? (
                <button
                  type="button"
                  className="absolute inset-y-0 left-2 flex items-center focus:outline-none "
                  onClick={() => {}}
                >
                  <Search color={iconColor} size={25} />
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center focus:outline-none"
                  onClick={() => {}}
                >
                  <Search color={iconColor} size={25} />
                </button>
              )}
            </>
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
