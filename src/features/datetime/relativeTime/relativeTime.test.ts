import { age, timeAgo } from './relativeTime';

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
