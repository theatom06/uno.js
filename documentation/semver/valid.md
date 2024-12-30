# Valid - Semver
Checks if a version string is a valid semver version.

**Author:** theatom06 node-semver

## Import 

```js
import Valid from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Semver/Valid';
```

## Code
```js
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
```

## Parameters
* **version** - The version string to check.


## Returns
* **Boolean** - `true` if the version is valid, `false` otherwise.


## Examples
```js
valid('1.2.3-alpha+build'); // Output: true

```
