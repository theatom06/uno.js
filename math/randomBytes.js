/**
 * Generates cryptographically secure random bytes. Uses the Web Crypto API if available, otherwise falls back to Node.js.
 * @param {number} size The number of random bytes to generate.
 * @returns {Uint8Array} The random bytes.
 */
export default function secureRandomBytes(size) {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        const array = new Uint8Array(size);
        window.crypto.getRandomValues(array);
        return array;
    } else if (typeof require !== 'undefined') {
        const crypto = require('crypto');
        return crypto.randomBytes(size);
    } else {
        throw new Error('Secure random number generation is not supported in this environment.');
    }
}