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

  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const currentYear = date ? date.getFullYear() : new Date().getFullYear();

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

  const handleYearDropdown = () => {
    setShowYearDropdown(!showYearDropdown);
  };

  const selectYear = (year: number) => {
    const newDate = new Date(
      date ? date.setFullYear(year) : new Date().setFullYear(year)
    );
    setDate(newDate);
    setShowYearDropdown(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            'w-full justify-start text-left font-normal bg-[#F8F9FB] text-black relative',
            !date && 'text-muted-foreground'
          )}
          onClick={handleYearDropdown}
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
                <span>Pick a date</span>
              )}
            </>
          ) : (
            <>{date ? format(date, 'PPP') : <span>Pick a date</span>}</>
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
            captionLayout="dropdown-buttons"
            fromYear={1950}
            toYear={new Date().getFullYear()}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerDemo;

// 'use client';
// import React, { useState, useEffect, FC } from 'react';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon } from 'lucide-react';

// import { cn } from '../../../lib/utils';
// import { Button } from '@/components/ui/button/button';
// import { Calendar } from '@/components/ui/calender/calender';
// import {
//   Input,
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui';
// import { DateRange } from 'react-day-picker';

// interface Props {
//   initialDate?: Date;
// }

// function DatePickerDemo({ initialDate }: Props) {
//   const [date, setDate] = useState<Date | undefined>(initialDate);
//   const [stringDate, setStringDate] = useState(
//     initialDate ? format(initialDate, 'PPP') : ''
//   );
//   const [errorMessage, setErrorMessage] = useState<string>('');

//   return (
//     <Popover key={date?.getDate()}>
//       <div className="relative w-[280px]">
//         <Input
//           type="string"
//           value={stringDate}
//           onChange={(e) => {
//             if (date) setStringDate('');
//             setStringDate(e.target.value);
//           }}
//           onBlur={(e) => {
//             let parsedDate = new Date(e.target.value);
//             if (parsedDate.toString() === 'Invalid Date') {
//               setErrorMessage('Invalid Date');
//             } else {
//               setErrorMessage('');
//               setDate(parsedDate);
//               setStringDate(format(parsedDate, 'PPP'));
//             }
//           }}
//         />
//         {errorMessage !== '' && (
//           <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
//             {errorMessage}
//           </div>
//         )}
//         <PopoverTrigger asChild>
//           <Button
//             variant={'outline'}
//             className={cn(
//               'font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none',
//               !date && 'text-muted-foreground'
//             )}
//           >
//             <CalendarIcon className="w-4 h-4" />
//           </Button>
//         </PopoverTrigger>
//       </div>
//       <PopoverContent align="end" className="w-auto p-0">
//         <Calendar
//           mode="single"
//           captionLayout="dropdown-buttons"
//           selected={date}
//           defaultMonth={date}
//           onSelect={(selectedDate) => {
//             if (!selectedDate) return;
//             setDate(selectedDate);
//             setStringDate(format(selectedDate, 'PPP'));
//             setErrorMessage('');
//           }}
//           fromYear={1960}
//           toYear={2030}
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }

// export default DatePickerDemo;
