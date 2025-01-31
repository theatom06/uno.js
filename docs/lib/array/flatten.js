/**
 * Flattens an array recursively.
 * @param {Array} array The array to flatten
 * @returns {Array} The flattened array
 * @example
 * flatten([1, [2, [3, [4]], 5]]) // [1, 2, 3, 4, 5]
 * @author theatom06    
 */
export default function flatten(array) {
    return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}