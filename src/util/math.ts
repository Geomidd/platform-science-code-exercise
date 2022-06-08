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
