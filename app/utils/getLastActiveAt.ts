import { isToday, format, isYesterday, getYear } from 'date-fns';
export const getLastActiveDate = (date: string) => {
  const isDateToday = isToday(new Date(date));
  const isDateYesterday = isYesterday(new Date(date));
  const isNotSameYear = getYear(new Date(date)) !== getYear(new Date());

  if (isDateToday) {
    return `last seen today at ${format(new Date(date), 'hh:mm a')}`;
  } else if (isDateYesterday) {
    return `last seen yesterday at ${format(new Date(date), 'hh:mm a')}`;
  }

  if (isNotSameYear) {
    return `last seen at ${format(new Date(date), "MMMM dd',' yyyy")}`;
  } else {
    return 'last seen at ' + format(new Date(date), "MMMM dd 'at' hh:mm a");
  }
};
