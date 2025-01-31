# PadStart - String
Pads the current string with another string until the resulting string reaches the given length.

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import padStart from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/string/padStart.js';
```
and compresed version
```js
import padStart from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/string/padStart.min.js';
```

## Code
The raw code of the function is available here:
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