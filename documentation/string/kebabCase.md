# KebabCase - String
Convert a string to kebab case.

**Author:** theatom06

## Import 

```js
import KebabCase from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/String/KebabCase';
```

## Code
```js
/**
 * Convert a string to kebab case.
 * @param {string} str The string to convert.
 * @returns {string} The kebab cased string.
 * @example
 * kebabCase('fooBar'); // 'foo-bar'
 * @author theatom06
 */
export default function kebabCase(str) {
    return str.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
```

## Parameters
* **str** - The string to convert.


## Returns
* **string** - The kebab cased string.


## Examples
```js
kebabCase('fooBar'); // 'foo-bar'

```
