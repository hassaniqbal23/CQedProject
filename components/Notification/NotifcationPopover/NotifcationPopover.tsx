import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import React, { FC } from 'react';

interface IProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (event: any) => void;
  count?: number;
  IconName?: React.ComponentType | React.ReactNode;
}

export const NotifcationPopover: FC<IProps> = ({
  open,
  count,
  IconName,
  onOpenChange,
  children,
}) => {
  return (
    <div>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild className="h-6">
          <div className="relative">
            <button>{IconName as React.ReactNode}</button>
            {count && count > 0 ? (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-[#FF4F3D] rounded-full transform translate-x-1/2 -translate-y-2/3">
                {count}
              </span>
            ) : (
              ''
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] md:w-[600px] p-0 rounded-2xl">
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
};
