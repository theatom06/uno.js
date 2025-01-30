# ComplexNumber - Math
A constructor for dealing with omplex number.

**Author:** theatom06

## Import

```js
import ComplexNumber from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Math/ComplexNumber.js';
```
and compresed version
```js
import ComplexNumber from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Math/ComplexNumber.min.js';
```

## Code
This is a construct so the code is too long to be displayed here.
If you want to see the code, you can check it [here](https://github.com/theatom06/uno.js/blob/main/lib/Math/ComplexNumber.js).

## add(other) ⇒ <code>complexNumber</code>
Adds two complex numbers.

**Kind**: global function  
**Returns**: <code>complexNumber</code> - The sum of the two complex numbers.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>complexNumber</code> | The other complex number to add. |

**Example**  
```js
new complexNumber(3, 4).add(new complexNumber(1, 2)); // 4 + 6i
```
<a name="subtract"></a>

## subtract(other) ⇒ <code>complexNumber</code>
Subtracts two complex numbers.

**Kind**: global function  
**Returns**: <code>complexNumber</code> - The diffrence of the two complex numbers.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>complexNumber</code> | The other complex number to be subtraced. |

**Example**  
```js
new complexNumber(3, 4).subtract(new complexNumber(1, 2)); // 2 + 2i
```
<a name="multiply"></a>

## multiply(other) ⇒ <code>complexNumber</code>
Multiplies two complex numbers.

**Kind**: global function  
**Returns**: <code>complexNumber</code> - The product of the two complex numbers.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>complexNumber</code> | The other complex number to be multiplied. |

**Example**  
```js
new complexNumber(3, 4).multiply(new complexNumber(2, 0)); // 6 + 8i
```
<a name="divide"></a>

## divide(other) ⇒ <code>complexNumber</code>
Divides two complex numbers.

**Kind**: global function  
**Returns**: <code>complexNumber</code> - The quotient of the two complex numbers.  

| Param | Type | Description |
| --- | --- | --- |
| other | <code>complexNumber</code> | The other complex number to be divided. |

**Example**  
```js
new complexNumber(3, 4).divide(new complexNumber(2, 0)); // 1.5 + 2i
```
<a name="toString"></a>

## toString() ⇒ <code>string</code>
Returns a string representation of the complex number.

**Kind**: global function  
**Returns**: <code>string</code> - The string representation of the complex number.  
**Example**  
```js
new complexNumber(3, 4).toString(); // 3 + 4i
```
<a name="toPolar"></a>

## toPolar() ⇒ <code>complexNumber</code>
Converts the complex number to polar form.

**Kind**: global function  
**Returns**: <code>complexNumber</code> - The polar form of the complex number.  
**Example**  
```js
new complexNumber(3, 4).toPolar(); // 5 + 0.9272952180016122i
```
<a name="fromPolar"></a>

## fromPolar(r, theta) ⇒ <code>complexNumber</code>
Creates a complex number from polar coordinates.

**Kind**: global function  
**Returns**: <code>complexNumber</code> - The complex number.  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> | The magnitude of the complex number. |
| theta | <code>number</code> | The angle of the complex number. |

**Example**  
```js
complexNumber.fromPolar(5, Math.PI / 3); // 2.5 + 4.330127018922194i
```
<a name="fromString"></a>

## fromString(str) ⇒ <code>complexNumber</code>
Creates a complex number from a string.

**Kind**: global function  
**Returns**: <code>complexNumber</code> - The complex number.  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | The string representation of the complex number. |

**Example**  
```js
complexNumber.fromString('3 + 4i'); // 3 + 4i
```
Z