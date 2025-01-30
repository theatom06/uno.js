function semver(version) {
    let metadata = {
        version,
        major: null,
        minor: null,
        patch: null,
        preRelease: null,
        buildInfo: null,
        range: '='
    };

    if (version.includes('+')) [version, metadata.buildInfo] = version.split('+');

    if (version.includes('-')) [version, metadata.preRelease] = version.split('-');

    const parseVersion = (ver) => ver.split('.').map(num => isNaN(Number(num)) ? null : Number(num));

    if (version.startsWith('^')) {
        metadata.range = '^';
        version = version.slice(1);
    } else if (version.startsWith('>=')) {
        metadata.range = '>=';
        version = version.slice(2);
    } else if (version.startsWith('<=')) {
        metadata.range = '<=';
        version = version.slice(2);
    }

    [metadata.major, metadata.minor, metadata.patch] = parseVersion(version);

    return metadata;
}

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