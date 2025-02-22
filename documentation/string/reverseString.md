# ReverseString - String
Reverse a string.

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import reverseString from 'https://uno.js.org/lib/string/reverseString.js';
```
and compresed version
```js
import reverseString from 'https://uno.js.org/lib/string/reverseString.min.js';
```

## Code
The raw code of the function is available here:
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