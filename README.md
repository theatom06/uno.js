# Uno.js

[![Hack at Time](https://hackatime-badge.hackclub.com/U05J8AF58S1/uno.js)](https://hackatime-badge.hackclub.com/U05J8AF58S1/uno.js)

**A modular JavaScript utility library that exports one function per file — import exactly what you need, nothing more.**

Uno.js is designed for modern JavaScript applications where bundle size matters. Instead of importing an entire library, you can import individual utility functions directly via CDN or copy the source code. Every function is documented, minified, and available through multiple distribution channels.

---

## 🚀 Quick Start

Import any function directly from the CDN without installation:

```javascript
import flatten from 'https://uno.js.org/lib/array/flatten.js';

const nested = [1, [2, [3, [4]], 5]];
console.log(flatten(nested)); // [1, 2, 3, 4, 5]
```

### Import Pattern

```javascript
import FUNCTION_NAME from 'https://uno.js.org/lib/CATEGORY/FUNCTION_NAME.js';
```

Or use the minified version:
```javascript
import FUNCTION_NAME from 'https://uno.js.org/lib/CATEGORY/FUNCTION_NAME.min.js';
```

---

## 📚 Features

- **Zero Installation**: Import functions directly via CDN — no `npm install` required
- **Tree-Shakeable**: One function per file means you only load what you use
- **Fully Documented**: Auto-generated documentation from JSDoc comments, always up-to-date
- **Minified Versions**: Every function includes a `.min.js` version for production
- **TypeScript Support**: JSDoc comments provide type information for better IDE support
- **Programmatic API**: JSON API for building tools, websites, or integrations (see [API.md](./API.md))
- **Open Source**: Contribute new functions or improve existing ones

---

## 📂 Repository Structure

```
uno.js/
├── lib/                    # Source code (one function per file)
│   ├── array/              # Array utilities
│   ├── date/               # Date utilities
│   ├── DOM/                # DOM manipulation
│   ├── math/               # Mathematical functions
│   ├── semver/             # Semantic versioning
│   └── string/             # String utilities
│
├── generator/              # Documentation generator
│   ├── index.ts            # Main generator script
│   ├── templates/          # Templates for docs and API
│   └── website-assets/     # Static assets for docs site
│
├── documentation/          # Generated markdown documentation
│   └── [category]/         # Docs organized by category
│
├── dist/                   # Distribution output (generated)
│   ├── api/                # JSON API files
│   │   ├── index.json      # Main API index
│   │   ├── categories/     # Category summaries
│   │   └── functions/      # Individual function metadata
│   ├── docs/               # HTML documentation website
│   │   └── lib/            # Source + minified JS files
│   └── [assets]            # Website assets (CSS, JS, images)
│
└── website-dev/            # Development website (Vite)
```

### Key Directories

- **`lib/`**: Hand-written source code. Each function is a single file with JSDoc comments.
- **`generator/`**: TypeScript-based generator that processes `lib/` and produces distribution files, API JSON, and documentation.
- **`dist/`**: Generated output (not committed to Git in development, but published for production).
  - `dist/api/`: JSON API for programmatic access
  - `dist/docs/`: HTML documentation and library files
- **`documentation/`**: Auto-generated markdown documentation for each function.

---

## 🛠️ How It Works

Uno.js uses an automated documentation generator that:

1. **Scans** all JavaScript files in `lib/`
2. **Extracts** JSDoc metadata using `jsdoc2md`
3. **Generates**:
   - Markdown documentation (→ `documentation/`)
   - HTML documentation (→ `dist/docs/`)
   - JSON API files (→ `dist/api/`)
   - Minified versions of each function (→ `dist/docs/lib/`)
4. **Publishes** everything to the website and CDN

### Generator Workflow

```
lib/*.js  →  [generator/index.ts]  →  ├─ documentation/*.md
                                       ├─ dist/docs/*.html
                                       ├─ dist/api/*.json
                                       └─ dist/docs/lib/*.min.js
```

Run the generator:
```bash
bun install
bun generator/index.ts
```

---

## 📖 Documentation

- **Main Documentation**: [documentation/README.md](./documentation/README.md)
- **Live Website**: [uno.js.org](https://uno.js.org)
- **API Reference**: [API.md](./API.md) — Programmatic access to function metadata

### Available Categories

- [Array](./documentation/array/) — Array manipulation utilities
- [Date](./documentation/date/) — Date formatting and utilities
- [DOM](./documentation/DOM/) — DOM manipulation and helpers
- [Math](./documentation/math/) — Mathematical functions and constructs
- [String](./documentation/string/) — String processing utilities
- [Semver](./documentation/semver/) — Semantic version parsing and comparison

Each function includes:
- Description and purpose
- Parameter details with types
- Return value information
- Usage examples
- Source code
- CDN links

---

## 🌐 API Access

Uno.js provides a JSON API for programmatic access to library metadata. This is useful for:
- Building custom documentation websites
- Creating IDE plugins or tools
- Automating function discovery
- Integrating with other systems

See **[API.md](./API.md)** for complete API documentation, including:
- API structure and endpoints
- JSON schemas
- Usage examples
- CDN URLs

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. **Add a function**: Create a file at `lib/<category>/<functionName>.js`
2. **Write JSDoc**: Include `@param`, `@returns`, `@example`, and `@author` tags
3. **Test locally**: Run `bun generator/index.ts` to generate docs
4. **Submit PR**: Keep each PR focused on one function or feature

Example function template:
```javascript
/**
 * Adds two numbers.
 * @param {number} a First number
 * @param {number} b Second number
 * @returns {number} Sum of a and b
 * @example
 * add(2, 3) // => 5
 * @author yourname
 */
export default function add(a, b) {
    return a + b;
}
```

---

## 🔧 Development

### Prerequisites
- [Bun](https://bun.sh/) runtime (recommended)
- Node.js (alternative)

### Local Development

```bash
# Install dependencies
bun install

# Run the documentation generator
bun generator/index.ts

# Serve the documentation website locally
cd website-dev
bun install
bun run dev
```

### CI/CD

The repository uses GitHub Actions to automatically generate documentation:
- Workflow: `.github/workflows/genDoc.yaml`
- Trigger: Manual workflow dispatch or on push to main

---

## 📦 Distribution

Functions are distributed through multiple channels:

1. **CDN (Primary)**:
   - `https://uno.js.org/lib/<category>/<function>.js`
   - `https://uno.js.org/lib/<category>/<function>.min.js`

2. **JSDelivr CDN (Mirror)**:
   - `https://cdn.jsdelivr.net/gh/theatom06/uno.js/dist/docs/lib/<category>/<function>.js`

3. **Direct Copy**: Copy source from documentation pages

4. **API Access**: Use JSON API to discover and integrate functions programmatically

---

## 📄 License

ISC License - See LICENSE file for details

---

## 🙏 Credits

Maintained by [@theatom06](https://github.com/theatom06) and contributors.

Built with:
- [Bun](https://bun.sh/) - Fast JavaScript runtime
- [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) - JSDoc parser
- [markdown-it](https://github.com/markdown-it/markdown-it) - Markdown processor

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/theatom06/uno.js/issues)
- **Discussions**: [GitHub Discussions](https://github.com/theatom06/uno.js/discussions)
- **Website**: [uno.js.org](https://uno.js.org)