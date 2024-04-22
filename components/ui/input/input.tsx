import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ShieldAlert, LoaderIcon, Eye, EyeOff } from 'lucide-react';

interface InputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'text' | 'password' | 'number';
  id?: string;
  className?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  loading,
  type = 'text',
  id,
  className,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const inputType = showPassword ? 'text' : type;
  const isError = !!error;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="text-foreground-primary font-montserrat font-semibold text-base leading-[26.9px]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          placeholder={placeholder}
          type={inputType}
          id={id}
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            isError && 'border-red-500',
            className
          )}
          disabled={disabled}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        )}
        {isError && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
            <ShieldAlert />
          </span>
        )}
        {loading && type !== 'password' && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <LoaderIcon className={'animate-spin '} />
          </span>
        )}
      </div>
      {error && (
        <div className="text-red-500 mt-1 text-bold text-sm ">{error}</div>
      )}
    </div>
  );
};
