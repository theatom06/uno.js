# ToChunk - Array
Splits an array into chunks of a specified size.

**Author:** theatom06

## Import 

```js
import ToChunk from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/ToChunk';
```

## Code
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
