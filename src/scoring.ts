import { DestinationScores, Driver, DriverScore } from './types';
import { isCoprime } from './util/math';

const CASE_1_MULTIPLIER = 1.5;
const CASE_2_MULTIPLIER = 1;
const CASE_3_MULTIPLIER = 1.5;

export const calculateScore = (destination: string, driver: Driver): number => {
  let baseScore = 0;
  if (destination.length % 2 === 0) {
  // 1. If destination street name length is even
    baseScore = driver.vowels * CASE_1_MULTIPLIER;
  } else {
  // 2. If destination street name length is odd
    baseScore = driver.consonants * CASE_2_MULTIPLIER;
  }

  const finalScore = isCoprime(destination.length, driver.length)
    ? baseScore
    : baseScore * CASE_3_MULTIPLIER;

  return finalScore;
};

export const calculateScoresForDestination = (destination: string, drivers: Driver[]): DriverScore[] => {
  const driverScores = drivers.reduce((accumulator: DriverScore[], driver: Driver): DriverScore[] => {
    accumulator.push([driver, calculateScore(destination, driver)]);
    return accumulator;
  }, []);

  // Sort in descending order ([0] is highest score)
  driverScores.sort((a: DriverScore, b: DriverScore): -1|0|1 => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    return 0;
  });
  return driverScores;
};

export const calculateAllScores = (destinations: string[], drivers: Driver[]): DestinationScores => {
  /* eslint-disable no-param-reassign */
  const scoreRecords = destinations.reduce((scores: DestinationScores, destination: string): DestinationScores => {
    scores[destination] = calculateScoresForDestination(destination, drivers);
    return scores;
  }, {});
  /* eslint-enable no-param-reassign */
  return scoreRecords;
};
