'use client';

import { forwardRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { Input } from '../input/input';
import { Button } from '../button/button';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

interface PopoverDemoProps {
  width?: string; // Optional initial width value
  maxWidth?: string; // Optional initial max-width value
  height?: string; // Optional initial height value
  maxHeight?: string; // Optional initial max-height value
  title?: string;
  description?: string;
  className?: string;
}

export function PopoverDemo({ title, description }: PopoverDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-40">
        <div className="">
          <div className="font-semibold">{title}</div>
          <div className="grid gap-2">
            <div className="">{description}</div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { Popover, PopoverTrigger, PopoverContent };
