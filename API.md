# Uno.js API Documentation

The Uno.js API provides programmatic access to the library's metadata through JSON endpoints. This API is designed for building tools, documentation websites, IDE plugins, or any application that needs to discover and integrate Uno.js functions.

---

## 📍 API Base URL

All API endpoints are relative to:
```
https://uno.js.org/api/
```

For local development (after running `bun generator/index.ts`):
```
./dist/api/
```

---

## 🗂️ API Structure

The API consists of three main types of JSON files:

```
api/
├── index.json                    # Main index with all categories
├── categories/                   # Category summaries
│   ├── array.json
│   ├── date.json
│   ├── DOM.json
│   ├── math.json
│   ├── semver.json
│   └── string.json
└── functions/                    # Individual function metadata
    ├── array/
    │   ├── flatten.json
    │   ├── unique.json
    │   └── ...
    ├── math/
    │   ├── GCD.json
    │   ├── factorial.json
    │   └── ...
    └── [category]/
        └── [function].json
```

---

## 📋 API Endpoints

### 1. Main Index

**Endpoint**: `/api/index.json`

**Description**: Returns a list of all available categories with their counts.

**Response Schema**:
```typescript
{
  name: string;              // "Uno.js"
  description: string;       // Library description
  categories: Array<{
    id: string;              // Category identifier (e.g., "array")
    title: string;           // Display name (e.g., "Array")
    file: string;            // Category JSON filename
    count: number;           // Number of functions in category
  }>;
  generated: string;         // ISO 8601 timestamp
}
```

**Example Response**:
```json
{
  "name": "Uno.js",
  "description": "A JS library that exports one function per file. This API provides a quick summary of categories and functions for the website.",
  "categories": [
    {
      "id": "array",
      "title": "Array",
      "file": "array.json",
      "count": 7
    },
    {
      "id": "math",
      "title": "Math",
      "file": "math.json",
      "count": 5
    }
  ],
  "generated": "2025-10-25T11:38:30.385Z"
}
```

**Example Usage**:
```javascript
// Fetch all categories
const response = await fetch('https://uno.js.org/api/index.json');
const data = await response.json();

console.log(`Total categories: ${data.categories.length}`);
data.categories.forEach(cat => {
  console.log(`${cat.title}: ${cat.count} functions`);
});
```

---

### 2. Category Summary

**Endpoint**: `/api/categories/{category}.json`

**Description**: Returns summary information about a specific category.

**Parameters**:
- `{category}`: Category identifier (e.g., `array`, `math`, `string`)

**Response Schema**:
```typescript
{
  category: string;          // Category identifier
  description: string;       // Category description
  functions: Array<any>;     // Array of function summaries (currently empty)
  count: number;             // Number of functions
  generated: string;         // ISO 8601 timestamp
}
```

**Example Response**:
```json
{
  "category": "array",
  "description": "Functions related to array",
  "functions": [],
  "count": 7,
  "generated": "2025-10-25T11:38:30.381Z"
}
```

**Example Usage**:
```javascript
// Get info about the math category
const response = await fetch('https://uno.js.org/api/categories/math.json');
const category = await response.json();

console.log(`${category.category}: ${category.count} functions`);
console.log(category.description);
```

---

### 3. Function Details

**Endpoint**: `/api/functions/{category}/{function}.json`

**Description**: Returns complete metadata for a specific function.

**Parameters**:
- `{category}`: Category identifier
- `{function}`: Function name

**Response Schema**:
```typescript
{
  name: string;              // Function name
  category: string;          // Category identifier
  description: string;       // Function description
  author: string;            // Author name or handle
  file: string;              // Source filename
  minFile: string;           // Minified filename
  
  source: {
    github: string;          // GitHub source URL
    cdn: string;             // CDN URL (source)
    cdnMin: string;          // CDN URL (minified)
  };
  
  documentation: {
    markdown: string;        // Markdown docs URL
    html: string;            // HTML docs URL
  };
  
  params: Array<Array<{      // Function parameters
    name: string;
    type: string;
    description: string;
  }>>;
  
  returns: Array<Array<{     // Return value
    type: string;
    description: string;
  }>>;
  
  examples: Array<string>;   // Usage examples
  code: string;              // Full source code
  minCode: string;           // Minified code
  generated: string;         // ISO 8601 timestamp
}
```

