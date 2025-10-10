import { fromTimestampMs, parseDatetime } from './parser';

describe('Parser', () => {
  const testDate = new Date('2023-07-09'); // Sunday

  test('parseDate - parses date string', () => {
    const parsed = parseDatetime('2023-07-09', 'YYYY-MM-DD');
    expect(parsed).toBeInstanceOf(Date);
    if (parsed) {
      expect(parsed.getFullYear()).toBe(2023);
    }
    // probar los cambios de hora
  });

  test('fromTimestampMs - creates date from milliseconds', () => {
    const timestamp = testDate.getTime();
    const date = fromTimestampMs(timestamp);
    expect(date).toEqual(testDate);
  });

  // todo miliseconds
});
