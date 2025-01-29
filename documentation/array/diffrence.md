# Diffrence - Array
Returns the difference between two or more arrays.

**Author:** theatom06

## Import 

```js
import diffrence from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/diffrence';
```

## Code
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

Hash: b16a5754e4c13e3dac744aabb91706f64819a3c67401a2e5abc240919d70e86e