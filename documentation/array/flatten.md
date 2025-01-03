# Flatten - Array
Flattens an array recursively.

**Author:** theatom06

## Import 

```js
import Flatten from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/Flatten';
```

## Code
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
