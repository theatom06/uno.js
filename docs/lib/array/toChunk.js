/**
 * Splits an array into chunks of a specified size.
 * @param {any[]} array
 * @param {number} size
 * @returns {any[][]}
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * @author theatom06
 */
export default function chunk(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}