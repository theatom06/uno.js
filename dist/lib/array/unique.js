/**
 * Removes all duplicates from a array
 * @param {Array} array The array to remove duplicates from
 * @returns {Array} The array without duplicates
 * @example
 * unique([1, 2, 2, 3, 4, 4, 5]); // [1, 2, 3, 4, 5]
 * @author theatom06
 */
export default function unique(array) {
    return [...new Set(array)];
}