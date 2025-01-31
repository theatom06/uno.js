import randomBytes from './randomBytes.js';

/**
 * Generates a cryptographically secure random integer in the range [min, max).
 * @param {number} min the minimum value, inclusive.
 * @param {number} max the maximum value, exclusive.
 * @returns {number} The random integer.
 * @example
 * randomInt(1, 10); // => 4
 * @author theatom06
 */
export default function randomInt(min, max) {
    const range = max - min;
    if (range <= 0) {
        throw new Error('The max value must be greater than the min value.');
    }

    const randomBytes = randomBytes(4);
    const randomInt = new DataView(randomBytes.buffer).getUint32(0, true);
    return min + (randomInt % range);
}