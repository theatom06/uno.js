/**
 * Creates a union of arrays
 * @param  {...any[]} arrays The arrays to combine
 * @returns {any[]}  Returns the new array of combined values
 */
export default function union(...arrays){
    return [...new Set(arrays.flat())];
}