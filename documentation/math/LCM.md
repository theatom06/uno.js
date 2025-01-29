# LCM - Math
Find the LCM(Least Common Multiple) of two numbers

**Author:** theatom06

## Import 

```js
import LCM from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Math/LCM';
```

## Code
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

Hash: 4344079fbc94aca79fbb833f1f69fe3241834c37935a67ce261eee51820ecc4a