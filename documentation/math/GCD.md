# GCD - Math
Find the GCD(Greatest Common Divisor) of two numbers

**Author:** theatom06


## Code
```js
/**
 * Find the GCD(Greatest Common Divisor) of two numbers
 * @param {number} a First number
 * @param {number} b First number
 * @returns {number} The GCD of the two numbers.
 * @example
 * GCD(12, 8); // 4
 * @author theatom06
 */
export default function GCD(a, b) {
    if (b === 0) {
        return a;
    }
    return GCD(b, a % b);
}
```

## Parameters
* **a** - First number
* **b** - First number


## Returns
* **number** - The GCD of the two numbers.


## Examples
```js
GCD(12, 8); // 4

```
