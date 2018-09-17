import isEquallySpaced from 'is-equally-spaced';
import { linspaceGenerator, linspaceAsArray } from '../src/index';

describe('Linspace', () => {
  test('linspaceAsArray should return the exact same result as linspaceGenerator as an ordered array', () => {
    const arr1 = [];
    for (const item of linspaceGenerator(0, 5, 6)) {
      arr1.push(item);
    }
    expect(arr1).toEqual([0, 1, 2, 3, 4, 5]);
    expect(isEquallySpaced(arr1).isEqual).toBe(true);

    const arr2 = [];
    for (const item of linspaceGenerator(5, 0, 6)) {
      arr2.push(item);
    }
    expect(arr2).toEqual([5, 4, 3, 2, 1, 0]);
    expect(isEquallySpaced(arr2).isEqual).toBe(true);

    const arr3 = [];
    for (const item of linspaceGenerator(0, 1, 11)) {
      arr3.push(item);
    }
    expect(arr3).toBeAlmostEqual([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);
    expect(isEquallySpaced(arr3).isEqual).toBe(true);
  });

  test('If n is 1, linspace returns x2', () => {
    let x2 = 5;
    expect(linspaceAsArray(5, x2, 1)).toEqual([x2]);

    x2 = 10;
    expect(linspaceAsArray(0, x2, 1)).toEqual([x2]);

    x2 = 0;
    expect(linspaceAsArray(0, x2, 1)).toEqual([x2]);

    x2 = 0;
    expect(linspaceAsArray(-5, x2, 1)).toEqual([x2]);

    x2 = -20;
    expect(linspaceAsArray(-5, x2, 1)).toEqual([x2]);
  });

  test('If n is zero or negative, linspace doesn\'t yield anything', () => {
    expect(linspaceAsArray(5, 10, 0)).toEqual([]);
    expect(linspaceAsArray(0, 0, 0)).toEqual([]);
    expect(linspaceAsArray(0, 5, -1)).toEqual([]);
    expect(linspaceAsArray(-5, 0, -1)).toEqual([]);
  });

  test('If x1 is smaller than x2, then the vector contains ascending values', () => {
    expect(linspaceAsArray(0, 1, 2)).toEqual([0, 1]);
    expect(linspaceAsArray(0, 1, 3)).toEqual([0, 0.5, 1]);
    expect(linspaceAsArray(0, 1, 5)).toEqual([0, 0.25, 0.5, 0.75, 1]);
  });

  test('If x2 is smaller than x1, then the vector contains descending values', () => {
    expect(linspaceAsArray(1, 0, 2)).toEqual([1, 0]);
    expect(linspaceAsArray(1, 0, 3)).toEqual([1, 0.5, 0]);
    expect(linspaceAsArray(1, 0, 5)).toEqual([1, 0.75, 0.5, 0.25, 0]);
  });

  test('Every element in the array should be equally spaced', () => {
    expect(isEquallySpaced(linspaceAsArray(1, 5, 10), 4)).toEqual({
      distance: 0.4444,
      isEqual: true,
    });

    expect(isEquallySpaced(linspaceAsArray(5, 1, 10), 4)).toEqual({
      distance: 0.4444,
      isEqual: true,
    });

    expect(isEquallySpaced(linspaceAsArray(0.123 + 1e-5, 8.91537 + 1e-6, 10), 6).isEqual).toBe(true);
  });
});
