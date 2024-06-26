import React, { useState, useEffect, FC } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Button } from '@/components/ui/button/button';
import { Calendar } from '@/components/ui/calender/calender';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';
import { DateRange } from 'react-day-picker';

interface IProps {
  mode?: string;
  selectDate?: (data: any) => void;
  defaultValue?: Date | DateRange | undefined;
  iconPosition?: 'left' | 'right';
}

const DatePickerDemo: React.FC<IProps> = ({
  mode,
  defaultValue,
  selectDate,
  iconPosition = 'right',
}) => {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    if (defaultValue && mode !== 'range') {
      return defaultValue as Date;
    }
    return undefined;
  });

  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>(
    () => {
      if (defaultValue && mode === 'range') {
        return defaultValue as DateRange;
      }
      return undefined;
    }
  );

  useEffect(() => {
    if (defaultValue && mode !== 'range') {
      setDate(defaultValue as Date);
    } else {
      setDate(undefined);
    }
  }, [defaultValue]);
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    selectDate?.(selectedDate);
  };

  const handleRangeChange = (selectedRange: DateRange | undefined) => {
    setRangeDate(selectedRange);
    selectDate?.(selectedRange);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-full justify-start text-left font-normal bg-[#F8F9FB] text-black relative',
            !date && 'text-muted-foreground'
          )}
        >
          {iconPosition === 'left' && <CalendarIcon className="mr-2 h-4 w-4" />}
          {mode === 'range' ? (
            <>
              {rangeDate?.from ? (
                rangeDate.to ? (
                  <>
                    {format(rangeDate.from, 'LLL dd, y')} -{' '}
                    {format(rangeDate.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(rangeDate.from, 'LLL dd, y')
                )
              ) : (
                <span>Select</span>
              )}
            </>
          ) : (
            <>{date ? format(date, 'PPP') : <span>Select</span>}</>
          )}
          {iconPosition === 'right' && (
            <CalendarIcon className="ml-2 h-4 w-4 absolute right-6" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {mode === 'range' ? (
          <Calendar
            mode="range"
            selected={rangeDate}
            onSelect={handleRangeChange}
            numberOfMonths={2}
            initialFocus
          />
        ) : (
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerDemo;
