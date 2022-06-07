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

/* eslint-disable-next-line no-unused-vars */
export const hasSimilarities = (_destination: string, _driver: string): boolean => {
  // TODO: Implement logic
  const containsSimilarities = false;
  return containsSimilarities;
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

  const finalScore = hasSimilarities(destination, driver)
    ? baseScore * CASE_3_MULTIPLIER
    : baseScore;

  return finalScore;
};
