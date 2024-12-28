# LCM - Math
Find the LCM(Least Common Multiple) of two numbers

**Author:** undefined


## Code
```js
function gcd(a, b) {
    if (!b) return a;
    return gcd(b, a % b);
}

/**
 * Find the LCM(Least Common Multiple) of two numbers
 * @param {number} a first number
 * @param {number} b Second number
 * @returns {number} The LCM of the two numbers.
 */
export default function LCM(a, b) {
    return (a * b) / gcd(a, b);
}
```

## Parameters
* **a** - first number
* **b** - Second number


## Returns
* **number** - The LCM of the two numbers.


## Examples
```js
EXAMPLES
```
