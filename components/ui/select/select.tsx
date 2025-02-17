'use client';

import { FC, forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '../skeleton/skeleton';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input px-3 py-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-black focus-within:ring-offset-1 placeholder:text-muted-foreground focus:outline-none focus:ring-1  focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, img, ...props }: any, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-ful cursor-default select-none items-center rounded-sm py-2 bg-[#F8F9FB] hover:bg-gray-200  pl-8 pr-2 text-sm outline-none focus:bg-primary/[0.2] focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};

interface ISelect {
  options: { label: string; value: string }[];
  onSelect?: (value: string) => void;
  placeholder?: string | 'Please select';
  SelectTriggerClass?: string;
  defaultValue?: string;
  loading?: boolean;
  value?: string;
}

const SelectInput: FC<ISelect> = ({
  options,
  onSelect,
  placeholder,
  SelectTriggerClass,
  defaultValue,
  loading,
  value,
}) => {
  return (
    <Select defaultValue={defaultValue} value={value} onValueChange={onSelect}>
      <SelectTrigger className={cn(`p-7 bg-[#F8F9FB]`, SelectTriggerClass)}>
        {Number(defaultValue) > 0 ? (
          <SelectValue>
            {options
              ? options.find((item) => item.value === defaultValue)?.label
              : 'Loading...'}
          </SelectValue>
        ) : (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="overflow-y-auto max-h-[10rem]">
          {loading ? (
            [1, 2, 3, 4].map((i) => {
              return <Skeleton key={i} className="h-7 p-6 w-full mb-2" />;
            })
          ) : (
            <>
              {options.map((item, index) => {
                return (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                );
              })}
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { SelectInput };
