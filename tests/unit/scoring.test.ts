import { parseDrivers } from '../../src/report';
import { calculateScore } from '../../src/scoring';

describe('Scoring', () => {
  const drivers = parseDrivers(['Bob Ross']);
  const driver = drivers[0];
  it('should return a score of 5 for `123 Main St`, `Bob Ross`', () => {
    // 123 Main St = 11 = odd
    // Bob Ross = 5 consonants * 1
    // gcd(11, 8) = 1, no base score multiplier
    // Score = 5

    const score = calculateScore('123 Main St', driver);
    expect(score).toEqual(5);
  });

  it('should return a score of 3 for `1234 Main St`, `Bob Ross`', () => {
    // 1234 Main St = 12 = even
    // Bob Ross = 2 vowels * 1.5
    // gcd(12, 8) = 4, baseScore * 1.5
    // Score = 3
    const score = calculateScore('1234 Main St', driver);
    expect(score).toEqual(4.5);
  });
});
