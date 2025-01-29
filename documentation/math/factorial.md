# Factorial - Math
Finds the factorial of a number

**Author:** theatom06

## Import 

```js
import factorial from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Math/factorial';
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

Hash: bc1baea395d6a569d528bf805c431b94a5eb12224c30f7e593004c8ccafed2ef