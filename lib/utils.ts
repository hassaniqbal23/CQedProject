import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { utcToZonedTime } from 'date-fns-tz';

const timeZone = 'Asia/Karachi';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormat = (date: string | number | Date | undefined) => {
  if (!date) {
    return '-';
  }

  const inputDate = new Date(date);
  const year = inputDate.getUTCFullYear();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
  const formattedDate = `${inputDate.getUTCDate()}-${
    monthNames[parseInt(month) - 1]
  }-${year}`;
  return formattedDate;
};

interface Break {
  startTime: string;
  endTime: string;
}

export const calculateTotalTimeWorked = (
  startTime: string,
  endTime: string,
  breaks: Break[] = [],
): string => {
  const startDate = new Date(startTime);
  const endDate = endTime === null ? new Date() : new Date(endTime);

  let totalTimeMs = endDate.getTime() - startDate.getTime();

  breaks?.forEach((breakItem) => {
    const breakStart = new Date(breakItem.startTime);
    const breakEnd = breakItem.endTime
      ? new Date(breakItem.endTime)
      : new Date();

    const breakDurationMs = breakEnd.getTime() - breakStart.getTime();
    totalTimeMs -= breakDurationMs;
  });

  // if (totalTimeMs < 0) {
  //   return 'under 1 Minute';
  // }

  const totalSeconds = Math.floor(totalTimeMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const hoursPart = hours > 0 ? `${hours} hrs ` : '';
  const result = `${hoursPart}${minutes} mins`;

  return result;
};

export const calculateDaysDifference = (
  startDate: string,
  endDate: string,
): number => {
  const startDateTime: Date = new Date(startDate);
  const endDateTime: Date = new Date(endDate);

  // Calculate the time difference in milliseconds
  const timeDifference: number =
    endDateTime.getTime() - startDateTime.getTime();

  // Convert the time difference to days
  const daysDifference: number = timeDifference / (1000 * 60 * 60 * 24);

  // Return the number of days (rounded to the nearest whole number)
  return Math.round(daysDifference);
};

// function to count the total time spend in breaks
interface Break {
  id: number;
  startTime: string;
  endTime: string;
  attendanceId: number;
  status: string;
}

interface BreaksData {
  Breaks: Break[];
}

const formatTime = (hours: number, minutes: number): string => {
  return `${hours}hr ${minutes}mins`;
};

interface Break {
  startTime: string;
  endTime: string;
}

export const calculateSingleBreakTime = (breakData: Break): string => {
  const startTime: number = new Date(breakData?.startTime).getTime();
  const endTime: number =
    breakData?.endTime === null
      ? new Date().getTime()
      : new Date(breakData?.endTime).getTime();
  const breakDuration: number =
    Number(utcToZonedTime(endTime, timeZone)) -
    Number(utcToZonedTime(startTime, timeZone));

  const breakDurationInMinutes: number = breakDuration / (1000 * 60);

  const hours: number = Math.floor(breakDurationInMinutes / 60);
  const remainingMinutes: number = Math.round(breakDurationInMinutes % 60);

  const hoursPart = hours > 0 ? `${hours} hrs ` : '';
  const result = `${hoursPart}${remainingMinutes} mins`;

  return result;
};

export const calculateTotalBreakTime = (breaksData: BreaksData): string => {
  const totalBreakTimeInMilliseconds: number = breaksData?.Breaks?.reduce(
    (totalTime, currentBreak) => {
      const startTime: number = new Date(currentBreak.startTime).getTime();
      const endTime: number = new Date(currentBreak.endTime).getTime();
      const breakDuration: number = endTime - startTime;

      return totalTime + breakDuration;
    },
    0,
  );

  // Convert total break time to minutes
  const totalBreakTimeInMinutes: number =
    totalBreakTimeInMilliseconds / (1000 * 60);

  // Calculate hours and remaining minutes
  const hours: number = Math.floor(totalBreakTimeInMinutes / 60);
  const remainingMinutes: number = Math.round(totalBreakTimeInMinutes % 60);

  // Use your formatTime function to format the result
  return formatTime(hours, remainingMinutes);
};

export function convertToUserTimezone(utcTime: any, userTimezone: any) {
  const zonedTime = utcToZonedTime(utcTime, userTimezone);
  return zonedTime;
}

export function getUserTimezone() {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return userTimeZone;
}

export const convertTimeToMinutes = (timeString: any) => {
  // Parse the time string
  const timeArray = timeString?.split(':');

  // Extract hours and minutes
  const hours = parseInt(timeArray && timeArray[0], 10);
  const minutes = parseInt(timeArray && timeArray[1], 10);

  // Convert hours to minutes and add to total minutes
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
};

export const convertUtcToMinutes = (utcTimeString: any) => {
  const utcDate = new Date(utcTimeString);
  const localDate = new Date(utcDate.toLocaleString());
  const minutes = localDate.getHours() * 60 + localDate.getMinutes();
  return minutes;
};

export function convertToLocaleTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);
  const localTime = dateTime.toLocaleString();

  return localTime;
}
