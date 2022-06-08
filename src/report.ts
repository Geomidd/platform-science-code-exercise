import { DestinationScores, Driver, RoutingReport } from './types';
import { calculateAllScores } from './scoring';
import { getConsonantCount, getVowelCount } from './util/string';

export const matchDestinationsToDrivers = (allScores: DestinationScores): Record<string, [string, number]> => {
  const queue = Object.keys(allScores);
  const driverAssignments: Record<string, [string, number]> = {};

  // This uses a greedy approach based on driver score at the high end, it doesn't account for overall score
  //  This would be the primary item to improve as it is the core feature, maybe via dynamic programming
  while (queue.length > 0) {
    const destinationToCheck = queue.shift();
    if (destinationToCheck !== undefined) {
      for (let i = 0; i < allScores[destinationToCheck].length; i++) {
        const driverName: string = allScores[destinationToCheck][i][0].name;
        const ourScore = allScores[destinationToCheck][i][1];

        // If driver assigned already, check current destination score against existing score
        if (driverName in driverAssignments) {
          const existingScore = driverAssignments[driverName][1];
          // If our score is better than existing, assign and re-enqueue the existing destination
          if (ourScore > existingScore) {
            queue.push(driverAssignments[driverName][0]);
            driverAssignments[driverName] = [destinationToCheck, ourScore];
            break;
          }
        } else {
          // Since scores are in descending order, take the best and break out
          driverAssignments[driverName] = [destinationToCheck, ourScore];
          break;
        }
      }
    }
  }
  return driverAssignments;
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
  const matches = matchDestinationsToDrivers(scores);
  let suitabilityScore = 0;
  /* eslint-disable no-param-reassign */
  const assignments = Object.keys(matches).reduce(
    (simplifiedMatching: Record<string, string>, driver: string): Record<string, string> => {
      /* eslint-disable-next-line prefer-destructuring */
      simplifiedMatching[driver] = matches[driver][0];
      suitabilityScore += matches[driver][1];
      return simplifiedMatching;
    },
    {},
  );
  /* eslint-enable no-param-reassign */

  return {
    suitabilityScore,
    assignments,
  };
};
