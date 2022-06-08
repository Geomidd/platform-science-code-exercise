import { greatestCommonDivisor, isCoprime } from '../../src/util/math';

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
