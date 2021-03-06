import {
  getVowelCount, getConsonantCount,
} from '../../src/util/string';

describe('String util functions', () => {
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
