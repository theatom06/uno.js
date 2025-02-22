# EscapeHTML - String
Escapes special characters in a string to prevent XSS attacks via HTML.

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import escapeHTML from 'https://uno.js.org/lib/string/escapeHTML.js';
```
and compresed version
```js
import escapeHTML from 'https://uno.js.org/lib/string/escapeHTML.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Escapes special characters in a string to prevent XSS attacks via HTML.
 * @param {string} str The string to escape.
 * @returns {string} The escaped string.
 * @example
 * escapeHTML('<script>alert("xss");</script>'); // '&lt;script&gt;alert("xss");&lt;/script&gt;'
 * @author theatom06
 */
export default function escapeHTML(str) {
    const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, char => escapeChars[char]);
}
```

## Parameters
* **str** - The string to escape.


## Returns
* **string** - The escaped string.


## Examples
```js
escapeHTML('<script>alert("xss");</script>'); // '&lt;script&gt;alert("xss");&lt;/script&gt;'

```