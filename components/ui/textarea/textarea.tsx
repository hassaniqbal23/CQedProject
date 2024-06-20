import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean;
  error?: string;
  label?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, disabled, error, label, ...props }, ref) => {
    const isError = !!error;

    return (
      <div className="flex flex-col">
        {label && <label className="mb-1">{label}</label>}
        <textarea
          className={cn(
            'flex min-h-[80px] w-full   rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            isError && 'border-red-500',
            disabled && 'opacity-50 cursor-not-allowed   bg-[#F8F9FB]',
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {isError && <p className="text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
