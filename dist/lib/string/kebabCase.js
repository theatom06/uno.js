/**
 * Convert a string to kebab case.
 * @param {string} str The string to convert.
 * @returns {string} The kebab cased string.
 * @example
 * kebabCase('fooBar'); // 'foo-bar'
 * @author theatom06
 */
export default function kebabCase(str) {
    return str.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}