# Semver - Semver
Parses a version string and returns metadata about its components.

**Author:** theatom06 node-semver

## Table of Contents
[[toc]]

## Import 

```js
import semver from 'https://uno.js.org/lib/semver/semver.js';
```
and compresed version
```js
import semver from 'https://uno.js.org/lib/semver/semver.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Parses a version string and returns metadata about its components.
 *
 * @param {string} version - The version string to parse.
 * @example
 * semver('1.2.3-alpha+001'); // Output: { major: 1, minor: 2, patch: 3, preRelease: 'alpha', buildInfo: '001' }
 * @returns {Semver} An object containing metadata about the version.
 * @author theatom06 node-semver
 */

export default function semver(version) {
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
```

## Parameters
* **version** - The version string to parse.


## Returns
* **Semver** - An object containing metadata about the version.


## Examples
```js
semver('1.2.3-alpha+001'); // Output: { major: 1, minor: 2, patch: 3, preRelease: 'alpha', buildInfo: '001' }

```