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
 * Increments a version string based on the release type.
 * @param {string} version The version string to increment.
 * @param {'major' | 'minor' | 'patch' } release The type of release to increment.
 * @returns {String} The incremented version string.
 * @example
 * inc('1.2.3', 'major'); // Output: '2.0.0'
 * @author theatom06 node-semver
 */
export default function inc(version, release){
    let v = semver(version);
    switch(release){
        case 'major':
            v.major++;
            v.minor = 0;
            v.patch = 0;
            break;
        case 'minor':
            v.minor++;
            v.patch = 0;
            break;
        case 'patch':
            v.patch++;
            break;
        default:
            throw new Error('Invalid release type');
    }
    return `${v.major}.${v.minor}.${v.patch}${v.preRelease ? '-' + v.preRelease : ''}${v.buildInfo ? '+' + v.buildInfo : ''}`;
}