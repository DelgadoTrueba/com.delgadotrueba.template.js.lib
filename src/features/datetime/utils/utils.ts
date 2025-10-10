// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Validator

export const isValidDate = (date: unknown): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> isSame

export const isSameLocalDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const isSameUtcDay = (a: Date, b: Date) =>
  a.getUTCFullYear() === b.getUTCFullYear() &&
  a.getUTCMonth() === b.getUTCMonth() &&
  a.getUTCDate() === b.getUTCDate();

export const isSameInstant = (a: Date, b: Date) => a.getTime() === b.getTime();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> DAY

export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WEEK

export const startOfWeek = (date: Date, startOfWeekDay: number = 1): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (day < startOfWeekDay ? 7 : 0) + day - startOfWeekDay;
  result.setDate(result.getDate() - diff);
  return startOfDay(result);
};

export const endOfWeek = (date: Date, startOfWeekDay: number = 1): Date => {
  const result = startOfWeek(date, startOfWeekDay);
  result.setDate(result.getDate() + 6);
  return endOfDay(result);
};

export const isSameWeek = (date1: Date, date2: Date): boolean => {
  const start1 = startOfWeek(date1);
  const start2 = startOfWeek(date2);
  return start1.getTime() === start2.getTime();
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Month

export const startOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setDate(1);
  return startOfDay(result);
};

export const endOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  return endOfDay(result);
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

export const getQuarter = (date: Date): number => {
  return Math.floor(date.getMonth() / 3) + 1;
};

export const startOfQuarter = (date: Date): Date => {
  const quarter = getQuarter(date);
  const month = (quarter - 1) * 3;
  const result = new Date(date);
  result.setMonth(month, 1);
  return startOfDay(result);
};

export const endOfQuarter = (date: Date): Date => {
  const quarter = getQuarter(date);
  const month = quarter * 3 - 1;
  const result = new Date(date);
  result.setMonth(month + 1, 0);
  return endOfDay(result);
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const getLastDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDay();
};

export const getDaysInMonth = (date: Date = new Date()): number => {
  const y = date.getFullYear();
  const m = date.getMonth();
  return new Date(y, m + 1, 0).getDate(); // last day of the month m
};

export const isLastDayOfMonth = (date: Date): boolean => {
  return date.getDate() === getDaysInMonth(date);
};

export const isFirstDayOfMonth = (date: Date): boolean => {
  return date.getDate() === 1;
};

export const isLastMonth = (date: Date): boolean => {
  return date.getMonth() === 11;
};

export const isFirstMonth = (date: Date): boolean => {
  return date.getMonth() === 0;
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Year

export const startOfYear = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(0, 1);
  return startOfDay(result);
};

export const endOfYear = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(11, 31);
  return endOfDay(result);
};

export const isSameYear = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};

export const isLeapYear = (year: number): boolean => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Time

export const isToday = (date: Date): boolean => {
  return isSameLocalDay(date, new Date());
};

export const isTomorrow = (date: Date): boolean => {
  const now = new Date();
  const tomorrow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // overflow
  );
  return isSameLocalDay(date, tomorrow);
};

export const isYesterday = (date: Date): boolean => {
  const now = new Date();
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1, // ← overflow
  );
  return isSameLocalDay(date, yesterday);
};

export const isFuture = (date: Date): boolean => {
  return date > new Date();
};

export const isPast = (date: Date): boolean => {
  return date < new Date();
};

export const isBefore = (date1: Date, date2: Date): boolean => {
  return date1 < date2;
};

export const isAfter = (date1: Date, date2: Date): boolean => {
  return date1 > date2;
};

export const isBetween = (
  date: Date,
  startDate: Date,
  endDate: Date,
): boolean => {
  return date >= startDate && date <= endDate;
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Days of the week

export const isMonday = (date: Date): boolean => {
  return date.getDay() === 1;
};

export const isTuesday = (date: Date): boolean => {
  return date.getDay() === 2;
};

export const isWednesday = (date: Date): boolean => {
  return date.getDay() === 3;
};

export const isThursday = (date: Date): boolean => {
  return date.getDay() === 4;
};

export const isFriday = (date: Date): boolean => {
  return date.getDay() === 5;
};

export const isSaturday = (date: Date): boolean => {
  return date.getDay() === 6;
};

export const isSunday = (date: Date): boolean => {
  return date.getDay() === 0;
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const isWeekday = (date: Date): boolean => {
  return !isWeekend(date);
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Days of the week

export const getWeekNumberOfYear = (date: Date): number => {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
};

export const getWeeksInMonth = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstWeek = getWeekNumberOfYear(firstDay);
  const lastWeek = getWeekNumberOfYear(lastDay);
  return lastWeek - firstWeek + 1;
};

export const getDayNumberOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
