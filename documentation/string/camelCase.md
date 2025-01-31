# CamelCase - String
Converts a string to camelcase.

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import camelCase from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/string/camelCase.js';
```
and compresed version
```js
import camelCase from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/string/camelCase.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Converts a string to camelcase.
 * @param {string} str The string to convert.
 * @returns {string} Returns the camelcase string.
 * @example
 * camelCase('foo-bar'); // 'fooBar'
 * @author theatom06
*/
export default function camelCase(str) {
    return str.replace(/[-\s]([a-z])/g, (m, c) => c.toUpperCase());
}
```

## Parameters
* **str** - The string to convert.


## Returns
* **string** - Returns the camelcase string.


## Examples
```js
camelCase('foo-bar'); // 'fooBar'

```