# Sort - Semver
Sorts an array of version strings in ascending order.

**Author:** theatom06 node-semver

## Import 

```js
import Sort from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Semver/TITLE';
```

## Code
```js
import lt from "./lt";
import gt from "./gt";

/**
 * Sorts an array of version strings in ascending order.
 * @param {string[]} versions An array of version strings. 
 * @param {Boolean} reverse Whether to sort the versions in descending order.
 * @returns {string[]} The sorted array of version strings.
 * @example
 * sort(['1.1.0', '1.0.0', '1.2.0']); // Output: ['1.0.0', '1.1.0', '1.2.0']
 * @author theatom06 node-semver
 */
export default function sort(versions, reverse = false){
    let sorted = versions.sort((a, b) => {
        if (lt(a, b)) return -1;
        if (gt(a, b)) return 1;
        return 0;
    });

    if (reverse) sorted.reverse();
    return sorted;
}
```

## Parameters
* **versions** - An array of version strings.
* **reverse** - Whether to sort the versions in descending order.


## Returns
* **Array.<string>** - The sorted array of version strings.


## Examples
```js
sort(['1.1.0', '1.0.0', '1.2.0']); // Output: ['1.0.0', '1.1.0', '1.2.0']

```
