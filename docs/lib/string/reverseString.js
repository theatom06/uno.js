/**
 * Reverse a string.
 * @param {string} str The string to reverse.
 * @returns {string} The reversed string.
 * @example
 * reverseString('hello'); // 'olleh'
 * @author theatom06
 */
export default function reverseString(str) {
    return str.split('').reverse().join('');
}