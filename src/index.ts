import { existsSync, readFileSync, writeFileSync } from 'fs';

import { generateReport } from './report';

const FILE_ENTRY_SEPARATOR = '\n';

/* eslint-disable-next-line import/prefer-default-export */
export const parseFile = (filePath: string): string[] | false => {
  if (!existsSync(filePath)) {
    console.error(`Could not find file at ${filePath}`);
    return false;
  }
  const entries = readFileSync(filePath).toString().split(FILE_ENTRY_SEPARATOR);

  return entries;
};

if (require.main === module) {
  if (process.argv.length < 4 || process.argv.length > 5) {
    console.error('Invalid number of parameters sent, there should be two file paths included');
    process.exit(9);
  }

  // This could be improved via an argument parser library
  const destinationsFilename = process.argv[2];
  const driversFilename = process.argv[3];
  const saveFile = process.argv.length === 5 ? process.argv[4] : null;

  const destinations = parseFile(destinationsFilename);
  const drivers = parseFile(driversFilename);
  if (destinations === false || drivers === false) {
    console.error('Could not open one of the files, please try again');
    process.exit(1);
  }

  const report = generateReport(destinations, drivers);

  if (saveFile !== null) {
    try {
      writeFileSync(saveFile, JSON.stringify(report, null, 2));
      console.log(`Saved report to ${saveFile}`);
    } catch (err) {
      console.error('Could not save report!');
      console.log('Routing Report');
      console.log(JSON.stringify(report, null, 2));
    }
  } else {
    console.log('Routing Report');
    console.log(JSON.stringify(report, null, 2));
  }
}
