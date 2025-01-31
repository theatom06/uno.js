# Flatten - Array
Flattens an array recursively.

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import flatten from 'https://uno.js.org/lib/array/flatten.js';
```
and compresed version
```js
import flatten from 'https://uno.js.org/lib/array/flatten.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Flattens an array recursively.
 * @param {Array} array The array to flatten
 * @returns {Array} The flattened array
 * @example
 * flatten([1, [2, [3, [4]], 5]]) // [1, 2, 3, 4, 5]
 * @author theatom06    
 */
export default function flatten(array) {
    return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
```

## Parameters
* **array** - The array to flatten


## Returns
* **Array** - The flattened array


## Examples
```js
flatten([1, [2, [3, [4]], 5]]) // [1, 2, 3, 4, 5]

```