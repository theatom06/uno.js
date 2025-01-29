# ReverseString - String
Reverse a string.

**Author:** theatom06

## Import 

```js
import reverseString from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/String/reverseString';
```

## Code
```js
/**
 * Reverse a string.
 * @param {string} str The string to reverse.
 * @returns {string} The reversed string.
 * @example
 * reverseString('hello'); // 'olleh'
 * @author theatom06
 */
export default function reverseString(str) {
    return str.split('').reverse().join('');
}
```

## Parameters
* **str** - The string to reverse.


## Returns
* **string** - The reversed string.


## Examples
```js
reverseString('hello'); // 'olleh'

```

Hash: dbae32d3dbe406f5c6a179dad72e6861a6dc29e0257169d9b18f936223c47b26