import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
