"use client";

import * as React from "react";
import {addDays, format} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import {Calendar, CalendarProps} from "@/components/ui/calender/calender";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover/popover";


interface DatePickerProps {
    mode?: undefined | 'default' | "range" | "single";
}

export function DatePickerDemo(props: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

    const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    })

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
          {date ? format(date, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode={props.mode || "single"}
          selected={date}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
