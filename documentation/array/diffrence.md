# Diffrence - Array
Returns the difference between two or more arrays.

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import diffrence from 'https://uno.js.org/lib/array/diffrence.js';
```
and compresed version
```js
import diffrence from 'https://uno.js.org/lib/array/diffrence.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Returns the difference between two or more arrays.
 * @param  {...any[]} arrays The arrays to compare
 * @returns {any[]} The difference between the arrays
 * @example
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 * @author theatom06
 */
export default function difference(...arrays){
    return arrays.reduce((a, b) => a.filter(c => !b.includes(c)));
}
```

## Parameters
* **arrays** - The arrays to compare


## Returns
* **Array.<any>** - The difference between the arrays


## Examples
```js
difference([1, 2, 3], [2, 3, 4]) // [1]

```