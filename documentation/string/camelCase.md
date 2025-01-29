# CamelCase - String
Converts a string to camelcase.

**Author:** theatom06

## Import 

```js
import camelCase from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/String/camelCase';
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

Hash: f35194f434c1f1fdd8aca62e79bc850cc3c6948c321d11961bd268246ec27adb