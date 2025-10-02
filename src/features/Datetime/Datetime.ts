import type { DateFormat, FormatDateOptions } from './Datetime.types';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Formatter

const DEFAULT_FORMAT_OPTIONS: FormatDateOptions = {
  timezone: 'Europe/Madrid',
  locale: 'es-ES',
};

export const createDateFormatter = (
  format: FormatDateOptions = DEFAULT_FORMAT_OPTIONS,
) => {
  const getFormattedPart = (
    date: Date,
    config?: Intl.DateTimeFormatOptions,
  ): string => {
    return new Intl.DateTimeFormat(format.locale, {
      timeZone: format.timezone,
      ...config,
    }).format(date);
  };

  const getFullYear = (date: Date = new Date()): string => {
    return getFormattedPart(date, { year: 'numeric' });
  };

  const getShortYear = (date: Date = new Date()): string => {
    return getFormattedPart(date, { year: '2-digit' });
  };

  const getFullMonthName = (date: Date = new Date()): string => {
    return getFormattedPart(date, { month: 'long' });
  };

  const getShortMonthName = (date: Date = new Date()): string => {
    return getFormattedPart(date, { month: 'short' });
  };

  const getFullMonthNumber = (date: Date = new Date()): string => {
    return getFormattedPart(date, { month: '2-digit' });
  };

  const getFullDayNumber = (date: Date = new Date()): string => {
    return getFormattedPart(date, { day: '2-digit' });
  };

  const getFullWeekdayName = (date: Date = new Date()): string => {
    return getFormattedPart(date, { weekday: 'long' });
  };

  const getShortWeekdayName = (date: Date = new Date()): string => {
    return getFormattedPart(date, { weekday: 'short' });
  };

  // Helper to get 24h hour normalized to 00-23 to avoid engines returning "24" at midnight
  const getHour24 = (date: Date = new Date()): string => {
    const raw = getFormattedPart(date, {
      hour: '2-digit',
      hour12: false,
    }).split(' ')[0];
    return raw === '24' ? '00' : raw;
  };

  const getHour12 = (date: Date = new Date()): string => {
    return getFormattedPart(date, { hour: '2-digit', hour12: true }).split(
      ' ',
    )[0];
  };

  const getMinutes = (date: Date = new Date()): string => {
    return getFormattedPart(date, { minute: '2-digit' });
  };

  const getMilliseconds = (date: Date = new Date()): string => {
    return date.getMilliseconds().toString().padStart(3, '0');
  };

  const getSeconds = (date: Date = new Date()): string => {
    return getFormattedPart(date, { second: '2-digit' });
  };

  const getMeridiem = (date: Date = new Date()) => {
    return getFormattedPart(date, { hour: '2-digit', hour12: true }).includes(
      'AM',
    )
      ? 'AM'
      : 'PM';
  };

  const getMeridiemLower = (date: Date = new Date()) => {
    return getMeridiem(date).toLowerCase();
  };

  const getTimestamp = (date: Date = new Date()): string => {
    return Math.floor(date.getTime() / 1000).toString();
  };

  const getTimestampMilliseconds = (date: Date = new Date()): string => {
    return date.getTime().toString();
  };

  const getISOString = (date: Date = new Date()): string => {
    return date.toISOString();
  };

  return (date: Date, format: DateFormat): string => {
    const formatsMap: Record<string, () => string> = {
      // Los formatos siempre de mayor especifidad a menos p.ej MMMM (mes completo) > MMM (mes corto) > MM (mes)
      // Formatos de fecha
      YYYY: () => getFullYear(date),
      YY: () => getShortYear(date),
      MMMM: () => getFullMonthName(date),
      MMM: () => getShortMonthName(date),
      MM: () => getFullMonthNumber(date),
      DD: () => getFullDayNumber(date),
      dddd: () => getFullWeekdayName(date),
      ddd: () => getShortWeekdayName(date),
      // Formatos de tiempo
      HH: () => getHour24(date),
      hh: () => getHour12(date),
      mm: () => getMinutes(date),
      sss: () => getMilliseconds(date),
      ss: () => getSeconds(date),
      A: () => getMeridiem(date),
      a: () => getMeridiemLower(date),
      // Timestamps
      X: () => getTimestamp(date),
      x: () => getTimestampMilliseconds(date),
      // ISO_8601 = YYYY-MM-DDTHH:mm:ss.sssZ
      ISO_8601: () => getISOString(date),
    };

    // Dividir el string en segmentos usando corchetes como delimitadores
    const segments = format.split(/(\[[^\]]*\])/);

    // Procesar cada segmento
    const processedSegments = segments.map((segment, index) => {
      if (index % 2 === 0) {
        // Los segmentos en índices pares están fuera de corchetes - procesar formatos

        const formatRegex = new RegExp(Object.keys(formatsMap).join('|'), 'g');

        return segment.replace(
          formatRegex,
          (match) => formatsMap[match]() || match,
        );
      } else {
        // Los segmentos en índices impares están dentro de corchetes - extraer el contenido literal
        return segment.replace(/^\[|\]$/g, '');
      }
    });

    const result = processedSegments.join('');

    return result;
  };
};

