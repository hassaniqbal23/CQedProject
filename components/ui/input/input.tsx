// Input.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { LoaderIcon, EyeIcon, EyeOffIcon } from "lucide-react";

interface InputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "text" | "password" | "number";
  id?: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  disabled,
  loading,
  type = "text",
  id,
  inputClassName,
}) => {
  const showIcon = type === "text";

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
          type={type}
          id={id}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            inputClassName
          )}
          disabled={disabled}
        />
        {showIcon && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            {type === "text" ? <LoaderIcon /> : <EyeOffIcon />}
          </span>
        )}
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {loading && <div className="mt-6 text-center">Loading...</div>}
    </div>
  );
};

export default Input;
