# Factorial - Math
Finds the factorial of a number

**Author:** theatom06

## Import 

```js
import Factorial from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Math/TITLE';
```

## Code
```js
/**
 * Finds the factorial of a number
 * @param {number} n The number to find the factorial of.
 * @returns {number} The factorial of the number.
 * @example
 * factorial(5); // 120
 * @author theatom06
 */
export default function factorial(n) {
    if (n < 0) {
        throw new Error('factorial requires a non-negative number');
    }
    return n <= 1 ? 1 : n * factorial(n - 1);
}
```

## Parameters
* **n** - The number to find the factorial of.


## Returns
* **number** - The factorial of the number.


## Examples
```js
factorial(5); // 120

```
