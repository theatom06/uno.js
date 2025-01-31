# LCM - Math
Find the LCM(Least Common Multiple) of two numbers

**Author:** theatom06

## Table of Contents
[[toc]]

## Import 

```js
import LCM from 'https://uno.js.org/lib/math/LCM.js';
```
and compresed version
```js
import LCM from 'https://uno.js.org/lib/math/LCM.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Find the LCM(Least Common Multiple) of two numbers
 * @param {number} a first number
 * @param {number} b Second number
 * @returns {number} The LCM of the two numbers.
 * @example
 * LCM(12, 15) // 60
 * @author theatom06
 */
export default function LCM(a, b) {
    function gcd(a, b) {
        if (!b) return a;
        return gcd(b, a % b);
    }
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
LCM(12, 15) // 60

```