import { iterableToArray } from '../src/helpers';

describe('iterableToArray', () => {
  function* range(max: number) {
    let i: number = 0;
    while (i <= max) {
      yield i;
      i++;
    }
  }

  function* empty() {}

  test('It should accumulate the result of the generator into an array', () => {
    const n = 5;

    const rangeArray1 = [];
    for (const item of range(n)) {
      rangeArray1.push(item);
    }

    const rangeArray2 = [];
    const getter = range(n);
    let result: IteratorResult<number>;
    while (!(result = getter.next()).done) {
      rangeArray2.push(result.value);
    }

    expect(rangeArray1).toEqual(rangeArray2);
    expect(iterableToArray(range(n))).toEqual(rangeArray2);
  });

  test('If the generator doesn\'t yield anything, the returned array should be empty', () => {
    expect(iterableToArray(empty())).toEqual([]);
  });
});