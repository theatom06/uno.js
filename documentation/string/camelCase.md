# CamelCase - String
Converts a string to camelcase.

**Author:** theatom06

## Import 

```js
import CamelCase from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/String/CamelCase';
```

## Code
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
