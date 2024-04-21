"use client";
import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label: string;
  }
>(({ checked, className, label, ...props }, ref) => (
  <label className="flex items-center">
    <span className="mr-2">{label}</span>
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checked}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-[#D1D5DB] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-3 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  </label>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
