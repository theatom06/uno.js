# UnescapeHTML - String
Unescapes HTML entities in a given string.

**Author:** theatom06

## Import 

```js
import UnescapeHTML from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/String/UnescapeHTML';
```

## Code
```js
/**
 * Unescapes HTML entities in a given string.
 * @example
 * unescapeHTML('foo &amp; bar'); // 'foo & bar'
 * @param {string} str The string containing HTML entities to be unescaped.
 * @returns {string} The unescaped string.
 * @author theatom06
 */
export default function unescapeHTML(str) {
    const unescapeChars = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'"
    };
    return str.replace(/&(amp|lt|gt|quot|#39);/g, char => unescapeChars[char]);
}
```

## Parameters
* **str** - The string containing HTML entities to be unescaped.


## Returns
* **string** - The unescaped string.


## Examples
```js
unescapeHTML('foo &amp; bar'); // 'foo & bar'

```
