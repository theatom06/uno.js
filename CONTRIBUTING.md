# Contributing to Uno.js

Thanks for helping improve Uno.js. This document describes the minimal, low-risk workflow and conventions used by this repository so contributors and reviewers stay consistent.

## Quick rules

- One function per file: place each function at lib/<category>/<name>.js and export a single default function.
- Do not edit generated or minified files (those ending with .min.js) — they are produced by the documentation generator.

## JSDoc requirements (mandatory)

Place a JSDoc block immediately above the exported function. Required items:
- First line: a short description sentence.
- @param for every parameter: type, name, brief description.
- @returns when the function returns a value: type and brief description.
- @example showing usage and expected output (e.g. // => result).
- @author (name or GitHub handle/email).

Example:
```js
/**
 * Adds two numbers.
 * @param {number} a First addend.
 * @param {number} b Second addend.
 * @returns {number} Sum of a and b.
 * @example
 * add(1, 2) // => 3
 * @author Jane Doe
 */
export default function add(a, b) {
    return a + b;
}
```

## How to add or change a function

1. Create the file: lib/<category>/<functionName>.js
2. Export a default function and include a complete JSDoc block (see above).
3. Keep each PR focused to one function or one whole type change when possible.

Template:
```js
/**
 * Short description.
 * @param {Type} name Description.
 * @returns {Type} Description.
 * @example
 * yourFunction(1) // => example
 */
export default function yourFunction(...) {
    // implementation
}
```

## Regenerate docs locally

This repo uses Bun in CI. From the repo root:
```bash
# ensure Bun is installed
bun install
# run the generator
bun genDoc/index.ts
```
Or from inside genDoc:
```bash
cd genDoc
bun install
bun genDoc/index.ts
```

## What the generator does

- Scans lib/ and runs bun x jsdoc2md --json to extract documentation.
- Writes markdown to documentation/ and builds HTML into docs/docs/ using templates in genDoc/.
- Produces minified .min.js files next to sources using Bun.build.

If documentation entries are missing, run:
```bash
bun x jsdoc2md --json path/to/file.js
```
and inspect the output for an entry with id === 'module.exports'.

## Website API

A small static API lives under website-dev/public/api/ (JSON summaries of categories & functions). Keep these files updated if you add/remove many functions.

## Testing and CI

CI runs doc generation via .github/workflows/genDoc.yaml (workflow_dispatch). A PR-triggered workflow can be added later if needed.

## Notes for reviewers

- Keep diffs in lib/ focused to one function per PR.
- If you modify doc templates, update genDoc/functionTemplate.md or genDoc/constructTemplate.md accordingly.

If you need help adding an example, automating API generation, or have questions about the generator, open an issue and tag it docs.
