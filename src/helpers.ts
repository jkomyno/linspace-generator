/**
 * Returns every element in an iterable as array. The iterator must be finite.
 */
export function iterableToArray<T>(it: Iterable<T>): T[] {
  return [...it];
}
