# Satisfies - Semver
Checks if a version satisfies a range.

**Author:** theatom06 node-semver

## Import 

```js
import satisfies from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Semver/satisfies.js';
```
and compresed version
```js
import satisfies from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Semver/satisfies.min.js';
```

## Code
The raw code of the function is available here:
```js
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
 * Checks if a version satisfies a range.
 * @param {string} version The version to check
 * @param {string} rangeVersion The range to check against
 * @returns {Boolean} True if the version satisfies the range, false otherwise.
 * @example
 * satisfies('1.2.3', '>=1.2.3'); // Output
 * @author theatom06 node-semver
 */
export default function satisfies(version, rangeVersion) {
    let { major, minor, patch, preRelease, buildInfo } = semver(version);
    let { major: rangeMajor, minor: rangeMinor, patch: rangePatch, range } = semver(rangeVersion);


    switch (range) {
        case '=':
            return major === rangeMajor && minor === rangeMinor && patch === rangePatch;
        case '^':
            return major === rangeMajor && minor >= rangeMinor;
        case '>=':
            return major >= rangeMajor;
        case '<=':
            return major <= rangeMajor;
        default:
            return false;
    }
}
```

## Parameters
* **version** - The version to check
* **rangeVersion** - The range to check against


## Returns
* **Boolean** - True if the version satisfies the range, false otherwise.


## Examples
```js
satisfies('1.2.3', '>=1.2.3'); // Output

```