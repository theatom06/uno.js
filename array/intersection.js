/**
 * Finds the intersection between two arra
 * @param  {...any[]} arrays The arrays to compare
 * @returns {any[]} The intersection between the arrays
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 * @author theatom06
 */
export default function intersection(...arrays){
    let result = []
    arrays[0].forEach(e => {
        if(arrays.every(a => a.includes(e)))
            result.add(e);
    });
    return result;
}