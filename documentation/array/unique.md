# Unique - Array
Removes all duplicates from a array

**Author:** theatom06

## Import 

```js
import Unique from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/TITLE';
```

## Code
```js
/**
 * Removes all duplicates from a array
 * @param {Array} array The array to remove duplicates from
 * @returns {Array} The array without duplicates
 * @example
 * unique([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
 * @author theatom06
 */
export default function unique(array) {
    return [...new Set(array)];
}
```

## Parameters
* **array** - The array to remove duplicates from


## Returns
* **Array** - The array without duplicates


## Examples
```js
unique([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]

```
