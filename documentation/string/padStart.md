# PadStart - String
Pads the current string with another string until the resulting string reaches the given length.

**Author:** theatom06


## Code
```js
/**
 * Pads the current string with another string until the resulting string reaches the given length.
 * @param {string} str The string to pad.
 * @param {number} targetLength The length of the resulting string once the current string has been padded.
 * @param {string} padString The string to pad the current string with.
 * @returns {string} The padded string.
 * @example
 * padStart('5', 2, '0'); // '05'
 * @author theatom06
 */
export default function padStart(str, targetLength, padString) {
    return str.padStart(targetLength, padString);
}
```

## Parameters
* **str** - The string to pad.
* **targetLength** - The length of the resulting string once the current string has been padded.
* **padString** - The string to pad the current string with.


## Returns
* **string** - The padded string.


## Examples
```js
padStart('5', 2, '0'); // '05'

```