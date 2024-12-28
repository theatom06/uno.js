# ReverseString - String
Reverse a string.

**Author:** theatom06


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
