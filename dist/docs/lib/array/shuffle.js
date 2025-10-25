/**
 * Shuffles an array randomly
 * @param {any[]} array The array to shuffle
 * @returns {any[]} The shuffled array
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 2, 5, 1, 4]
 * @author theatom06
 */
export default function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}