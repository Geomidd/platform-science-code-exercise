import { existsSync, readFileSync } from 'fs';

const FILE_ENTRY_SEPARATOR = '\n';
const CASE_1_MULTIPLIER = 1.5;
const CASE_2_MULTIPLIER = 1;
const CASE_3_MULTIPLIER = 1.5;

export const parseFile = (filePath: string): string[] | false => {
  if (!existsSync(filePath)) {
    console.error(`Could not find file at ${filePath}`);
    return false;
  }
  const entries = readFileSync(filePath).toString().split(FILE_ENTRY_SEPARATOR);

  return entries;
};

export const getVowelCount = (input: string): number => {
  const vowelMatches = input.match(/[aeiou]/gi);
  return vowelMatches?.length ?? 0;
};

export const getConsonantCount = (input: string): number => {
  const consonantMatches = input.match(/[^aeiou ]/gi);
  return consonantMatches?.length ?? 0;
};

/** Euclid's greatest common divisor algorithm, could be done recursively */
export const greatestCommonDivisor = (a: number, b: number): number => {
  let first = a;
  let second = b;
  let remainder: number;
  while ((first % second) > 0) {
    remainder = first % second;
    first = second;
    second = remainder;
  }
  return second;
};

export const isCoprime = (a: number, b: number): boolean => {
  const commonDivisor = greatestCommonDivisor(a, b);
  return commonDivisor === 1;
};

export const applyScoring = (destination: string, driver: string): number => {
  let baseScore = 0;
  if (destination.length % 2 === 0) {
  // 1. If destination street name length is even
    baseScore = getVowelCount(driver) * CASE_1_MULTIPLIER;
  } else {
  // 2. If destination street name length is odd
    baseScore = getConsonantCount(driver) * CASE_2_MULTIPLIER;
  }

  const finalScore = isCoprime(destination.length, driver.length)
    ? baseScore
    : baseScore * CASE_3_MULTIPLIER;

  return finalScore;
};