**Example Response**:
```json
{
  "name": "flatten",
  "category": "array",
  "description": "Flattens an array recursively.",
  "author": "theatom06",
  "file": "flatten.js",
  "minFile": "flatten.min.js",
  
  "source": {
    "github": "https://github.com/theatom06/uno.js/blob/main/lib/array/flatten.js",
    "cdn": "https://cdn.jsdelivr.net/gh/theatom06/uno.js/dist/docs/lib/array/flatten.js",
    "cdnMin": "https://cdn.jsdelivr.net/gh/theatom06/uno.js/dist/docs/lib/array/flatten.min.js"
  },
  
  "documentation": {
    "markdown": "https://github.com/theatom06/uno.js/blob/main/documentation/array/flatten.md",
    "html": "https://uno.js.org/docs/array/flatten.html"
  },
  
  "params": [[
    {
      "name": "array",
      "type": "Array",
      "description": "The array to flatten"
    }
  ]],
  
  "returns": [[
    {
      "type": "Array",
      "description": "The flattened array"
    }
  ]],
  
  "examples": [
    "flatten([1, [2, [3, [4]], 5]]) // [1, 2, 3, 4, 5]"
  ],
  
  "code": "export default function flatten(array) {\n    return array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);\n}",
  
  "minCode": "function t(e){return e.reduce((a,r)=>Array.isArray(r)?a.concat(t(r)):a.concat(r),[])}export{t as default};\n",
  
  "generated": "2025-10-25T11:38:29.671Z"
}
```

**Example Usage**:
```javascript
// Get details for a specific function
const response = await fetch('https://uno.js.org/api/functions/array/flatten.json');
const func = await response.json();

console.log(`${func.name}: ${func.description}`);
console.log(`Import from: ${func.source.cdn}`);
console.log(`Example: ${func.examples[0]}`);
```

---

## 🔧 Common Use Cases

### 1. Build a Function Browser

```javascript
async function loadAllFunctions() {
  // Get the main index
  const index = await fetch('https://uno.js.org/api/index.json').then(r => r.json());
  
  // Load all functions for each category
  const allFunctions = [];
  
  for (const category of index.categories) {
    const categoryData = await fetch(`https://uno.js.org/api/categories/${category.id}.json`)
      .then(r => r.json());
    
    // Note: Currently category.functions is empty, so you need to list function files manually
    // Or parse from the documentation directory
    allFunctions.push({
      category: category.title,
      count: categoryData.count
    });
  }
  
  return allFunctions;
}
```

### 2. Create a Search Interface

```javascript
async function searchFunctions(query) {
  const index = await fetch('https://uno.js.org/api/index.json').then(r => r.json());
  const results = [];
  
  for (const category of index.categories) {
    // Load functions from this category
    // (Implementation depends on having a list of function names)
    const categoryFunctions = await loadCategoryFunctions(category.id);
    
    const matches = categoryFunctions.filter(func => 
      func.name.toLowerCase().includes(query.toLowerCase()) ||
      func.description.toLowerCase().includes(query.toLowerCase())
    );
    
    results.push(...matches);
  }
  
  return results;
}
```

### 3. Generate Import Statements

```javascript
async function generateImport(category, functionName) {
  const func = await fetch(`https://uno.js.org/api/functions/${category}/${functionName}.json`)
    .then(r => r.json());
  
  return {
    es6: `import ${func.name} from '${func.source.cdn}';`,
    es6min: `import ${func.name} from '${func.source.cdnMin}';`,
    github: func.source.github,
    docs: func.documentation.html
  };
}

// Usage
const imports = await generateImport('array', 'flatten');
console.log(imports.es6);
// => import flatten from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js/dist/docs/lib/array/flatten.js';
```

### 4. Build Documentation

```javascript
async function generateCategoryDocs(category) {
  const categoryData = await fetch(`https://uno.js.org/api/categories/${category}.json`)
    .then(r => r.json());
  
  let markdown = `# ${categoryData.category}\n\n`;
  markdown += `${categoryData.description}\n\n`;
  markdown += `Total functions: ${categoryData.count}\n\n`;
  
  // Load and document each function
  // (Implementation depends on having a list of function names)
  
  return markdown;
}
```

### 5. Validate Function Availability

```javascript
async function isFunctionAvailable(category, functionName) {
  try {
    const response = await fetch(
      `https://uno.js.org/api/functions/${category}/${functionName}.json`
    );
    return response.ok;
  } catch {
    return false;
  }
}

// Usage
if (await isFunctionAvailable('array', 'flatten')) {
  console.log('Function exists!');
}
```

---

## 📦 CDN Integration

Each function metadata includes multiple CDN URLs:

### Primary CDN (uno.js.org)
```javascript
// Source version
import func from 'https://uno.js.org/lib/category/function.js';

// Minified version
import func from 'https://uno.js.org/lib/category/function.min.js';
```

### JSDelivr CDN (GitHub Mirror)
```javascript
// Source version
import func from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js/dist/docs/lib/category/function.js';

// Minified version
import func from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js/dist/docs/lib/category/function.min.js';
```

### Versioned CDN (JSDelivr)
```javascript
// Specific version
import func from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@v1.0.0/dist/docs/lib/category/function.js';

