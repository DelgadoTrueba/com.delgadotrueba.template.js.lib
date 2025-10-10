import { DEFAULT_FORMAT_OPTIONS } from '../Datetime.constants';

import type { DateFormat, FormatDateOptions } from '../Datetime.types';

export const createDatetimeFormatter = (
  options: FormatDateOptions = DEFAULT_FORMAT_OPTIONS,
) => {
  const getFormattedPart = (
    date: Date,
    config?: Intl.DateTimeFormatOptions,
  ): string => {
    return new Intl.DateTimeFormat(options.locale, {
      timeZone: options.timezone,
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

export const formatDatetime = createDatetimeFormatter(DEFAULT_FORMAT_OPTIONS);

export const toTimestamp = (date: Date = new Date()): number => {
  return Math.floor(date.getTime() / 1000);
};

export const toTimestampMs = (date: Date = new Date()): number => {
  return date.getTime();
};

export const toISOString = (date: Date = new Date()): string => {
  return date.toISOString();
};
