import type {
  DateUTC,
  DateUTCParts,
  DateUTCPartsWithDelta,
} from './calendarRanges.types';

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const toDateUTC = ({ YYYY, MM, DD }: DateUTCParts): DateUTC =>
  `${YYYY}-${pad2(MM + 1)}-${pad2(DD)}`;

// Validator and Parser
export const assertValidDateUTC = (dateUTC: DateUTC): DateUTCParts => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateUTC)) {
    throw new Error(
      `Invalid date string: "${dateUTC}". Expected format YYYY-MM-DD`,
    );
  }
  const [year, month, day] = dateUTC.split('-').map(Number);
  const YYYY = year;
  const MM = month - 1; // JavaScrip-t Date 0-based month (0=January, 11=December)
  const DD = day;

  // check that the string YYYY-MM-DD represents a real calendar date (without affecting DST)
  const test = new Date(Date.UTC(YYYY, MM, DD));
  if (
    test.getUTCFullYear() !== YYYY ||
    test.getUTCMonth() !== MM ||
    test.getUTCDate() !== DD
  ) {
    throw new Error(`Nonexistent calendar date: ${dateUTC}`);
  }

  return { YYYY, MM, DD };
};

/** Move delta to a (y,m,d) using UTC (without affecting DST) */
export const shiftDateUTC = ({
  YYYY,
  MM,
  DD,
  deltaValue,
  deltaPart,
}: DateUTCPartsWithDelta): DateUTCParts => {
  // We normalise the delta to an integer (in case it arrives as 2.7, -3.2, etc.)
  const delta = Number.isFinite(deltaValue) ? Math.trunc(deltaValue) : 0;

  const vec = {
    YYYY: [1, 0, 0],
    MM: [0, 1, 0],
    DD: [0, 0, 1],
  } as const;

  const v = vec[deltaPart];
  if (!v) throw new Error(`Unhandled deltaPart: ${deltaPart}`);

  const [dy, dm, dd] = v;
  const dt = new Date(
    Date.UTC(YYYY + dy * delta, MM + dm * delta, DD + dd * delta),
  ); // automatically normalizes overflows.

  return {
    YYYY: dt.getUTCFullYear(),
    MM: dt.getUTCMonth(),
    DD: dt.getUTCDate(),
  };
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Ranges

export const getYearsArray = (
  dateUTCStart: DateUTC,
  dateUTCEnd?: DateUTC,
): DateUTC[] => {
  const dateStart = assertValidDateUTC(dateUTCStart);
  const dateEnd = assertValidDateUTC(
    dateUTCEnd ?? `${new Date().getUTCFullYear()}-01-01`,
  );

  return Array.from(
    { length: dateEnd.YYYY - dateStart.YYYY + 1 },
    (_, i) => dateUTCStart + i,
  );
};

export const getMonthsArray = (dateUTC: DateUTC): DateUTC[] => {
  const { YYYY } = assertValidDateUTC(dateUTC);
  // JavaScrip-t Date 0-based month (0=January, 11=December)
  return Array.from({ length: 12 }, (_, MM) => toDateUTC({ YYYY, MM, DD: 1 }));
};

export const getWeekdaysArray = (dateUTC: DateUTC): DateUTC[] => {
  const { YYYY, MM, DD } = assertValidDateUTC(dateUTC);

  // JavaScrip-t Date 0-based days (0=Sunday, 1=Monday, ... 6=Saturday)
  const jsDay = new Date(Date.UTC(YYYY, MM, DD)).getUTCDay();
  const diffToMonday = (jsDay + 6) % 7; // 0 if it's Monday, 6 if it's Sunday

  const monday = shiftDateUTC({
    YYYY,
    MM,
    DD,
    deltaValue: -diffToMonday,
    deltaPart: 'DD',
  });

  return Array.from({ length: 7 }, (_, i) => {
    const nextDay = shiftDateUTC({
      YYYY: monday.YYYY,
      MM: monday.MM,
      DD: monday.DD,
      deltaValue: i,
      deltaPart: 'DD',
    });
    return toDateUTC({ YYYY: nextDay.YYYY, MM: nextDay.MM, DD: nextDay.DD });
  });
};

const getDaysInMonth = (dateUTC: DateUTC): number => {
  const { YYYY, MM } = assertValidDateUTC(dateUTC);
  return new Date(Date.UTC(YYYY, MM + 1, 0)).getUTCDate(); // last day of the month m
};

export const getDaysArray = (dateUTC: DateUTC): DateUTC[] => {
  const { YYYY, MM } = assertValidDateUTC(dateUTC);
  const daysInMonth = getDaysInMonth(dateUTC);
  return Array.from(
    { length: daysInMonth },
    (_, deltaInDays) => toDateUTC({ YYYY, MM, DD: deltaInDays + 1 }), // It is safe because it is listing from 1 to N.
  );
};

// TODO RANGO DE HORAS EN UN DIA 23H O 24H;
