# Union - Array
Creates a union of arrays

**Author:** theatom06

## Import 

```js
import union from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/union';
```

## Code
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

Hash: 3c0498db654151ff1a1cd7cc454b1e7513b79b3c8021f2b78ee5dcc451d5b160