export const formatDate = createDateFormatter(DEFAULT_FORMAT_OPTIONS);

// Todo lo que sea sumar hacerlo con otra API

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const subtractDays = (date: Date, days: number): Date => {
  return addDays(date, -days);
};

export const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

export const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};

export const addSeconds = (date: Date, seconds: number): Date => {
  const result = new Date(date);
  result.setSeconds(result.getSeconds() + seconds);
  return result;
};

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

export const differenceInHours = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60));
};

export const differenceInMinutes = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60));
};

export const differenceInSeconds = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / 1000);
};

export const differenceInDays = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const differenceInMonths = (date1: Date, date2: Date): number => {
  const years = date2.getFullYear() - date1.getFullYear();
  const months = date2.getMonth() - date1.getMonth();
  return years * 12 + months;
};

export const differenceInYears = (date1: Date, date2: Date): number => {
  return date2.getFullYear() - date1.getFullYear();
};

export const age = (
  birthDate: Date,
  referenceDate: Date = new Date(),
): number => {
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = referenceDate.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export const timeAgo = (date: Date, locale: string = 'en-US'): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffYears > 0) return rtf.format(-diffYears, 'year');
  if (diffMonths > 0) return rtf.format(-diffMonths, 'month');
  if (diffWeeks > 0) return rtf.format(-diffWeeks, 'week');
  if (diffDays > 0) return rtf.format(-diffDays, 'day');
  if (diffHours > 0) return rtf.format(-diffHours, 'hour');
  if (diffMins > 0) return rtf.format(-diffMins, 'minute');
  return rtf.format(-diffSecs, 'second');
};

// Refactor

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

export const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

export const isValidDate = (date: unknown): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const fromTimestamp = (timestamp: number): Date => {
  return new Date(timestamp);
};

// Last first

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

export const isLastDayOfMonth = (date: Date): boolean => {
  const getDaysInMonth = (date: Date = new Date()): number => {
    const y = date.getFullYear();
    const m = date.getMonth();
    return new Date(y, m + 1, 0).getDate(); // last day of the month m
  };
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

// Numero de semana y dia

export const getWeekNumber = (date: Date): number => {
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

export const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

// Rangos temporales

export const getWeeksInMonth = (date: Date): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const firstWeek = getWeekNumber(firstDay);
  const lastWeek = getWeekNumber(lastDay);
  return lastWeek - firstWeek + 1;
};

export const isSameWeek = (date1: Date, date2: Date): boolean => {
  const start1 = startOfWeek(date1);
  const start2 = startOfWeek(date2);
  return start1.getTime() === start2.getTime();
};

export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

export const isSameYear = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear();
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isTomorrow = (date: Date): boolean => {
  return isSameDay(date, addDays(new Date(), 1));
};

export const isYesterday = (date: Date): boolean => {
  return isSameDay(date, subtractDays(new Date(), 1));
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

//Dias de la semana

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

// año visiesto
export const isLeapYear = (year: number): boolean => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
