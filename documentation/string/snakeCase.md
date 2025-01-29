# SnakeCase - String
Convert a string to snake case.

**Author:** theatom06

## Import 

```js
import snakeCase from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/String/snakeCase';
```

## Code
```js
/**
 * Convert a string to snake case.
 * @param {string} str The string to convert.
 * @returns {string} The snake cased string.
 * @example
 * snakeCase('fooBar'); // 'foo_bar'
 * @author theatom06
 */
export default function snakeCase(str) {
    return str.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}
```

## Parameters
* **str** - The string to convert.


## Returns
* **string** - The snake cased string.


## Examples
```js
snakeCase('fooBar'); // 'foo_bar'

```

Hash: 125c65d2cce6ea7704bd95667589a47b9bb90cb3f93b3a1a1062598c1be21ff8