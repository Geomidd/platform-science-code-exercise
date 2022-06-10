import { max, permutations } from 'itertools';

import { Driver, RoutingReport, ScoreMapping } from './types';
import { calculateAllScores } from './scoring';
import { getConsonantCount, getVowelCount } from './util/string';

/* eslint-disable-next-line max-len */
export const matchDestinationsToDrivers = (destinations: string[], drivers: string[], allScores: number[][]): ScoreMapping => {
  const driverPermutations = [...permutations(drivers.keys(), Math.min(destinations.length, drivers.length))];
  const possibleResults: ScoreMapping[] = [];

  driverPermutations.forEach((permutation) => {
    const groupings: Record<string, string> = {};
    /* eslint-disable no-param-reassign */
    const score = destinations.reduce((currentScore: number, dest: string, idx: number) => {
      currentScore += allScores[idx][permutation[idx]] ?? 0;
      const driverName = drivers[permutation[idx]] === undefined ? 'Unassigned' : drivers[permutation[idx]];
      groupings[driverName] = dest;
      return currentScore;
    }, 0);
      /* eslint-enable no-param-reassign */

    possibleResults.push([score, groupings]);
  });

  const bestResult = max(possibleResults, (item) => item[0]);
  if (bestResult === undefined) {
    console.error('Could not find a valid route');
    return [-1, {}];
  }

  return bestResult;
};

/** Rather than calculating consonants and vowels whenever used, calculate once and store in a struct */
export const parseDrivers = (driverInput: string[]): Driver[] => {
  const drivers = driverInput.map((driver): Driver => ({
    name: driver,
    length: driver.length,
    consonants: getConsonantCount(driver),
    vowels: getVowelCount(driver),
  }));
  return drivers;
};

export const generateReport = (destinations: string[], drivers: string[]): RoutingReport => {
  const parsedDrivers = parseDrivers(drivers);
  const scores = calculateAllScores(destinations, parsedDrivers);
  const [suitabilityScore, assignments] = matchDestinationsToDrivers(destinations, drivers, scores);

  return {
    suitabilityScore,
    assignments,
  };
};
