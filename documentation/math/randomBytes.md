# RandomBytes - Math
Generates cryptographically secure random bytes. Uses the Web Crypto API if available, otherwise falls back to Node.js.

**Author:** theatom06

## Import 

```js
import randomBytes from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/math/randomBytes.js';
```
and compresed version
```js
import randomBytes from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/math/randomBytes.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Generates cryptographically secure random bytes. Uses the Web Crypto API if available, otherwise falls back to Node.js.
 * @param {number} size The number of random bytes to generate.
 * @returns {Uint8Array} The random bytes.
 * @example
 * secureRandomBytes(16); //Uint8Array(11) [104, 190,  56, 142, 8, 162, 238, 236, 247, 171, 150]
 * @author theatom06
 */
export default function secureRandomBytes(size) {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        const array = new Uint8Array(size);
        window.crypto.getRandomValues(array);
        return array;
    } else if (typeof require !== 'undefined') {
        const array = new Uint8Array(size);
        const crypto = require('crypto');
        if (crypto.randomFillSync) {
            crypto.randomFillSync(array);
        } else {
            for (let i = 0; i < size; i++) {
                array[i] = crypto.randomBytes(1)[0];
            }
        }
        return array
    } else {
        console.warn('Secure random number generation is not supported in this environment.');
        return new Uint8Array(size).map(() => Math.floor((Math.random() * Date.now()) % 256));
    }
}
```

## Parameters
* **size** - The number of random bytes to generate.


## Returns
* **Uint8Array** - The random bytes.


## Examples
```js
secureRandomBytes(16); //Uint8Array(11) [104, 190,  56, 142, 8, 162, 238, 236, 247, 171, 150]

```