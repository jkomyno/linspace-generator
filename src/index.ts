import { iterableToArray } from './helpers';
const NUMBER_OF_POINTS = 100;

export type LinspaceAsArray = (x1: number, x2: number, n?: number) => number[];

/**
 * Generate linearly spaced vector of numbers. x1 and x2 define the interval over which linspace
 * generates points. x1 and x2 can be real or integer, and x2 can be either larger or smaller
 * than x1. If x2 is smaller than x1, then the vector contains descending values.
 * - If n is 1, linspace returns x2.
 * - If n <= 0, linspaceGenerator doesn't yield anything
 * - n must be integer
 * @param x1 First point of the interval
 * @param x2 Last point of the interval
 * @param n Number of points, specified as an integer scalar
 */
export function* linspaceGenerator(x1: number, x2: number, n: number = NUMBER_OF_POINTS): IterableIterator<number> {
  if (n === 1) {
    yield x2;
  } else if (n > 0) {
    const diff = (x2 - x1) / (n - 1);
    for (let i = 0; i < n; i++) {
      yield diff * i + x1;
    }
  }
}

/**
 * Returns the array equivalent of linspaceGenerator.
 * - If n <= 0, an empty array is returned.
 * @param x1 First point of the interval
 * @param x2 Last point of the interval
 * @param n Number of points, specified as an integer scalar
 */
export const linspaceAsArray: LinspaceAsArray = (x1, x2, n = NUMBER_OF_POINTS) =>
  iterableToArray(linspaceGenerator(x1, x2, n));
