# Unique - Array
Removes all duplicates from a array

**Author:** theatom06

## Import 

```js
import unique from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/unique';
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

Hash: 5cc3810e7052f15b3b7cc84bb504ef9eb01a3bb78a52eb0a364b803749e8f985