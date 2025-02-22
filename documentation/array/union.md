# Union - Array
Creates a union of arrays

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import union from 'https://uno.js.org/lib/array/union.js';
```
and compresed version
```js
import union from 'https://uno.js.org/lib/array/union.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Creates a union of arrays
 * @param  {...any[]} arrays The arrays to combine
 * @returns {any[]}  Returns the new array of combined values
 * @example
 * union([1, 2, 3], [2, 3, 4], [3, 4, 5]); // Returns [1, 2, 3, 4, 5]
 * @author theatom06
 */
export default function union(...arrays){
    return [...new Set(arrays.flat())];
}
```

## Parameters
* **arrays** - The arrays to combine


## Returns
* **Array.<any>** - Returns the new array of combined values


## Examples
```js
union([1, 2, 3], [2, 3, 4], [3, 4, 5]); // Returns [1, 2, 3, 4, 5]

```