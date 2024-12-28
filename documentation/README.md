<p align="center">
    <img src="./uno.png" alt="Uno.js Logo" />
</p>

# Uno.js

A JS library that exports one function per file, which doesn't even need to be downloaded.

## Installation

You don't need to install anything. Just import the function you need via a CDN.

For example, to import the `fromEmmet` function, you can use the following code:

```js
import fromEmmet from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/DOM/fromEmmet.js';
```

The Syntax for importing any FUNCTION of any TYPE is as follows:
```js
import FUNCTION from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/TYPE/FUNCTION';
```

**Don't want to use a CDN?** You can head over to our Documentation of that function and copy the code from there. 

## Functions Types

- [Array](./array/README.md)
- [Date](./date/README.md)
- [DOM](./DOM/README.md)
- [Math](./math/README.md)
- [String](./string/README.md)
- [Semver](./semver/README.md)