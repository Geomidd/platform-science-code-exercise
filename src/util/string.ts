export const getVowelCount = (input: string): number => {
  const vowelMatches = input.match(/[aeiou]/gi);
  return vowelMatches?.length ?? 0;
};

export const getConsonantCount = (input: string): number => {
  const consonantMatches = input.match(/[^aeiou ]/gi);
  return consonantMatches?.length ?? 0;
};
