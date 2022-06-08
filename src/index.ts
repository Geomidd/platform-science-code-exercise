import { existsSync, readFileSync, writeFileSync } from 'fs';

const FILE_ENTRY_SEPARATOR = '\n';
const CASE_1_MULTIPLIER = 1.5;
const CASE_2_MULTIPLIER = 1;
const CASE_3_MULTIPLIER = 1.5;

type Driver = {
  name: string;
  vowels: number;
  consonants: number;
  length: number;
}

type DriverScore = [Driver, number];

type RoutingReport = {
  suitabilityScore: number,
  assignments: Record<string, string>;
}

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

export const applyScoringRaw = (destination: string, driver: string): number => {
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

export const applyScoring = (destination: string, driver: Driver): number => {
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
    accumulator.push([driver, applyScoring(destination, driver)]);
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

type DestinationScores = Record<string, DriverScore[]>;

export const calculateAllScores = (destinations: string[], drivers: Driver[]): DestinationScores => {
  /* eslint-disable no-param-reassign */
  const scoreRecords = destinations.reduce((scores: DestinationScores, destination: string): DestinationScores => {
    scores[destination] = calculateScoresForDestination(destination, drivers);
    return scores;
  }, {});
  /* eslint-enable no-param-reassign */
  return scoreRecords;
};

export const matchDestinationsToDrivers = (allScores: DestinationScores): Record<string, [string, number]> => {
  const queue = Object.keys(allScores);
  const driverAssignments: Record<string, [string, number]> = {};

  // This uses a greedy approach based on driver score at the high end, it doesn't account for overall score
  while (queue.length > 0) {
    const destinationToCheck = queue.shift();
    if (destinationToCheck !== undefined) {
      for (let i = 0; i < allScores[destinationToCheck].length; i++) {
        const driverName: string = allScores[destinationToCheck][i][0].name;
        const ourScore = allScores[destinationToCheck][i][1];

        // If driver assigned already, check score against existing score
        if (driverName in driverAssignments) {
          const existingScore = driverAssignments[driverName][1];
          // If our score is better than existing, assign and enqueue
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

if (require.main === module) {
  if(process.argv.length < 4 || process.argv.length > 5) {
    console.error('Invalid number of parameters sent, there should be two file paths included');
    process.exit(9);
  }

  // This could be improved via an argument parser library
  const destinationsFilename = process.argv[2];
  const driversFilename = process.argv[3];
  const saveFile = process.argv.length === 5 ? process.argv[4] : null;

  const destinations = parseFile(destinationsFilename);
  const drivers = parseFile(driversFilename);
  if(destinations === false || drivers === false) {
    console.error('Could not open one of the files, please try again');
    process.exit(1);
  }

  const report = generateReport(destinations, drivers);

  if(saveFile !== null) {
    try {
      writeFileSync(saveFile, JSON.stringify(report, null, 2));
      console.log(`Saved report to ${saveFile}`);
    }
    catch (err) {
      console.error('Could not save report!')
      console.log('Routing Report');
      console.log(JSON.stringify(report, null, 2));
    }
  } else {
    console.log('Routing Report');
    console.log(JSON.stringify(report, null, 2));
  }
  
}
