import { sum } from './sum';

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('adds -1 + 1 to equal 0', () => {
    expect(sum(-1, 1)).toBe(0);
  });

  it('adds 0 + 0 to equal 0', () => {
    expect(sum(0, 0)).toBe(0);
  });

  it('adds 1.5 + 1.5 to equal 3', () => {
    expect(sum(1.5, 1.5)).toBe(3);
  });
});
