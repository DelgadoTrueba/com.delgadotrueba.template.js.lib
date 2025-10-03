import {
  isValidDate,
  // Date comparisons
  isBefore,
  isAfter,
  isBetween,
  isSameLocalDay,
  isSameUtcDay,
  isSameInstant,
  isSameMonth,
  isSameYear,
  isSameWeek,

  // Weekend/weekday checks
  isWeekend,
  isWeekday,

  // Date type checks
  isToday,
  isTomorrow,
  isYesterday,
  isFuture,
  isPast,

  // Specific day checks
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,

  // Start/end of period
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,

  // Month/year edge checks
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isFirstMonth,
  isLastMonth,

  // Various getters
  getDayNumberOfYear,
  getWeekNumberOfYear,
  getWeeksInMonth,
  getQuarter,
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isLeapYear,
} from './DatetimeUtils';

describe('DatetimeUtils', () => {
  const testDate = new Date('2023-07-09'); // Sunday
  const testDate2 = new Date('2023-07-14'); // Friday

  test('isValidDate - checks if date is valid', () => {
    expect(isValidDate(testDate)).toBe(true);
    expect(isValidDate(new Date('invalid'))).toBe(false);
    expect(isValidDate(null)).toBe(false);
  });

  describe('Date Comparisons', () => {
    test('isBefore - checks if date is before another', () => {
      expect(isBefore(testDate, testDate2)).toBe(true);
      expect(isBefore(testDate2, testDate)).toBe(false);
    });

    test('isAfter - checks if date is after another', () => {
      expect(isAfter(testDate2, testDate)).toBe(true);
      expect(isAfter(testDate, testDate2)).toBe(false);
    });

    test('isBetween - checks if date is between two dates', () => {
      const middleDate = new Date('2023-07-11');
      expect(isBetween(middleDate, testDate, testDate2)).toBe(true);
      expect(isBetween(testDate, middleDate, testDate2)).toBe(false);
    });

    test('isSameLocalDay - checks if dates are on same day', () => {
      const sameDay = new Date('2023-07-09T15:00:00');
      expect(isSameLocalDay(testDate, sameDay)).toBe(true);
      expect(isSameLocalDay(testDate, testDate2)).toBe(false);
    });

    // isSameUtcDay
    test('isSameUtcDay - true cuando caen en el mismo día UTC (independiente de la zona)', () => {
      // Mismo día UTC con offsets distintos
      const a = new Date('2023-07-10T01:30:00+02:00'); // == 2023-07-09T23:30:00Z
      const b = new Date('2023-07-09T23:30:00Z');
      expect(isSameUtcDay(a, b)).toBe(true);

      // Mismo día UTC con Z ambos
      const c = new Date('2023-07-09T00:05:00Z');
      const d = new Date('2023-07-09T23:59:59.999Z');
      expect(isSameUtcDay(c, d)).toBe(true);
    });

    test('isSameUtcDay - false cuando cruzan el límite de día UTC', () => {
      const endOfDayUtc = new Date('2023-07-09T23:59:59.999Z');
      const startNextDayUtc = new Date('2023-07-10T00:00:00.000Z');
      expect(isSameUtcDay(endOfDayUtc, startNextDayUtc)).toBe(false);

      // Diferente día UTC aunque localmente puedan parecer mismo día
      const localLate = new Date('2023-07-10T00:30:00+01:00'); // == 2023-07-09T23:30:00Z
      const nextUtcDay = new Date('2023-07-10T23:30:00Z');
      expect(isSameUtcDay(localLate, nextUtcDay)).toBe(false);
    });

    test('isSameInstant - true para el mismo instante con representaciones distintas', () => {
      const a = new Date('2023-07-09T15:00:00Z');
      const b = new Date(a.getTime()); // misma marca temporal
      expect(isSameInstant(a, b)).toBe(true);

      // Misma hora absoluta con offset distinto
      const c = new Date('2023-07-09T17:00:00+02:00'); // == 2023-07-09T15:00:00Z
      expect(isSameInstant(a, c)).toBe(true);
    });

    test('isSameInstant - false cuando difiere aunque sea por milisegundos', () => {
      const a = new Date('2023-07-09T15:00:00.000Z');
      const b = new Date('2023-07-09T15:00:00.001Z'); // +1 ms
      expect(isSameInstant(a, b)).toBe(false);

      // Diferentes instantes por cambio de hora aunque “parezcan” iguales localmente
      const x = new Date('2023-07-09T10:00:00-05:00'); // == 2023-07-09T15:00:00Z
      const y = new Date('2023-07-09T10:00:00Z'); // == 2023-07-09T10:00:00Z
      expect(isSameInstant(x, y)).toBe(false);
    });

    test('isSameMonth - checks if dates are in same month', () => {
      const sameMonth = new Date('2023-07-15');
      expect(isSameMonth(testDate, sameMonth)).toBe(true);
      const differentMonth = new Date('2023-08-09');
      expect(isSameMonth(testDate, differentMonth)).toBe(false);
    });

    test('isSameYear - checks if dates are in same year', () => {
      expect(isSameYear(testDate, testDate2)).toBe(true);
      const differentYear = new Date('2024-07-09');
      expect(isSameYear(testDate, differentYear)).toBe(false);
    });

    test('isSameWeek - checks if dates are in same week', () => {
      // testDate is Sunday July 9, 2023. In this implementation, week starts on Monday,
      // so Sunday belongs to the previous week
      const sameWeek = new Date('2023-07-05'); // Wednesday of same week (week starts Mon July 3)
      expect(isSameWeek(testDate, sameWeek)).toBe(true); // Should be in same week

      const differentWeek = new Date('2023-07-10'); // Monday starts new week
      expect(isSameWeek(testDate, differentWeek)).toBe(false); // Should be different week
    });
  });

  describe('Weekend/Weekday Checks', () => {
    test('isWeekend - checks if date is weekend', () => {
      expect(isWeekend(testDate)).toBe(true); // Sunday
      expect(isWeekend(testDate2)).toBe(false); // Friday
    });

    test('isWeekday - checks if date is weekday', () => {
      expect(isWeekday(testDate)).toBe(false); // Sunday
      expect(isWeekday(testDate2)).toBe(true); // Friday
    });
  });

  describe('Date Type Checks', () => {
    test('isToday - checks if date is today', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
      expect(isToday(testDate)).toBe(false);
    });

    test('isTomorrow - checks if date is tomorrow', () => {
      const now = new Date();
      const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // overflow
      );
      expect(isTomorrow(tomorrow)).toBe(true);
      expect(isTomorrow(testDate)).toBe(false);
    });

    test('isYesterday - checks if date is yesterday', () => {
      const now = new Date();

      const yesterday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 1, // ← overflow
      );
      expect(isYesterday(yesterday)).toBe(true);
      expect(isYesterday(testDate)).toBe(false);
    });

    test('isFuture - checks if date is in future', () => {
      const now = new Date();
      const future = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // overflow
      );
      expect(isFuture(future)).toBe(true);
      expect(isFuture(testDate)).toBe(false);
    });

    test('isPast - checks if date is in past', () => {
      expect(isPast(testDate)).toBe(true);
      const now = new Date();
      const future = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // overflow
      );
      expect(isPast(future)).toBe(false);
    });
  });

  describe('Specific Day Checks', () => {
    test('isMonday - checks if date is Monday', () => {
      const monday = new Date('2023-07-10'); // Monday
      expect(isMonday(monday)).toBe(true);
      expect(isMonday(testDate)).toBe(false);
    });

    test('isTuesday - checks if date is Tuesday', () => {
      const tuesday = new Date('2023-07-11'); // Tuesday
      expect(isTuesday(tuesday)).toBe(true);
      expect(isTuesday(testDate)).toBe(false);
    });

    test('isWednesday - checks if date is Wednesday', () => {
      const wednesday = new Date('2023-07-12'); // Wednesday
      expect(isWednesday(wednesday)).toBe(true);
      expect(isWednesday(testDate)).toBe(false);
    });

    test('isThursday - checks if date is Thursday', () => {
      const thursday = new Date('2023-07-13'); // Thursday
      expect(isThursday(thursday)).toBe(true);
      expect(isThursday(testDate)).toBe(false);
    });

    test('isFriday - checks if date is Friday', () => {
      expect(isFriday(testDate2)).toBe(true); // testDate2 is Friday
      expect(isFriday(testDate)).toBe(false);
    });

    test('isSaturday - checks if date is Saturday', () => {
      const saturday = new Date('2023-07-08'); // Saturday
      expect(isSaturday(saturday)).toBe(true);
      expect(isSaturday(testDate)).toBe(false);
    });

    test('isSunday - checks if date is Sunday', () => {
      expect(isSunday(testDate)).toBe(true); // testDate is Sunday
      expect(isSunday(testDate2)).toBe(false);
    });
  });

  describe('Start/End of Period', () => {
    test('startOfDay - gets start of day', () => {
      const start = startOfDay(testDate);
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
      expect(start.getSeconds()).toBe(0);
    });

    test('endOfDay - gets end of day', () => {
      const end = endOfDay(testDate);
      expect(end.getHours()).toBe(23);
      expect(end.getMinutes()).toBe(59);
      expect(end.getSeconds()).toBe(59);
    });

    test('startOfWeek - gets start of week', () => {
      const start = startOfWeek(testDate);
      expect(start.getDay()).toBe(1); // Monday (default start)
    });

    test('endOfWeek - gets end of week', () => {
      const end = endOfWeek(testDate);
      expect(end.getDay()).toBe(0); // Sunday (end of week when Monday start)
    });

    test('startOfMonth - gets start of month', () => {
      const start = startOfMonth(testDate);
      expect(start.getDate()).toBe(1);
    });

    test('endOfMonth - gets end of month', () => {
      const end = endOfMonth(testDate);
      expect(end.getDate()).toBe(31); // July has 31 days
    });

    test('startOfQuarter - gets start of quarter', () => {
      const start = startOfQuarter(testDate); // Q3 2023
      expect(start.getMonth()).toBe(6); // July (0-indexed)
    });

    test('endOfQuarter - gets end of quarter', () => {
      const end = endOfQuarter(testDate); // Q3 2023
      expect(end.getMonth()).toBe(8); // September (0-indexed)
    });

    test('startOfYear - gets start of year', () => {
      const start = startOfYear(testDate);
      expect(start.getMonth()).toBe(0); // January
      expect(start.getDate()).toBe(1);
    });

    test('endOfYear - gets end of year', () => {
      const end = endOfYear(testDate);
      expect(end.getMonth()).toBe(11); // December
      expect(end.getDate()).toBe(31);
    });
  });

  describe('Month/Year Edge Checks', () => {
    test('isFirstDayOfMonth - checks if date is first day of month', () => {
      const firstDay = new Date('2023-07-01');
      expect(isFirstDayOfMonth(firstDay)).toBe(true);
      expect(isFirstDayOfMonth(testDate)).toBe(false);
    });

    test('isLastDayOfMonth - checks if date is last day of month', () => {
      const lastDay = new Date('2023-07-31');
      expect(isLastDayOfMonth(lastDay)).toBe(true);
      expect(isLastDayOfMonth(testDate)).toBe(false);
    });

    test('isFirstMonth - checks if date is in first month of year', () => {
      const january = new Date('2023-01-15');
      expect(isFirstMonth(january)).toBe(true);
      expect(isFirstMonth(testDate)).toBe(false);
    });

    test('isLastMonth - checks if date is in last month of year', () => {
      const december = new Date('2023-12-15');
      expect(isLastMonth(december)).toBe(true);
      expect(isLastMonth(testDate)).toBe(false);
    });
  });

  describe('Various Getters', () => {
    test('getDayOfYear - gets day of year', () => {
      const dayOfYear = getDayNumberOfYear(testDate); // July 9, 2023
      expect(dayOfYear).toBeGreaterThan(180);
    });

    test('getWeekNumberOfYear - gets week number', () => {
      const weekNumber = getWeekNumberOfYear(testDate);
      expect(weekNumber).toBeGreaterThan(0);
      expect(weekNumber).toBeLessThanOrEqual(53);
    });

    test('getWeeksInMonth - gets weeks in month', () => {
      const weeks = getWeeksInMonth(testDate); // July 2023
      expect(weeks).toBeGreaterThan(0);
      expect(weeks).toBeLessThanOrEqual(6);
    });

    test('getQuarter - gets quarter of year', () => {
      expect(getQuarter(testDate)).toBe(3); // July is Q3
    });

    test('getDaysInMonth - gets days in month', () => {
      expect(getDaysInMonth(new Date(2023, 6))).toBe(31); // July has 31 days (0-indexed)
    });

    test('getFirstDayOfMonth - gets first day number', () => {
      const firstDay = getFirstDayOfMonth(2023, 6); // July 2023 (month 6 = July)
      // July 1st, 2023 was a Saturday (6)
      expect(firstDay).toBe(6);
    });

    test('getLastDayOfMonth - gets last day number', () => {
      const lastDay = getLastDayOfMonth(2023, 6); // July 2023 (month 6 = July)
      // July 31st, 2023 was a Monday (1)
      expect(lastDay).toBe(1);
    });

    test('isLeapYear - checks if year is leap year', () => {
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2023)).toBe(false);
    });
  });
});
