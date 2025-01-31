# Truncate - String
Truncate a string to a certain length and add '...' to the end

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import truncate from 'https://uno.js.org/lib/string/truncate.js';
```
and compresed version
```js
import truncate from 'https://uno.js.org/lib/string/truncate.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Truncate a string to a certain length and add '...' to the end
 * @param {string} str The string to truncate.
 * @param {length} length The length of the truncated string.
 * @param {string} end default is '...'
 * @returns {string} The truncated string.
 * @example
 * truncate('The quick brown fox jumps over the lazy dog', 20); // 'The quick brown fox...'
 * @author theatom06
 */
export default function truncate(str, length, end = '...') {
    return str.length > length ? str.slice(0, length) + end : str;
}
```

## Parameters
* **str** - The string to truncate.
* **length** - The length of the truncated string.
* **end** - default is '...'


## Returns
* **string** - The truncated string.


## Examples
```js
truncate('The quick brown fox jumps over the lazy dog', 20); // 'The quick brown fox...'

```