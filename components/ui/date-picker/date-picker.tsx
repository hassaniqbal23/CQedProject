import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import { Calendar } from "@/components/ui/calender/calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";
import { DateRange } from "react-day-picker";

interface IProps {
  mode?: string;
}

const DatePickerDemo: React.FC<IProps> = ({ mode }) => {
  const [date, setDate] = React.useState<Date>();
  const [rangeDate, setRangeDate] = React.useState<DateRange | undefined>();

  console.log(date, "single");

  console.log(rangeDate, "range date");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {mode === "range" ? (
            <>
              {rangeDate?.from ? (
                rangeDate.to ? (
                  <>
                    {format(rangeDate.from, "LLL dd, y")} -{" "}
                    {format(rangeDate.to, "LLL dd, y")}
                  </>
                ) : (
                  format(rangeDate.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </>
          ) : (
            <>{date ? format(date, "PPP") : <span>Pick a date</span>}</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {mode === "range" ? (
          <Calendar
            mode="range"
            selected={rangeDate}
            onSelect={setRangeDate}
            numberOfMonths={2}
            initialFocus
          />
        ) : (
          <Calendar selected={date} onSelect={setDate} initialFocus />
        )}
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerDemo;
