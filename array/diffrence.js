/**
 * Returns the difference between two or more arrays.
 * @param  {...any[]} arrays The arrays to compare
 * @returns {any[]} The difference between the arrays
 * @example
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 * @author theatom06
 */
export default function difference(...arrays){
    return arrays.reduce((a, b) => a.filter(c => !b.includes(c)));
}