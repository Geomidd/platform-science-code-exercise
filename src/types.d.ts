export type Driver = {
  name: string;
  vowels: number;
  consonants: number;
  length: number;
}

export type DriverScore = [Driver, number];

export type RoutingReport = {
  suitabilityScore: number,
  assignments: Record<string, string>;
}

export type DestinationScores = Record<string, DriverScore[]>;
