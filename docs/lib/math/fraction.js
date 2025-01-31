/**
 * @class
 * A constructor for dealing with fractions.
 * @param {number} numerator The numerator of the fraction.
 * @param {number} denominator The denominator of the fraction.
 * @param {boolean} simplify Whether to simplify the fraction or not.
 * @example
 * let z = new fraction(3, 4);
 * @author theatom06
 */
export default class fraction {
    /**
     * Creates an instance of fraction.
     * @param {number} numerator The numerator of the fraction.
     * @param {number} denominator The denominator of the fraction.
     * @param {boolean} simplify Whether to simplify the fraction or not.
     * @example
     * let z = new fraction(3, 4);
     */
    constructor(numerator, denominator = 1, simplify = true) {
        this.numerator = numerator;
        this.denominator = denominator;
        this.simplify = simplify;
    }

    /**
     * Simplifies the fraction.
     * @returns {fraction} The simplified fraction.
     * @example
     * new fraction(6, 8).simplify(); // 3/4
     */
    simplify() {
        function gcd(a, b) {
            if (!b) return a;
            return gcd(b, a % b);
        }

        let divisor = gcd(this.numerator, this.denominator);
        return new fraction(
            this.numerator / divisor,
            this.denominator / divisor
        );
    }

    /**
     * Adds two fractions.
     * @param {fraction} other The other fraction to add.
     * @returns {fraction} The sum of the two fractions.
     * @example
     * new fraction(3, 4).add(new fraction(1, 2)); // 5/4
     */
    add(other) {
        function LCM(a, b) {
            function gcd(a, b) {
                if (!b) return a;
                return gcd(b, a % b);
            }
            return (a * b) / gcd(a, b);
        }

        let lcm = LCM(this.denominator, other.denominator);
        let num1 = lcm / this.denominator;
        let num2 = lcm / other.denominator;
        let f =  new fraction(
            this.numerator * num1 + other.numerator * num2,
            lcm
        );

        if (f.simplify) {
            return f.simplify();
        } else {
            return f;
        }
    }

    /**
     * Subtracts two fractions.
     * @param {fraction} other The other fraction to subtract.
     * @returns {fraction} The difference of the two fractions.
     * @example
     * new fraction(3, 4).subtract(new fraction(1, 2)); // 1/4
     */
    subtract(other) {
        function LCM(a, b) {
            function gcd(a, b) {
                if (!b) return a;
                return gcd(b, a % b);
            }
            return (a * b) / gcd(a, b);
        }

        let lcm = LCM(this.denominator, other.denominator);
        let num1 = lcm / this.denominator;
        let num2 = lcm / other.denominator;
        let f = new fraction(
            this.numerator * num1 - other.numerator * num2,
            lcm
        );

        if (f.simplify) {
            return f.simplify();
        } else {
            return f;
        }
    }

    /**
     * Multiplies two fractions.
     * @param {fraction} other The other fraction to multiply.
     * @returns {fraction} The product of the two fractions.
     * @example
     * new fraction(3, 4).multiply(new fraction(1, 2)); // 3/8
     */
    multiply(other) {
        let f = new fraction(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );

        if (f.simplify) {
            return f.simplify();
        } else {
            return f;
        }
    }



    /**
     * Divides two fractions.
     * @param {fraction} other The other fraction to divide.
     * @returns {fraction} The quotient of the two fractions.
     * @example
     * new fraction(3, 4).divide(new fraction(1, 2)); // 3/2
     */
    divide(other) {
        let f =  new fraction(
            this.numerator * other.denominator,
            this.denominator * other.numerator
        );

        if (f.simplify) {
            return f.simplify();
        } else {
            return f;
        }
    }

    /**
     * Returns a string representation of the fraction.
     * @returns {string} The string representation of the fraction.
     * @example
     * new fraction(3, 4).toString(); // 3/4
     */
    toString() {
        if (this.simplify) {
            return this.simplify().toString();
        }
        return `${this.numerator}/${this.denominator}`;
    }


    /**
     * Creates a fraction from a string.
     * @param {string} str The string representation of the fraction.
     * @returns {fraction} The fraction created from the string.
     * @example
     * fraction.fromString('3/4'); // 3/4
     */
    static fromString(str, simplify = true) {
        if (!str.includes('/')) {
            throw new Error('Invalid fraction');
        }
        
        let [numerator, denominator] = str.split('/').map(Number);
        if (simplify) {
            return new fraction(numerator, denominator).simplify();
        }
        return new fraction(numerator, denominator);
    }
}