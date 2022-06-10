export const getVowelCount = (input: string): number => {
  // Regex counts all characters in set, should be expanded to count unicode vowels for completeness
  const vowelMatches = input.match(/[aeiou]/gi);
  return vowelMatches?.length ?? 0;
};

export const getConsonantCount = (input: string): number => {
  // Regex counts all characters that are not a vowel or space, should expand to account for punctuation
  //  and unicode as well
  const consonantMatches = input.match(/[^aeiou ]/gi);
  return consonantMatches?.length ?? 0;
};
