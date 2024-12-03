import semver from './semver.js';

/**
 * Checks if a version string is a valid semver version.
 * @param {string} version The version string to check. 
 * @returns {Boolean} `true` if the version is valid, `false` otherwise.
 * @example
 * valid('1.2.3-alpha+build'); // Output: true
 * @author theatom06 node-semver
 */
export default function valid(version){
    let regex = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/);
    return regex.test(version);
}