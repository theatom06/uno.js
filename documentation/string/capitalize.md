# Capitalize - String
Capitalize the first letter of a string.

**Author:** theatom06

## Import 

```js
import Capitalize from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/String/Capitalize';
```

## Code
```js
/**
 * Capitalize the first letter of a string.
 * @param {string} str The string to capitalize.
 * @param {string} allWords (optional) Capitalize the first letter of each word.
 * @returns {string} Returns the capitalized string.
 * @example
 * capitalize('foo bar'); // 'Foo bar'
 * @author theatom06
 */
export default function capitalize(str, allWords = false) {
    if (allWords) 
        return str.split(' ').map(word => capitalize(word)).join(' ');
    
    return str.charAt(0).toUpperCase() + str.slice(1);
}
```

## Parameters
* **str** - The string to capitalize.
* **allWords** - (optional) Capitalize the first letter of each word.


## Returns
* **string** - Returns the capitalized string.


## Examples
```js
capitalize('foo bar'); // 'Foo bar'

```
