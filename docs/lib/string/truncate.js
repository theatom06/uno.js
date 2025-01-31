/**
 * Truncate a string to a certain length and add '...' to the end
 * @param {string} str The string to truncate.
 * @param {length} length The length of the truncated string.
 * @param {string} end default is '...'
 * @returns {string} The truncated string.
 * @example
 * truncate('The quick brown fox jumps over the lazy dog', 20); // 'The quick brown fox...'
 * @author theatom06
 */
export default function truncate(str, length, end = '...') {
    return str.length > length ? str.slice(0, length) + end : str;
}