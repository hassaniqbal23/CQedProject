'use client';

import { forwardRef, useEffect, useState } from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { Check, ChevronDown, ChevronRight, Circle } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '../button/button';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

interface IDropdownProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  label?: string;
  onChange?: (
    value: DropdownMenuOptionProps | DropdownMenuOptionProps[]
  ) => void;
  value?: DropdownMenuOptionProps | DropdownMenuOptionProps[];
  multSelect?: boolean;
  options: DropdownMenuOptionProps[];
  rounded?: boolean;
}

export interface DropdownMenuOptionProps {
  label: string;
  value: string;
  flagUrl?: string;
  altName?: string;
}

export const Dropdown = (props: IDropdownProps) => {
  const [selectedItems, setSelectedItems] = useState<
    DropdownMenuOptionProps | DropdownMenuOptionProps[]
  >([]);

  const handleItemClick = (item: DropdownMenuOptionProps) => {
    if (Array.isArray(selectedItems) && props.multSelect) {
      if (!selectedItems.includes(item)) {
        setSelectedItems([...selectedItems, item]);
      } else {
        setSelectedItems(
          selectedItems.filter((selectedItem) => selectedItem !== item)
        );
      }
    } else {
      setSelectedItems(item);
      props.onChange && props.onChange(item);
    }
  };

  useEffect(() => {
    if (
      Array.isArray(selectedItems) &&
      selectedItems?.length > 0 &&
      props.multSelect
    ) {
      props.onChange && props.onChange(selectedItems);
    }
  }, [selectedItems]);

  const handleChipRemove = (index: number) => {
    if (Array.isArray(selectedItems) && props.multSelect) {
      const newItems = selectedItems.filter((_, i) => i !== index);
      setSelectedItems(newItems);
    }
  };

  return (
    <>
      <div className={`${props.className}`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="w-full">
            <div
              className={`flex justify-between px-2 border-1 border bg-[#F8F9FB] outer-shadow ${props.rounded ? 'rounded-full py-2' : 'rounded-md py-4'}`}
            >
              {!Array.isArray(selectedItems) && selectedItems.label ? (
                <div className="flex mr-1 justify-center items-center">
                  {selectedItems.flagUrl && selectedItems.altName ? (
                    <Image
                      width={30}
                      height={30}
                      src={selectedItems.flagUrl}
                      alt={selectedItems.altName}
                      className="mr-2"
                    />
                  ) : (
                    ''
                  )}
                  <h1>{selectedItems.label} </h1>
                </div>
              ) : (
                <h1>{props.label}</h1>
              )}
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-[#5D5E68] mt-3.5 px-3 py-2 text-semibold items-center bg-[#F8F9FB] cursor-pointer">
            <DropdownMenuRadioGroup className="">
              {props.options.map((option, index) => {
                return (
                  <DropdownMenuRadioItem
                    key={option.label}
                    value={option.value}
                    onClick={() => handleItemClick(option)}
                    className={`text-[#5D5E68] px-3 py-2.5 text-semibold items-center bg-[#F8F9FB] hover:bg-gray-200 cursor-pointer ${
                      index === props.options.length - 1 ? '' : 'border-b '
                    }`}
                  >
                    {option.flagUrl && option.altName ? (
                      <Image
                        width={30}
                        height={30}
                        src={option.flagUrl}
                        alt={option.altName}
                        className="mr-2"
                      />
                    ) : (
                      ''
                    )}
                    {option.label}
                  </DropdownMenuRadioItem>
                );
              })}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {props.multSelect && (
        <div className="flex justify-start items-center flex-wrap w-[350px] mt-2 mx-auto">
          {Array.isArray(selectedItems) &&
            selectedItems.map((item: DropdownMenuOptionProps, index) => (
              <div
                key={index}
                className="rounded-full border border-gray-300 mt-4 p-2 flex items-center  mr-1"
              >
                <span className="mr-1">{item.label}</span>
                <Button
                  size={'sm'}
                  variant={'ghost'}
                  className="ml-1 text-[#737373] p-0 m-0"
                  onClick={() => handleChipRemove(index)}
                >
                  &times;
                </Button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
