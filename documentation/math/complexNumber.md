# ComplexNumber - Math
Creates an instance of complexNumber.

**Author:** undefined


## Code
```js
/**
 * A constructor for dealing with omplex number.
 * @example
 * let z = new complexNumber(3, 4);
 * let x = complexNumber.fromString('3 + 4i');
 * let y = z.add(x);
 * console.log(y.toPolar().toString());
 * @author theatom06
 */
class complexNumber {
    /**
     * Creates an instance of complexNumber.
     * @param {number} real The real part of the complex number.
     * @param {number} imaginary The imaginary part of the complex number.
     * @example
     * let z = new complexNumber(3, 4);
     */
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    /**
     * Adds two complex numbers.
     * @param {complexNumber} other The other complex number to add.
     * @returns {complexNumber} The sum of the two complex numbers.
     * @example
     * new complexNumber(3, 4).add(new complexNumber(1, 2)); // 4 + 6i
    */
    add(other) {
        return new complexNumber(
            this.real + other.real,
            this.imaginary + other.imaginary
        );
    }

    /**
     * Subtracts two complex numbers.
     * @param {complexNumber} other The other complex number to be subtraced.
     * @returns {complexNumber} The diffrence of the two complex numbers.
     * @example
     * new complexNumber(3, 4).subtract(new complexNumber(1, 2)); // 2 + 2i
    */
    subtract(other) {
        return new complexNumber(
            this.real - other.real,
            this.imaginary - other.imaginary
        );
    }

    /**
     * Multiplies two complex numbers.
     * @param {complexNumber} other The other complex number to be multiplied.
     * @returns {complexNumber} The product of the two complex numbers.
     * @example
     * new complexNumber(3, 4).multiply(new complexNumber(2, 0)); // 6 + 8i
     */
    multiply(other) {
        return new complexNumber(
            this.real * other.real - this.imaginary * other.imaginary,
            this.real * other.imaginary + this.imaginary * other.real
        );
    }

    /**
     * Divides two complex numbers.
     * @param {complexNumber} other The other complex number to be divided.
     * @returns {complexNumber} The quotient of the two complex numbers.
     * @example
     * new complexNumber(3, 4).divide(new complexNumber(2, 0)); // 1.5 + 2i
     */
    divide(other) {
        const denominator = other.real ** 2 + other.imaginary ** 2;
        return new complexNumber(
            (this.real * other.real + this.imaginary * other.imaginary) / denominator,
            (this.imaginary * other.real - this.real * other.imaginary) / denominator
        );
    }

    /**
     * Returns a string representation of the complex number.
     * @returns {string} The string representation of the complex number.
     * @example
     * new complexNumber(3, 4).toString(); // 3 + 4i
     */
    toString() {
        let sign = (this.imaginary < 0)? "-" : "+";
        let i = (this.imaginary < 0)? (this.imaginary * -1) : this.imaginary;
        return `${this.real} ${sign} ${(i === 1)? '' : i }i`;
    }

    /**
     * Converts the complex number to polar form.
     * @returns {complexNumber} The polar form of the complex number.
     * @example 
     * new complexNumber(3, 4).toPolar(); // 5 + 0.9272952180016122i
     */
    toPolar() {
        let r = Math.sqrt(this.real ** 2 + this.imaginary ** 2);
        let theta = Math.atan(this.imaginary / this.real);
        return new complexNumber(r, theta);
    }

    /**
     * Creates a complex number from polar coordinates.
     * @param {number} r The magnitude of the complex number.
     * @param {number} theta The angle of the complex number.
     * @returns {complexNumber} The complex number.
     * @example
     * complexNumber.fromPolar(5, Math.PI / 3); // 2.5 + 4.330127018922194i
     */
    static fromPolar(r, theta) {
        return new complexNumber(
            r * Math.cos(theta),
            r * Math.sin(theta)
        );
    }

    /**
     * Creates a complex number from a string.
     * @param {string} str The string representation of the complex number.
     * @returns {complexNumber} The complex number.
     * @example
     * complexNumber.fromString('3 + 4i'); // 3 + 4i
     */
    static fromString(str) {
        let parts = str.split(' ');
        let real = parseFloat(parts[0]);
        if(parts[2] == 'i')
            return new complexNumber(real, 1);
        
        let imaginary = parseFloat(parts[2]);
        if (parts[1] === '-')
            imaginary = -imaginary;
        return new complexNumber(real, imaginary);
    }
}
```

## Parameters
* **real** - The real part of the complex number.
* **imaginary** - The imaginary part of the complex number.





## Examples
```js
let z = new complexNumber(3, 4);
let x = complexNumber.fromString('3 + 4i');
let y = z.add(x);
console.log(y.toPolar().toString());

```
