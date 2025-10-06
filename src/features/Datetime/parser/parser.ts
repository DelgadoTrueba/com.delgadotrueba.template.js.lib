// simplificame esta utilidad solo se van a poder utilizar estos formatos | Formato  | Significado            | Ejemplo              |
// | -------- | ---------------------- | -------------------- |
// | YYYY     | Año completo           | 2025                 |

// | MM       | Mes en números         | 08                   |
// | DD       | Día                    | 04                   |

// | HH       | Hora (24h)             | 08                   |
// | mm       | Minutos                | 49                   |
// | ss       | Segundos               | 29                   |
// | sss      | Milisegundos           | 773                  |
// | X        | Timestamp Unix         | 1754297369           |
// | x        | Timestamp JavaScript   | 1754297369773        |

import { Temporal } from '@js-temporal/polyfill';

import type { DateFormat, FormatDateOptions } from '../Datetime.types';

type Parts = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};

const DEFAULT_FORMAT_OPTIONS: FormatDateOptions = {
  timezone: 'Europe/Madrid',
  locale: 'es-ES',
};

function assertValidDatetime(dateParts: Parts) {
  try {
    const { year, month, day, hour, minute, second, millisecond } = dateParts;
    Temporal.PlainDate.from({ year, month, day });
    Temporal.PlainTime.from({ hour, minute, second, millisecond });
  } catch {
    throw new Error(`Nonexistent calendar date: ${dateParts}`);
  }
}

function buildRegex(format: string): {
  regex: RegExp;
  groupOrder: (keyof Parts)[];
} {
  const formatsMap: Record<string, { key: keyof Parts; pattern: string }> = {
    YYYY: { key: 'year', pattern: '(\\d{4})' },
    MM: { key: 'month', pattern: '(\\d{2})' },
    DD: { key: 'day', pattern: '(\\d{2})' },
    HH: { key: 'hour', pattern: '(\\d{2})' },
    mm: { key: 'minute', pattern: '(\\d{2})' },
    ss: { key: 'second', pattern: '(\\d{2})' },
    sss: { key: 'millisecond', pattern: '(\\d{3})' },
  };
  const formatRegex = new RegExp(Object.keys(formatsMap).join('|'), 'g');

  const groupOrder: Array<keyof Parts> = [];

  const pattern = format.replace(formatRegex, (match) => {
    const token = formatsMap[match];
    if (!token) return match;
    groupOrder.push(token.key);
    return token.pattern;
  });

  return { regex: new RegExp(`^${pattern}$`, 'u'), groupOrder };
}

const parseWithFormat = (
  dateString: string,
  format: DateFormat,
  timeZone: string,
): Date => {
  const { regex, groupOrder } = buildRegex(format);
  const m = dateString.match(regex);
  if (!m) {
    throw new Error(
      `La fecha "${dateString}" no coincide con el formato "${format}".`,
    );
  }

  const parts: Parts = {};
  groupOrder.forEach((key, i) => {
    parts[key] = parseInt(m[i + 1], 10);
  });

  const {
    year,
    month,
    day,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  } = parts;

  if (!year || !month || !day) {
    throw new Error('Year, Month and Day mandatory');
  }

  const datetimeParts = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  };

  assertValidDatetime(datetimeParts);

  const datetimeZoned = Temporal.ZonedDateTime.from({
    timeZone: timeZone,
    ...datetimeParts,
  });

  return new Date(datetimeZoned.toInstant().epochMilliseconds);
};

export const createDatetimeParser = (
  options: FormatDateOptions = DEFAULT_FORMAT_OPTIONS,
) => {
  return (dateString: string, format: DateFormat): Date => {
    // Casos especiales
    if (format === 'X') {
      // epoch en segundos
      const secs = Number(dateString);
      return new Date(secs * 1000);
    }

    if (format === 'x') {
      // epoch en ms
      const ms = Number(dateString);
      return new Date(ms);
    }
    return parseWithFormat(dateString, format, options.timezone);
  };
};

export const parseDatetime = createDatetimeParser(DEFAULT_FORMAT_OPTIONS);

export const fromTimestamp = (timestamp: number): Date => {
  return new Date(timestamp);
};
