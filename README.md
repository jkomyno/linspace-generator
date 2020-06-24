[![Build Status](https://travis-ci.org/jkomyno/linspace-generator.svg?branch=master)](https://travis-ci.org/jkomyno/linspace-generator)
[![npm version](https://badge.fury.io/js/linspace-generator.svg)](https://www.npmjs.com/package/linspace-generator)
[![Downloads](https://img.shields.io/npm/dm/linspace-generator.svg)](https://www.npmjs.com/package/linspace-generator)

# linspace-generator

LinspaceGenerator is a dependency-less generator of a linearly spaced vector of numbers.
It is inspired by [MATLAB's linspace](https://www.mathworks.com/help/matlab/ref/linspace.html).

------------------------------------------------------------------------------------------------------------------------------------------------------

## Installing

- with npm:
```sh
npm install --save linspace-generator
```

- with yarn
```sh
yarn add linspace-generator
```

## Typings

This package is written in TypeScript.
The following types are declared and exported:

```typescript
export declare type LinspaceAsArray = (x1: number, x2: number, n?: number) => number[];
export declare function linspaceGenerator(x1: number, x2: number, n?: number): IterableIterator<number>;
export declare const linspaceAsArray: LinspaceAsArray;
```

## How to import

Depending on your application, you might want to only either import the generator itself, or the
thin wrapper that converts the generator function into an array.

```typescript
// imports the generator itself
import { linspaceGenerator } from 'linspace-generator';
```

```typescript
// imports the array-wrapper equivalent of the generator
import { linspaceAsArray } from 'linspace-generator';
```

## Usage

Just take a look at the signature of the method:

```typescript
/**
 * Generate linearly spaced vector of numbers. x1 and x2 define the interval over which linspace
 * generates points. x1 and x2 can be real or integer, and x2 can be either larger or smaller
 * than x1. If x2 is smaller than x1, then the vector contains descending values.
 * - If n is 1, linspace returns x2.
 * - If n is zero or negative, linspace doesn't yield anything
 * - n must be integer
 * @param x1 First point interval
 * @param x2 Last point interval
 * @param n Number of points, specified as an integer scalar
 */
function* linspaceGenerator(x1: number, x2: number, n: number = 100): IterableIterator<number>;

/**
 * Returns the array version of linspaceGenerator.
 * @param x1 First point of the interval
 * @param x2 Last point of the interval
 * @param n Number of points, specified as an integer scalar
 */
const linspaceAsArray = (x1: number, x2: number, n?: number) => number[];
```

For a reminder of how Generator Functions work, please refer to the [official documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

# Example

Consider the case in which you need to create 6 equally spaced numbers in the interval [0,1].
The desired result will have the following shape (with indexes in the upper row, and values in the bottom row).

| 0    | 1    | 2    | 3    | 4    | 5    |
| ---- | ---- | ---- | ---- | ---- | ---- |
| 0    | 0.2  | 0.4  | 0.6  | 0.8  | 1    |

The situation above translates to the following code:

```typescript
const arr: number[];
const getter = linspaceGenerator(0, 1, 6);
let result: IteratorResult<number>;
while (!(result = getter.next()).done) {
  arr.push(result.value);
}
console.log(arr); // [0, 0.2, 0.4, 0.6, 0.8, 1]
```

Or, if you need to utilize the array directly:

```typescript
const arr: number[] = linspaceAsArray(0, 1, 6);
console.log(arr); // [0, 0.2, 0.4, 0.6, 0.8, 1]
```

Note that if the number `n` of points to generate is `1`, linspace returns the last point of the interval `x2`.
Also, if `n <= 0`, `linspaceGenerator` doesn't yield anything, and `linspaceAsArray` returns `[]`.

Please take a look at the tests to check out every possible nuance and other example of using this package.

## Related packages

- [fixed-math](https://github.com/jkomyno/fixed-math): utility function that converts a decimal number using fixed-point notation,
without using the expensive Number.toFixed
- [is-equally-spaced](https://github.com/jkomyno/is-equally-spaced): utility function that given an array of numbers, evaluates wether or not every element is equally spaced, i.e. if every subsequent couple of numbers in the array has the same distance.

## Contributing

Of course PRs are welcome! Before contributing, however, please be sure to run `npm run test:ci` or `yarn test:ci`,
in order to check if the code you wrote respects the linting conventions and if it doesn't break any test. Please
try to keep the unit test code coverage at 100%.
