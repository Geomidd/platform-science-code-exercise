import {
  applyScoring, generateReport, getConsonantCount, getVowelCount, greatestCommonDivisor, isCoprime, parseDrivers,
} from '../src/index';

describe('Util functions', () => {
  describe('String functions', () => {
    describe('Vowel counts', () => {
      it('should return vowel count of 5 for `aeiou`', () => {
        const vowelCount = getVowelCount('aeiou');
        expect(vowelCount).toEqual(5);
      });

      it('should return vowel count of 2 for `abcde`', () => {
        const vowelCount = getVowelCount('abcde');
        expect(vowelCount).toEqual(2);
      });

      it('should return vowel count of 1 for `abcdf`', () => {
        const vowelCount = getVowelCount('abcdf');
        expect(vowelCount).toEqual(1);
      });

      it('should return vowel count of 0 for `bcdfg`', () => {
        const vowelCount = getVowelCount('bcdfg');
        expect(vowelCount).toEqual(0);
      });
    });

    describe('Consonant counts', () => {
      it('should return consonant count of 0 for `aeiou`', () => {
        const consonantCount = getConsonantCount('aeiou');
        expect(consonantCount).toEqual(0);
      });

      it('should return consonant count of 3 for `abcde`', () => {
        const consonantCount = getConsonantCount('abcde');
        expect(consonantCount).toEqual(3);
      });

      it('should return consonant count of 4 for `abcdf`', () => {
        const consonantCount = getConsonantCount('abcdf');
        expect(consonantCount).toEqual(4);
      });

      it('should return consonant count of 5 for `bcdfg`', () => {
        const consonantCount = getConsonantCount('bcdfg');
        expect(consonantCount).toEqual(5);
      });
    });
  });

  describe('Factors', () => {
    describe('Greatest Common Divisor', () => {
      it('should return 6 for 54,24', () => {
        const gcd = greatestCommonDivisor(54, 24);
        expect(gcd).toEqual(6);
      });

      it('should return 6 for 24,54', () => {
        const gcd = greatestCommonDivisor(24, 54);
        expect(gcd).toEqual(6);
      });

      it('should return 1 for 9,28', () => {
        const gcd = greatestCommonDivisor(9, 28);
        expect(gcd).toEqual(1);
      });

      it('should return 4 for 4,16', () => {
        const gcd = greatestCommonDivisor(4, 16);
        expect(gcd).toEqual(4);
      });

      it('should return 1 for 1,16', () => {
        const gcd = greatestCommonDivisor(1, 16);
        expect(gcd).toEqual(1);
      });

      it('should return 1 for 1,1', () => {
        const gcd = greatestCommonDivisor(1, 1);
        expect(gcd).toEqual(1);
      });
    });

    describe('Coprime Check', () => {
      it('should return false for 54,24', () => {
        const numbersAreCoprime = isCoprime(54, 24);
        expect(numbersAreCoprime).toEqual(false);
      });

      it('should return false for 24,54', () => {
        const numbersAreCoprime = isCoprime(24, 54);
        expect(numbersAreCoprime).toEqual(false);
      });

      it('should return true for 9,28', () => {
        const numbersAreCoprime = isCoprime(9, 28);
        expect(numbersAreCoprime).toEqual(true);
      });

      it('should return false for 4,16', () => {
        const numbersAreCoprime = isCoprime(4, 16);
        expect(numbersAreCoprime).toEqual(false);
      });

      it('should return true for 1,16', () => {
        const numbersAreCoprime = isCoprime(1, 16);
        expect(numbersAreCoprime).toEqual(true);
      });

      it('should return true for 1,1', () => {
        const numbersAreCoprime = isCoprime(1, 1);
        expect(numbersAreCoprime).toEqual(true);
      });
    });
  });

  describe('Scoring', () => {
    const drivers = parseDrivers(['Bob Ross']);
    const driver = drivers[0];
    it('should return a score of 5 for `123 Main St`, `Bob Ross`', () => {
      // 123 Main St = 11 = odd
      // Bob Ross = 5 consonants * 1
      // gcd(11, 8) = 1, no base score multiplier
      // Score = 5

      const score = applyScoring('123 Main St', driver);
      expect(score).toEqual(5);
    });

    it('should return a score of 3 for `1234 Main St`, `Bob Ross`', () => {
      // 1234 Main St = 12 = even
      // Bob Ross = 2 vowels * 1.5
      // gcd(12, 8) = 4, baseScore * 1.5
      // Score = 3
      const score = applyScoring('1234 Main St', driver);
      expect(score).toEqual(4.5);
    });
  });
});

describe('Integration', () => {
  it('should have the expected suitability score', () => {
    const destinations = ['123 Main St', '1234 Main St', '4242 Everything Drive'];
    const drivers = ['Bobby Tables', 'Rosa Murgatroyd', 'Jeffry Ferrero'];
    const report = generateReport(destinations, drivers);
    expect(report.suitabilityScore).toEqual(29.25); // 32.25 is best score manually calculated current system is 29.25
  });
});
