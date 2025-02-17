'use client';

import { forwardRef } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

import { cn } from '@/lib/utils';

const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, title, onClick, ...props }, ref) => (
  <>
    <div className="flex items-center space-x-2 ">
      <div>
        <SwitchPrimitives.Root
          className={cn(
            'peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
            className
          )}
          {...props}
          ref={ref}
          onClick={onClick}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              'pointer-events-none block h-5 w-5 rounded-full bg-background dark:bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
            )}
          />
        </SwitchPrimitives.Root>
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  </>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
