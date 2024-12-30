# Satisfies - Semver
Checks if a version satisfies a range.

**Author:** theatom06 node-semver

## Import 

```js
import Satisfies from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Semver/Satisfies';
```

## Code
```js
import semver from "./semver";

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
