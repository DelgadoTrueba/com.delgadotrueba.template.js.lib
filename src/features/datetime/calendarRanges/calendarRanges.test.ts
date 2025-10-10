import {
  assertValidDateUTC,
  getDaysArray,
  getMonthsArray,
  getWeekdaysArray,
  getYearsArray,
} from './calendarRanges';

describe('DatetimeRange', () => {
  test('getDaysArray - gets array of days in month', () => {
    const days = getDaysArray('2023-07-01');
    expect(Array.isArray(days)).toBe(true);
    expect(days.length).toBe(31); // July has 31 days
    expect(days[0]).toBe('2023-07-01'); // First day is 1st
    expect(days[30]).toBe('2023-07-31'); // Last day is 31st
    expect(days.length).toBe(31);
  });

  test('getMonthsArray - gets array of month names', () => {
    const months = getMonthsArray('2025-01-01');
    expect(Array.isArray(months)).toBe(true);
    expect(months.length).toBe(12);
    expect(months[0]).toBe('2025-01-01');
    expect(months[6]).toBe('2025-07-01');
    expect(months[11]).toBe('2025-12-01');
  });

  test('getWeekdaysArray - gets array of weekday names', () => {
    const weekdays = getWeekdaysArray('2025-10-03');
    expect(Array.isArray(weekdays)).toBe(true);
    expect(weekdays.length).toBe(7);
    expect(weekdays[0]).toBe('2025-09-29'); // Monday (day 1)
    expect(weekdays[1]).toBe('2025-09-30'); // Tuesday (day 2)
    expect(weekdays[2]).toBe('2025-10-01'); // Wednesday (day 3)
    expect(weekdays[3]).toBe('2025-10-02'); // Thursday (day 4)
    expect(weekdays[4]).toBe('2025-10-03'); // Friday (day 5)
    expect(weekdays[5]).toBe('2025-10-04'); // Wednesday (day 6)
    expect(weekdays[6]).toBe('2025-10-05'); // Wednesday (day 7)
  });

  test('getYearsArray - gets array of years', () => {
    const years = getYearsArray('2020-01-01', '2025-01-01');
    expect(Array.isArray(years)).toBe(true);
    expect(years.length).toBe(6);
  });

  describe('assertValidDateUTC', () => {
    test('assert invalid dateUTC', () => {
      expect(() => assertValidDateUTC('2020-01-32')).toThrow();
    });

    test('assert invalid dateUTC', () => {
      expect(() => assertValidDateUTC('2025-02-29')).toThrow();
    });

    test('assert valid dateUTC', () => {
      const { YYYY, MM, DD } = assertValidDateUTC('2020-01-31');

      expect(YYYY).toBe(2020);
      expect(MM).toBe(0); // 0-based month
      expect(DD).toBe(31);
    });
  });
});