// Latest version
import func from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@latest/dist/docs/lib/category/function.js';
```

---

## 🔄 API Generation

The API is automatically generated by the documentation generator (`generator/index.ts`). When you run:

```bash
bun generator/index.ts
```

The generator:
1. Parses JSDoc comments from source files in `lib/`
2. Extracts function metadata (params, returns, examples, etc.)
3. Generates JSON files in `dist/api/`
4. Creates source and minified versions in `dist/docs/lib/`

### API Generation Flow

```
lib/array/flatten.js
    ↓ [Parse JSDoc]
    ↓
dist/api/functions/array/flatten.json  ← Function metadata
dist/api/categories/array.json          ← Category summary
dist/api/index.json                     ← Main index
```

---

## 📝 API Schema Reference

### Timestamp Format
All `generated` fields use ISO 8601 format:
```
"2025-10-25T11:38:30.385Z"
```

### Parameter Schema
```typescript
{
  name: string;        // Parameter name
  type: string;        // JavaScript type (number, string, Array, etc.)
  description: string; // Human-readable description
}
```

### Return Value Schema
```typescript
{
  type: string;        // Return type
  description: string; // What the function returns
}
```

### Source URLs Schema
```typescript
{
  github: string;      // Raw source on GitHub
  cdn: string;         // CDN URL (source)
  cdnMin: string;      // CDN URL (minified)
}
```

---

## 🚀 Integration Examples

### React Hook for Loading Functions

```javascript
import { useState, useEffect } from 'react';

function useFunctionData(category, functionName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`https://uno.js.org/api/functions/${category}/${functionName}.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [category, functionName]);
  
  return { data, loading, error };
}

// Usage in component
function FunctionViewer({ category, name }) {
  const { data, loading, error } = useFunctionData(category, name);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h2>{data.name}</h2>
      <p>{data.description}</p>
      <code>{data.examples[0]}</code>
      <a href={data.source.cdn}>View Source</a>
    </div>
  );
}
```

### Node.js Script for Generating Documentation

```javascript
import fs from 'fs/promises';
import path from 'path';

async function downloadAPI() {
  const baseURL = 'https://uno.js.org/api';
  
  // Get main index
  const index = await fetch(`${baseURL}/index.json`).then(r => r.json());
  
  // Create API directory
  await fs.mkdir('./local-api', { recursive: true });
  
  // Save index
  await fs.writeFile(
    './local-api/index.json',
    JSON.stringify(index, null, 2)
  );
  
  // Download all categories
  for (const category of index.categories) {
    const categoryData = await fetch(`${baseURL}/categories/${category.id}.json`)
      .then(r => r.json());
    
    await fs.mkdir(`./local-api/categories`, { recursive: true });
    await fs.writeFile(
      `./local-api/categories/${category.id}.json`,
      JSON.stringify(categoryData, null, 2)
    );
  }
  
  console.log('API downloaded successfully!');
}

downloadAPI();
```

---

## 🛠️ Advanced Topics

### Caching Strategies

Since the API is static JSON, you can implement aggressive caching:

```javascript
const API_CACHE = new Map();

async function fetchWithCache(url) {
  if (API_CACHE.has(url)) {
    return API_CACHE.get(url);
  }
  
  const data = await fetch(url).then(r => r.json());
  API_CACHE.set(url, data);
  return data;
}
```

### Type Generation

Generate TypeScript types from API data:

```javascript
async function generateTypes(category, functionName) {
  const func = await fetch(`https://uno.js.org/api/functions/${category}/${functionName}.json`)
    .then(r => r.json());
  
  const params = func.params[0]?.map(p => `${p.name}: ${p.type}`).join(', ') || '';
  const returnType = func.returns[0]?.[0]?.type || 'void';
  
  return `export function ${func.name}(${params}): ${returnType};`;
}

// Usage
const types = await generateTypes('array', 'flatten');
console.log(types);
// => export function flatten(array: Array): Array;
```

---

## 📞 Support & Feedback

- **Issues**: Report API bugs or request features at [GitHub Issues](https://github.com/theatom06/uno.js/issues)
- **Discussions**: Ask questions at [GitHub Discussions](https://github.com/theatom06/uno.js/discussions)

---

## 📄 API Versioning

Currently, the API follows the library version. The `generated` timestamp in each JSON file indicates when it was last updated.

For production use, consider:
- Using versioned CDN URLs (JSDelivr supports version pinning)
- Caching API responses with appropriate TTL
- Monitoring the `generated` timestamp for updates

---

## 🔮 Future Enhancements

Planned improvements to the API:

- [ ] Include function list in category JSON (currently empty `functions` array)
- [ ] Add search endpoint for fuzzy function matching
- [ ] Provide minified API files for bandwidth optimization
- [ ] Add dependency information (which functions use other functions)
- [ ] Include performance benchmarks
- [ ] Add changelog/history for each function
- [ ] Support for multiple versions/tags

---

For the latest information, always refer to the [uno.js repository](https://github.com/theatom06/uno.js).
