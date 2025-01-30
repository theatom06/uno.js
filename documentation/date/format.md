# Format - Date
Format dates into a given format

**Author:** theatom06

## Import 

```js
import format from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/date/format.js';
```
and compresed version
```js
import format from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/date/format.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Format dates into a given format
 * @param {Date} date The date to format. 
 * @param {string} format The format to format the date into. 
 * @returns {string} The formatted date.
 * @example
 * formatDate(new Date(), 'MM/DD/YYYY HH:mm:ss'); // '01/01/1970 00:00:00'
 * @author theatom06
 */
export default function formatDate(date, format) {
    const map = {
        'MM': ('0' + (date.getMonth() + 1)).slice(-2),
        'DD': ('0' + date.getDate()).slice(-2),
        'YYYY': date.getFullYear(),
        'HH': ('0' + date.getHours()).slice(-2),
        'mm': ('0' + date.getMinutes()).slice(-2),
        'ss': ('0' + date.getSeconds()).slice(-2)
    };
    return format.replace(/MM|DD|YYYY|HH|mm|ss/gi, matched => map[matched]);
}
```

## Parameters
* **date** - The date to format.
* **format** - The format to format the date into.


## Returns
* **string** - The formatted date.


## Examples
```js
formatDate(new Date(), 'MM/DD/YYYY HH:mm:ss'); // '01/01/1970 00:00:00'

```