import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ShieldAlert, LoaderIcon, Eye, EyeOff } from "lucide-react";
import { Label } from "../label/label";

interface InputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "text" | "password" | "number";
  id?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autocomplete?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  loading,
  type = "text",
  id,
  className,
  placeholder,
  value,
  onChange,
  onBlur,
  autocomplete = "off"
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputType = showPassword ? "text" : type;
  const isError = !!error;

  return (
    <div>
      {label && (
        <Label htmlFor={id} className="text-foreground-primary font-montserrat font-semibold text-base leading-[26.9px]">
          {label}
        </Label>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autocomplete}
          className={cn(
            "flex h-12 w-full rounded-md border  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-black disabled:cursor-not-allowed disabled:opacity-50",
            isError ? "border-red-500" : "border-gray-300",
            className
          )}
          disabled={disabled}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            onClick={() =>{
              setShowPassword(!showPassword)
            }}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
        {isError && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
            <ShieldAlert />
          </span>
        )}
        {loading && type !== "password" && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <LoaderIcon className="animate-spin" />
          </span>
        )}
      </div>
      {error && <div className="text-red-500 mt-1 text-bold text-sm">{error}</div>}
    </div>
  );
};
