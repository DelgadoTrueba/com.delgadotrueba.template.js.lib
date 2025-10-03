import {
  // Formatter
  createDateFormatter,
  formatDate,
  toISOString,
  toTimestamp,
  toTimestampMs,
  // Parser
  parseDate,
  fromTimestamp,
  // TimeRelative
  age,
  timeAgo,
} from './Datetime';

describe('Datetime', () => {
  const testDate = new Date('2023-07-09'); // Sunday

  describe('Formatter', () => {
    describe('createDateFormatter', () => {
      describe('UTC', () => {
        const date = new Date('2023-08-23T16:13:37.100Z');
        const formatDate_UTC = createDateFormatter({
          locale: 'en-US',
          timezone: 'UTC',
        });
        const formatDate_UTC_EN = createDateFormatter({
          locale: 'en-US',
          timezone: 'UTC',
        });
        const formatDate_UTC_ES = createDateFormatter({
          locale: 'es-ES',
          timezone: 'UTC',
        });

        describe('Dates', () => {
          it('should format date with "YYYY-MM-DD" pattern', () => {
            const result = formatDate_UTC(date, 'YYYY-MM-DD');
            expect(result).toBe('2023-08-23');
          });

          it('should format date with "YY-MM-DD" pattern', () => {
            const result = formatDate_UTC(date, 'YY-MM-DD');
            expect(result).toBe('23-08-23');
          });

          it('should format date with "DD-MM-YYYY" pattern', () => {
            const result = formatDate_UTC(date, 'DD-MM-YYYY');
            expect(result).toBe('23-08-2023');
          });

          it('should format date with "MM-DD-YYYY" pattern', () => {
            const result = formatDate_UTC(date, 'MM-DD-YYYY');
            expect(result).toBe('08-23-2023');
          });

          it('should format date with "YYYY/MM/DD" pattern', () => {
            const result = formatDate_UTC(date, 'YYYY/MM/DD');
            expect(result).toBe('2023/08/23');
          });

          it('should format date with "DD/MM/YYYY" pattern', () => {
            const result = formatDate_UTC(date, 'DD/MM/YYYY');
            expect(result).toBe('23/08/2023');
          });

          it('should format date with "MM/DD/YYYY" pattern', () => {
            const result = formatDate_UTC(date, 'MM/DD/YYYY');
            expect(result).toBe('08/23/2023');
          });

          it('should format date with "YYYY.MM.DD" pattern', () => {
            const result = formatDate_UTC(date, 'YYYY.MM.DD');
            expect(result).toBe('2023.08.23');
          });

          it('should format date with "DD.MM.YYYY" pattern', () => {
            const result = formatDate_UTC(date, 'DD.MM.YYYY');
            expect(result).toBe('23.08.2023');
          });

          it('should format date with "MM.DD.YYYY" pattern', () => {
            const result = formatDate_UTC(date, 'MM.DD.YYYY');
            expect(result).toBe('08.23.2023');
          });

          describe('UTC - Dates - locale: en-US', () => {
            it('should format date with "MMMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, 'MMMM DD YYYY');
              expect(result).toBe('August 23 2023');
            });

            it('should format date with "MMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, 'MMM DD YYYY');
              expect(result).toBe('Aug 23 2023');
            });

            it('should format date with "dddd DD MMMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, 'dddd DD MMMM YYYY');
              expect(result).toBe('Wednesday 23 August 2023');
            });

            it('should format date with "ddd DD MMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_EN(date, 'ddd DD MMM YYYY');
              expect(result).toBe('Wed 23 Aug 2023');
            });

            it('should format date with literal text', () => {
              const result = formatDate_UTC_EN(
                date,
                '[Today is the] DD[th] [of] MMMM',
              );
              expect(result).toBe('Today is the 23th of August');
            });

            it('formatDate - formats date with template literal in English', () => {
              expect(
                formatDate_UTC_EN(date, '[It is] dddd[,] MMMM DD[th]'),
              ).toBe('It is Wednesday, August 23th');
              expect(
                formatDate_UTC_EN(date, '[Today is the] DD[th] [of] MMMM'),
              ).toBe('Today is the 23th of August');
              expect(formatDate_UTC_EN(date, '[Date:] YYYY-MM-DD')).toBe(
                'Date: 2023-08-23',
              );
              expect(formatDate_UTC_EN(date, 'YYYY-MM-DD [Date:]')).toBe(
                '2023-08-23 Date:',
              );
            });
          });

          describe('UTC - Dates- locale: es-ES', () => {
            it('should format date with "MMMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, 'MMMM DD YYYY');
              expect(result).toBe('agosto 23 2023');
            });

            it('should format date with "MMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, 'MMM DD YYYY');
              expect(result).toBe('ago 23 2023');
            });

            it('should format date with "dddd DD MMMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, 'dddd DD MMMM YYYY');
              expect(result).toBe('miércoles 23 agosto 2023');
            });

            it('should format date with "ddd DD MMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_ES(date, 'ddd DD MMM YYYY');
              expect(result).toBe('mié 23 ago 2023');
            });

            it('should format date with literal text in Spanish', () => {
              const result = formatDate_UTC_ES(
                date,
                '[Hoy es] dddd[,] DD [de] MMMM',
              );
              expect(result).toBe('Hoy es miércoles, 23 de agosto');
            });

            it('formatDate - formats date with template literal in Spanish', () => {
              expect(formatDate_UTC_ES(date, '[Es] dddd[,] MMMM DD[th]')).toBe(
                'Es miércoles, agosto 23th',
              );
              expect(
                formatDate_UTC_ES(date, '[Hoy es el] DD[th] [de] MMMM'),
              ).toBe('Hoy es el 23th de agosto');
              expect(formatDate_UTC_ES(date, '[Fecha:] YYYY-MM-DD')).toBe(
                'Fecha: 2023-08-23',
              );
              expect(formatDate_UTC_ES(date, 'YYYY-MM-DD [Fecha:]')).toBe(
                '2023-08-23 Fecha:',
              );
            });
          });
        });

        describe('Time', () => {
          it('should format date with "X" (Timestamp in seconds)', () => {
            const result = formatDate_UTC(date, 'X');
            expect(result).toBe('1692807217');
          });

          it('should format date with "x" (Timestamp in milliseconds)', () => {
            const result = formatDate_UTC(date, 'x');
            expect(result).toBe('1692807217100');
          });

          it('should format date with "ISO_8601"', () => {
            const result = formatDate_UTC(date, 'ISO_8601');
            expect(result).toBe('2023-08-23T16:13:37.100Z');
          });

          it('should format date with time formats "HH:mm:ss"', () => {
            const result = formatDate_UTC(date, 'HH:mm:ss');
            expect(result).toBe('16:13:37');
          });

          it('should format date with 12-hour clock "hh:mm A"', () => {
            const result = formatDate_UTC(date, 'hh:mm A');
            expect(result).toBe('04:13 PM');
          });

          it('should format date with 12-hour clock "hh:mm a"', () => {
            const result = formatDate_UTC(date, 'hh:mm a');
            expect(result).toBe('04:13 pm');
          });

          it('should format date with milliseconds "sss"', () => {
            const result = formatDate_UTC(date, 'sss');
            expect(result).toBe('100');
          });

          it('formatDate - formats time with template literal in English', () => {
            expect(formatDate_UTC_EN(date, '[Current time is] HH:mm:ss')).toBe(
              'Current time is 16:13:37',
            );
            expect(formatDate_UTC_EN(date, '[Time:] hh:mm A')).toBe(
              'Time: 04:13 PM',
            );
            expect(formatDate_UTC_EN(date, 'HH:mm:ss [UTC]')).toBe(
              '16:13:37 UTC',
            );
            expect(formatDate_UTC_EN(date, '[Timestamp:] X')).toBe(
              'Timestamp: 1692807217',
            );
          });

          it('formatDate - formats time with template literal in Spanish', () => {
            expect(
              formatDate_UTC_ES(date, '[La hora actual es] HH:mm:ss'),
            ).toBe('La hora actual es 16:13:37');
            expect(formatDate_UTC_ES(date, '[Hora:] hh:mm A')).toBe(
              'Hora: 04:13 PM',
            );
            expect(formatDate_UTC_ES(date, 'HH:mm:ss [UTC]')).toBe(
              '16:13:37 UTC',
            );
            expect(formatDate_UTC_ES(date, '[Marca de tiempo:] X')).toBe(
              'Marca de tiempo: 1692807217',
            );
          });

          describe('UTC - Time - timezone: Asia/Singapore', () => {
            it('should handle time zones correctly', () => {
              const formatter = createDateFormatter({
                timezone: 'Asia/Singapore',
                locale: 'en-US',
              });

              // Test individual components to avoid environment-specific issues
              const year = formatter(date, 'YYYY');
              const month = formatter(date, 'MM');
              const day = formatter(date, 'DD');
              const hour = formatter(date, 'HH');
              const minute = formatter(date, 'mm');
              const second = formatter(date, 'ss');

              expect(year).toBe('2023');
              expect(month).toBe('08');
              expect(day).toBe('24'); // Should be next day due to +8 timezone
              expect(hour).toBe('00'); // 16 + 8 = 24 = 00 (next day)
              expect(minute).toBe('13');
              expect(second).toBe('37');

              // Also test the full format
              const fullResult = formatter(date, 'YYYY-MM-DD HH:mm:ss');
              expect(fullResult).toBe('2023-08-24 00:13:37');
            });
          });
        });
      });

      describe('UTC+2 (CEST) active in Spain between the last Sunday of March and the last Sunday of October', () => {
        const date = new Date('2023-08-23T14:13:37.100Z'); // En UTC+2 es"2023-08-23T16:13:37.100+02:00
        const formatDate_UTC_2 = createDateFormatter({
          locale: 'en-US',
          timezone: 'Europe/Madrid',
        });
        const formatDate_UTC_2_EN = createDateFormatter({
          locale: 'en-US',
          timezone: 'Europe/Madrid',
        });
        const formatDate_UTC_2_ES = createDateFormatter({
          locale: 'es-ES',
          timezone: 'Europe/Madrid',
        });

        describe('Dates', () => {
          it('should format date with "YYYY-MM-DD" pattern', () => {
            const result = formatDate_UTC_2(date, 'YYYY-MM-DD');
            expect(result).toBe('2023-08-23');
          });

          it('should format date with "YY-MM-DD" pattern', () => {
            const result = formatDate_UTC_2(date, 'YY-MM-DD');
            expect(result).toBe('23-08-23');
          });

          it('should format date with "DD-MM-YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, 'DD-MM-YYYY');
            expect(result).toBe('23-08-2023');
          });

          it('should format date with "MM-DD-YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, 'MM-DD-YYYY');
            expect(result).toBe('08-23-2023');
          });

          it('should format date with "YYYY/MM/DD" pattern', () => {
            const result = formatDate_UTC_2(date, 'YYYY/MM/DD');
            expect(result).toBe('2023/08/23');
          });

          it('should format date with "DD/MM/YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, 'DD/MM/YYYY');
            expect(result).toBe('23/08/2023');
          });

          it('should format date with "MM/DD/YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, 'MM/DD/YYYY');
            expect(result).toBe('08/23/2023');
          });

          it('should format date with "YYYY.MM.DD" pattern', () => {
            const result = formatDate_UTC_2(date, 'YYYY.MM.DD');
            expect(result).toBe('2023.08.23');
          });

          it('should format date with "DD.MM.YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, 'DD.MM.YYYY');
            expect(result).toBe('23.08.2023');
          });

          it('should format date with "MM.DD.YYYY" pattern', () => {
            const result = formatDate_UTC_2(date, 'MM.DD.YYYY');
            expect(result).toBe('08.23.2023');
          });

          describe('UTC +2 - Dates - locale: en-US', () => {
            it('should format date with "MMMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, 'MMMM DD YYYY');
              expect(result).toBe('August 23 2023');
            });

            it('should format date with "MMM DD YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, 'MMM DD YYYY');
              expect(result).toBe('Aug 23 2023');
            });

            it('should format date with "dddd DD MMMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, 'dddd DD MMMM YYYY');
              expect(result).toBe('Wednesday 23 August 2023');
            });

            it('should format date with "ddd DD MMM YYYY" pattern in English', () => {
              const result = formatDate_UTC_2_EN(date, 'ddd DD MMM YYYY');
              expect(result).toBe('Wed 23 Aug 2023');
            });

            it('formatDate - formats date with template literal in English', () => {
              expect(
                formatDate_UTC_2_EN(date, '[It is] dddd[,] MMMM DD[th]'),
              ).toBe('It is Wednesday, August 23th');
              expect(
                formatDate_UTC_2_EN(date, '[Today is the] DD[th] [of] MMMM'),
              ).toBe('Today is the 23th of August');
              expect(formatDate_UTC_2_EN(date, '[Date:] YYYY-MM-DD')).toBe(
                'Date: 2023-08-23',
              );
              expect(formatDate_UTC_2_EN(date, 'YYYY-MM-DD [Date:]')).toBe(
                '2023-08-23 Date:',
              );
            });
          });

          describe('UTC +2 - Dates - locale: es-ES', () => {
            it('should format date with "MMMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, 'MMMM DD YYYY');
              expect(result).toBe('agosto 23 2023');
            });

            it('should format date with "MMM DD YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, 'MMM DD YYYY');
              expect(result).toBe('ago 23 2023');
            });

            it('should format date with "dddd DD MMMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, 'dddd DD MMMM YYYY');
              expect(result).toBe('miércoles 23 agosto 2023');
            });

            it('should format date with "ddd DD MMM YYYY" pattern in Spanish', () => {
              const result = formatDate_UTC_2_ES(date, 'ddd DD MMM YYYY');
              expect(result).toBe('mié 23 ago 2023');
            });

            it('formatDate - formats date with template literal in Spanish', () => {
              expect(
                formatDate_UTC_2_ES(date, '[Es] dddd[,] MMMM DD[th]'),
              ).toBe('Es miércoles, agosto 23th');
              expect(
                formatDate_UTC_2_ES(date, '[Hoy es el] DD[th] [de] MMMM'),
              ).toBe('Hoy es el 23th de agosto');
              expect(formatDate_UTC_2_ES(date, '[Fecha:] YYYY-MM-DD')).toBe(
                'Fecha: 2023-08-23',
              );
              expect(formatDate_UTC_2_ES(date, 'YYYY-MM-DD [Fecha:]')).toBe(
                '2023-08-23 Fecha:',
              );
            });
          });
        });

        describe('Time', () => {
          it('should format date with "X" (Timestamp in seconds)', () => {
            const result = formatDate_UTC_2(date, 'X');
            expect(result).toBe('1692800017');
          });

          it('should format date with "x" (Timestamp in milliseconds)', () => {
            const result = formatDate_UTC_2(date, 'x');
            expect(result).toBe('1692800017100');
          });

          it('should format date with "ISO_8601"', () => {
            const result = formatDate_UTC_2(date, 'ISO_8601');
            expect(result).toBe('2023-08-23T14:13:37.100Z');
          });

          it('should format date with time formats "HH:mm:ss"', () => {
            const result = formatDate_UTC_2(date, 'HH:mm:ss');
            expect(result).toBe('16:13:37');
          });

          it('should format date with 12-hour clock "hh:mm A"', () => {
            const result = formatDate_UTC_2_EN(date, 'hh:mm A');
            expect(result).toBe('04:13 PM');
          });

          it('should format date with 12-hour clock "hh:mm a"', () => {
            const result = formatDate_UTC_2_EN(date, 'hh:mm a');
            expect(result).toBe('04:13 pm');
          });

          it('should format date with milliseconds "sss"', () => {
            const result = formatDate_UTC_2(date, 'sss');
            expect(result).toBe('100');
          });

          it('formatDate - formats time with template literal in English', () => {
            expect(
              formatDate_UTC_2_EN(date, '[Current time is] HH:mm:ss'),
            ).toBe('Current time is 16:13:37');
            expect(formatDate_UTC_2_EN(date, '[Time:] hh:mm A')).toBe(
              'Time: 04:13 PM',
            );
            expect(formatDate_UTC_2_EN(date, 'HH:mm:ss [UTC+2]')).toBe(
              '16:13:37 UTC+2',
            );
            expect(formatDate_UTC_2_EN(date, '[Timestamp:] X')).toBe(
              'Timestamp: 1692800017',
            );
          });

          it('formatDate - formats time with template literal in Spanish', () => {
            expect(
              formatDate_UTC_2_ES(date, '[La hora actual es] HH:mm:ss'),
            ).toBe('La hora actual es 16:13:37');
            expect(formatDate_UTC_2_ES(date, '[Hora:] hh:mm A')).toBe(
              'Hora: 04:13 PM',
            );
            expect(formatDate_UTC_2_ES(date, 'HH:mm:ss [UTC+2]')).toBe(
              '16:13:37 UTC+2',
            );
            expect(formatDate_UTC_2_ES(date, '[Marca de tiempo:] X')).toBe(
              'Marca de tiempo: 1692800017',
            );
          });

          it('should handle locale correctly', () => {
            const result = formatDate_UTC_2_ES(date, 'dddd, MMMM DD YYYY');
            expect(result).toBe('miércoles, agosto 23 2023');
          });

          it('should handle time zones correctly', () => {
            const result = createDateFormatter({
              timezone: 'Asia/Singapore',
              locale: 'en-US',
            })(date, 'YYYY-MM-DD HH:mm:ss');
            expect(result).toBe('2023-08-23 22:13:37');
          });
        });
      });

      describe('UTC+1 (CET) active in Spain between the last Sunday of October and the last Sunday of March', () => {
        const date = new Date('2023-12-15T15:13:37.100Z'); // En UTC+1 es"2023-08-23T16:13:37.100+01:00

        const formatDate = createDateFormatter({
          locale: 'en-US',
          timezone: 'Europe/Madrid',
        });

        describe('Time', () => {
          it('should format date with "X" (Timestamp in seconds)', () => {
            const result = formatDate(date, 'X');
            expect(result).toBe('1702653217');
          });

          it('should format date with "x" (Timestamp in milliseconds)', () => {
            const result = formatDate(date, 'x');
            expect(result).toBe('1702653217100');
          });

          it('should format date with "ISO_8601"', () => {
            const result = formatDate(date, 'ISO_8601');
            expect(result).toBe('2023-12-15T15:13:37.100Z');
          });

          it('should format date with time formats "HH:mm:ss"', () => {
            const result = formatDate(date, 'HH:mm:ss');
            expect(result).toBe('16:13:37');
          });

          it('should format date with 12-hour clock "hh:mm A"', () => {
            const result = formatDate(date, 'hh:mm A');
            expect(result).toBe('04:13 PM');
          });

          it('should format date with 12-hour clock "hh:mm a"', () => {
            const result = formatDate(date, 'hh:mm a');
            expect(result).toBe('04:13 pm');
          });

          it('should format date with milliseconds "sss"', () => {
            const result = formatDate(date, 'sss');
            expect(result).toBe('100');
          });
        });
      });
    });

    describe('formatDate', () => {
      it('formatDate - formats date with given pattern', () => {
        expect(formatDate(testDate, 'YYYY-MM-DD')).toBe('2023-07-09');
        expect(formatDate(testDate, 'DD-MM-YYYY')).toBe('09-07-2023');
        expect(formatDate(testDate, 'MM-DD-YYYY')).toBe('07-09-2023');

        expect(formatDate(testDate, 'YYYY/MM/DD')).toBe('2023/07/09');
        expect(formatDate(testDate, 'DD/MM/YYYY')).toBe('09/07/2023');
        expect(formatDate(testDate, 'MM/DD/YYYY')).toBe('07/09/2023');

        expect(formatDate(testDate, 'YYYY.MM.DD')).toBe('2023.07.09');
        expect(formatDate(testDate, 'DD.MM.YYYY')).toBe('09.07.2023');
        expect(formatDate(testDate, 'MM.DD.YYYY')).toBe('07.09.2023');
      });
    });

    test('toISOString - converts to ISO string', () => {
      const iso = toISOString(testDate);
      expect(iso).toContain('2023-07-09');
    });

    test('toTimestampMs - converts to timestamp in milliseconds', () => {
      const timestamp = toTimestampMs(testDate);
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBe(testDate.getTime()); // Should return the same value as getTime()
    });

    test('toTimestamp - converts to timestamp in seconds', () => {
      const timestamp = toTimestamp(testDate);
      expect(typeof timestamp).toBe('number');
      expect(timestamp).toBe(testDate.getTime() / 1000); // Should return the same value as getTime()
    });
  });

  describe('Parser', () => {
    test('parseDate - parses date string', () => {
      const parsed = parseDate('2023-07-09');
      expect(parsed).toBeInstanceOf(Date);
      if (parsed) {
        expect(parsed.getFullYear()).toBe(2023);
      }
    });

    test('fromTimestamp - creates date from timestamp', () => {
      const timestamp = testDate.getTime();
      const date = fromTimestamp(timestamp);
      expect(date).toEqual(testDate);
    });
  });

  describe('Time Relative', () => {
    test('age - calculates age', () => {
      const birthDate = new Date('1990-01-01');
      const ageValue = age(birthDate);
      expect(ageValue).toBeGreaterThan(30);

      // Test edge case: birthday not yet reached this year (should decrement age)
      const today = new Date();
      const futureMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 2,
        today.getDate(),
      );
      const birthDateFuture = new Date(
        today.getFullYear() - 25,
        futureMonth.getMonth(),
        futureMonth.getDate(),
      );
      expect(age(birthDateFuture)).toBe(24); // Age should be decremented

      // Test edge case: same month but birthday not yet reached (should decrement age)
      const sameMontFuture = new Date(
        today.getFullYear() - 30,
        today.getMonth(),
        today.getDate() + 5,
      );
      const ageNotReached = age(sameMontFuture);
      expect(ageNotReached).toBe(29); // Should be decremented
    });

    test('timeAgo - gets time ago string', () => {
      // Test seconds ago
      const fewSecondsAgo = new Date(Date.now() - 30 * 1000);
      const secondsAgoString = timeAgo(fewSecondsAgo);
      expect(typeof secondsAgoString).toBe('string');
      expect(secondsAgoString).toContain('second');

      // Test minutes ago
      const fewMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const minutesAgoString = timeAgo(fewMinutesAgo);
      expect(minutesAgoString).toContain('minute');

      // Test hours ago
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const timeAgoString = timeAgo(oneHourAgo);
      expect(timeAgoString).toContain('hour');

      // Test days ago
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const daysAgoString = timeAgo(twoDaysAgo);
      expect(daysAgoString).toContain('day');

      // Test weeks ago
      const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const weeksAgoString = timeAgo(twoWeeksAgo);
      expect(weeksAgoString).toContain('week');

      // Test months ago
      const threeMonthsAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      const monthsAgoString = timeAgo(threeMonthsAgo);
      expect(monthsAgoString).toContain('month');

      // Test years ago
      const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
      const yearsAgoString = timeAgo(twoYearsAgo);
      expect(yearsAgoString).toContain('year');
    });
  });
});
