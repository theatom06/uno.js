# ToChunk - Array
Splits an array into chunks of a specified size.

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import toChunk from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/array/toChunk.js';
```
and compresed version
```js
import toChunk from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/array/toChunk.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Splits an array into chunks of a specified size.
 * @param {any[]} array
 * @param {number} size
 * @returns {any[][]}
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * @author theatom06
 */
export default function chunk(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
```

## Parameters
* **array** - undefined
* **size** - undefined


## Returns
* **Array.<Array.<any>>** - undefined


## Examples
```js
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]

```