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

## Why Uno.js?
- Uno.js is a JavaScript library that offers the convenience of exporting one function per file without the need for downloading the entire library.

- By exporting individual functions, Uno.js allows you to import only the specific functions you require, resulting in a smaller bundle size and improved code readability.

- The documentation for Uno.js is automatically generated from the source code, ensuring that it is always up to date. You can find the documentation in the `documentations` directory on the [GitHub Repository](https://github.com/theatom06/uno.js).

- It supports jsdoc comments, which makes it easier to understand the function's purpose and usage.

- Constructs, As of now Uno.js has two constructs [`Complex Number`](./math/complexNumber.md), [`Fraction`](./math/fraction.md) and [`Super Element`](./DOM/superElement.md). These constructs are used to represent complex numbers, fractions, and HTML elements respectively. Super Charge your code with these constructs.

## Documentation

The documentation for Uno.js is automatically generated from the source code, ensuring that it is always up to date. You can find the documentation in the `documentations` directory on the [GitHub Repository](https://github.com/theatom06/uno.js).

Each function has its own documentation, which includes the function's purpose, usage, and examples.

The functions are divided into the following categories for easy navigation:

- [Array](./array/README.md)
- [Date](./date/README.md)
- [DOM](./DOM/README.md)
- [Math](./math/README.md)
- [String](./string/README.md)
- [Semver](./semver/README.md)