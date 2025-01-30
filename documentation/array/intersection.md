# Intersection - Array
Finds the intersection between two arra

**Author:** theatom06

## Import 

```js
import intersection from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/intersection.js';
```
and compresed version
```js
import intersection from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Array/intersection.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Finds the intersection between two arra
 * @param  {...any[]} arrays The arrays to compare
 * @returns {any[]} The intersection between the arrays
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * @author theatom06
 */
export default function intersection(...arrays){
    let result = []
    arrays[0].forEach(e => {
        if(arrays.every(a => a.includes(e)))
            result.add(e);
    });
    return result;
}
```

## Parameters
* **arrays** - The arrays to compare


## Returns
* **Array.<any>** - The intersection between the arrays


## Examples
```js
intersection([1, 2, 3], [2, 3, 4]) // [2, 3]

```