# Lt - Semver
Compares two version strings and returns true if the first version is less than the second.

**Author:** theatom06 node-semver

## Import 

```js
import Lt from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/Semver/TITLE';
```

## Code
```js
import semver from "./semver";

/**
 * Compares two version strings and returns true if the first version is less than the second.
 * @param {string} version1 The first version string. 
 * @param {string} version2 The second version string.
 * @returns {Boolean} `true` if the first version is less than the second, `false` otherwise.
 * @example
 * lt('1.2.3', '1.2.4'); // Output: true
 * @author theatom06 node-semver
 */
export default function lt(version1, version2){
    let v1 = semver(version1),
        v2 = semver(version2);

    if (v1.major !== v2.major) return v1.major < v2.major;
    if (v1.minor !== v2.minor) return v1.minor < v2.minor;
    if (v1.patch !== v2.patch) return v1.patch < v2.patch;

    // Check for preRelease tags
    if (v1.preRelease?.length || v2.preRelease?.length) {
        if (!v1.preRelease?.length) return false;
        if (!v2.preRelease?.length) return true;

        for (let i = 0; i < Math.max(v1.preRelease.length, v2.preRelease.length); i++) {
            const id1 = v1.preRelease[i];
            const id2 = v2.preRelease[i];

            if (id1 === undefined) return true;
            if (id2 === undefined) return false;

            if (id1 !== id2) {
                const isNum1 = /^\d+$/.test(id1);
                const isNum2 = /^\d+$/.test(id2);

                if (isNum1 && isNum2) {
                    return parseInt(id1, 10) < parseInt(id2, 10);
                } else if (isNum1 || isNum2) {
                    return isNum1;
                } else {
                    return id1 < id2;
                }
            }
        }
    }

    return false;
}
```

## Parameters
* **version1** - The first version string.
* **version2** - The second version string.


## Returns
* **Boolean** - `true` if the first version is less than the second, `false` otherwise.


## Examples
```js
lt('1.2.3', '1.2.4'); // Output: true

```
