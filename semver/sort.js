import lt from "./lt";
import gt from "./gt";

/**
 * Sorts an array of version strings in ascending order.
 * @param {string[]} versions An array of version strings. 
 * @param {Boolean} reverse Whether to sort the versions in descending order.
 * @returns {string[]} The sorted array of version strings.
 * @example
 * sort(['1.1.0', '1.0.0', '1.2.0']); // Output: ['1.0.0', '1.1.0', '1.2.0']
 * @author theatom06 node-semver
 */
export default function sort(versions, reverse = false){
    let sorted = versions.sort((a, b) => {
        if (lt(a, b)) return -1;
        if (gt(a, b)) return 1;
        return 0;
    });

    if (reverse) sorted.reverse();
    return sorted;
}