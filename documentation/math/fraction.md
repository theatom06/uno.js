# Fraction - Math
A constructor for dealing with fractions.

**Author:** theatom06

## Import

```js
import fraction from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/math/fraction.js';
```
and compresed version
```js
import fraction from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/math/fraction.min.js';
```

## Code
This is a construct so the code is too long to be displayed here.
If you want to see the code, you can check it [here](https://github.com/theatom06/uno.js/blob/main/lib/math/fraction.js).

## simplify() ⇒ <code>fraction</code>
Simplifies the fraction.

**Kind**: global function  
**Returns**: <code>fraction</code> - The simplified fraction.  
**Example**  
```js
new fraction(6, 8).simplify(); // 3/4
```
<a name="add"></a>

## add(other) ⇒ <code>fraction</code>
Adds two fractions.

**Kind**: global function  
**Returns**: <code>fraction</code> - The sum of the two fractions.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>fraction</code> | The other fraction to add. |

**Example**  
```js
new fraction(3, 4).add(new fraction(1, 2)); // 5/4
```
<a name="subtract"></a>

## subtract(other) ⇒ <code>fraction</code>
Subtracts two fractions.

**Kind**: global function  
**Returns**: <code>fraction</code> - The difference of the two fractions.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>fraction</code> | The other fraction to subtract. |

**Example**  
```js
new fraction(3, 4).subtract(new fraction(1, 2)); // 1/4
```
<a name="multiply"></a>

## multiply(other) ⇒ <code>fraction</code>
Multiplies two fractions.

**Kind**: global function  
**Returns**: <code>fraction</code> - The product of the two fractions.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>fraction</code> | The other fraction to multiply. |

**Example**  
```js
new fraction(3, 4).multiply(new fraction(1, 2)); // 3/8
```
<a name="divide"></a>

## divide(other) ⇒ <code>fraction</code>
Divides two fractions.

**Kind**: global function  
**Returns**: <code>fraction</code> - The quotient of the two fractions.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>fraction</code> | The other fraction to divide. |

**Example**  
```js
new fraction(3, 4).divide(new fraction(1, 2)); // 3/2
```
<a name="toString"></a>

## toString() ⇒ <code>string</code>
Returns a string representation of the fraction.

**Kind**: global function  
**Returns**: <code>string</code> - The string representation of the fraction.  
**Example**  
```js
new fraction(3, 4).toString(); // 3/4
```
<a name="fromString"></a>

## fromString(str) ⇒ <code>fraction</code>
Creates a fraction from a string.

**Kind**: global function  
**Returns**: <code>fraction</code> - The fraction created from the string.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string representation of the fraction. |

**Example**  
```js
fraction.fromString('3/4'); // 3/4
```
Z