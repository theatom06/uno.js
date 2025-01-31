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
 * Compares two version strings and returns true if the first version is greater than the second.
 * @param {string} version1 The first version string. 
 * @param {string} version2 The second version string.
 * @returns {Boolean} True if the first version is greater than the second, false otherwise.
 * @example
 * gt('1.2.3', '1.2.2'); // Output: true
 * @author theatom06 node-semver
 */
export default function gt(version1, version2){
    let v1 = semver(version1),
        v2 = semver(version2);

    if (v1.major !== v2.major) return v1.major > v2.major;
    if (v1.minor !== v2.minor) return v1.minor > v2.minor;
    if (v1.patch !== v2.patch) return v1.patch > v2.patch;

    // Check for preRelease tags
    if (v1.preRelease?.length || v2.preRelease?.length) {
        if (!v1.preRelease?.length) return true;
        if (!v2.preRelease?.length) return false;

        for (let i = 0; i < Math.max(v1.preRelease.length, v2.preRelease.length); i++) {
            const id1 = v1.preRelease[i];
            const id2 = v2.preRelease[i];

            if (id1 === undefined) return false;
            if (id2 === undefined) return true;

            if (id1 !== id2) {
                const isNum1 = /^\d+$/.test(id1);
                const isNum2 = /^\d+$/.test(id2);

                if (isNum1 && isNum2) {
                    return parseInt(id1, 10) > parseInt(id2, 10);
                } else if (isNum1 || isNum2) {
                    return isNum2;
                } else {
                    return id1 > id2;
                }
            }
        }
    }

    return false;
}