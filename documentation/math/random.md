# Random - Math
Generates a cryptographically secure random integer in the range [min, max).

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import random from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/math/random.js';
```
and compresed version
```js
import random from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/math/random.min.js';
```

## Code
The raw code of the function is available here:
```js
import randomBytes from './randomBytes.js';

/**
 * Generates a cryptographically secure random integer in the range [min, max).
 * @param {number} min the minimum value, inclusive.
 * @param {number} max the maximum value, exclusive.
 * @returns {number} The random integer.
 * @example
 * randomInt(1, 10); // => 4
 * @author theatom06
 */
export default function randomInt(min, max) {
    const range = max - min;
    if (range <= 0) {
        throw new Error('The max value must be greater than the min value.');
    }

    const randomBytes = randomBytes(4);
    const randomInt = new DataView(randomBytes.buffer).getUint32(0, true);
    return min + (randomInt % range);
}
```

## Parameters
* **min** - the minimum value, inclusive.
* **max** - the maximum value, exclusive.


## Returns
* **number** - The random integer.


## Examples
```js
randomInt(1, 10); // => 4

```