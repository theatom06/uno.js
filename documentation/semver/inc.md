# Inc - Semver
Increments a version string based on the release type.

**Author:** theatom06 node-semver


## Code
```js
import semver from "./semver";

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
```

## Parameters
* **version** - The version string to increment.
* **release** - The type of release to increment.


## Returns
* **String** - The incremented version string.


## Examples
```js
inc('1.2.3', 'major'); // Output: '2.0.0'

```
