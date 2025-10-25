import path from 'path';
import { readdir, stat, mkdir, copyFile } from "node:fs/promises";
import markdownit from 'markdown-it';
// @ts-ignore
import toc from 'markdown-it-table-of-contents';
// @ts-ignore
import sections from 'markdown-it-header-sections';
import anchor from 'markdown-it-anchor';

const libDir = path.join(import.meta.dir, '../lib'); // Path to the library source code
const docsDir = path.join(import.meta.dir, '../documentation'); // Path to the documentation store
const distDir = path.join(import.meta.dir, '../dist'); // Path to the distribution output
const distLibDir = path.join(distDir, 'lib'); // Path to the compiled library in dist
const distApiDir = path.join(distDir, 'api'); // Path to the API JSON in dist
const distDocsDir = path.join(distDir, 'docs'); // Path to the HTML documentation in dist
const templatesDir = path.join(import.meta.dir, './templates'); // Path to the templates directory
const websiteAssetsDir = path.join(import.meta.dir, './website-assets'); // Path to website assets

let folderStructure: Record<string, any> = {};
let apiData: Record<string, any> = {};

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║           Uno.js Documentation Generator v2.0           ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');
console.log('📦 Library directory:       ', libDir);
console.log('📄 Documentation directory: ', docsDir);
console.log('📦 Distribution directory:  ', distDir);
console.log('   ├── lib/                 (compiled code)');
console.log('   ├── api/                 (JSON API)');
console.log('   └── docs/                (HTML documentation)');
console.log('');

// Clean and recreate directories
try {
    console.log('🧹 Cleaning distribution directory...');
    await Bun.$`rm -rf ${distDir}`.quiet();
    await mkdir(distDir, { recursive: true });
    await mkdir(distLibDir, { recursive: true });
    await mkdir(distApiDir, { recursive: true });
    await mkdir(distDocsDir, { recursive: true });
    console.log('✓ Distribution directory ready\n');
} catch (error) {
    console.error('✗ Error cleaning dist directory:', error);
}

// Ensure API subdirectories exist
try {
    await mkdir(path.join(distApiDir, 'categories'), { recursive: true });
    await mkdir(path.join(distApiDir, 'functions'), { recursive: true });
} catch (error) {
    console.error('✗ Error creating API directory:', error);
}


const functionTemplate = await Bun.file(path.join(templatesDir, 'function.md')).text(); //Documentation template for functions
const constructTemplate = await Bun.file(path.join(templatesDir, 'construct.md')).text(); //Documentation template for constructs (classes)
const apiFunctionTemplate = await Bun.file(path.join(templatesDir, 'function.json')).text(); //API JSON template for functions
const apiCategoryTemplate = await Bun.file(path.join(templatesDir, 'category.json')).text(); //API JSON template for categories

// Copy all functions to dist and generate minified versions
async function copyToDistAndMinify(filePath: string, relativeFilePath: string) {
    const category = path.dirname(relativeFilePath);
    
    // Create category directory in dist
    const distCategoryDir = path.join(distLibDir, category);
    await mkdir(distCategoryDir, { recursive: true });
    
    // Copy original file to dist
    const distFilePath = path.join(distLibDir, relativeFilePath);
    await copyFile(filePath, distFilePath);
    console.log(`   📄 Copied: ${relativeFilePath}`);
    
    // Generate minified version in dist
    try {
        const buildResult = await Bun.build({
            entrypoints: [filePath],
            minify: true,
            outdir: distCategoryDir,
            naming: '[name].min.[ext]',
        });
        
        if (buildResult.success) console.log(`   ⚡ Minified: ${relativeFilePath.replace('.js', '.min.js')}`);
        else console.error(`   ✗ Minify failed for ${relativeFilePath}`);
    } catch (error) {
        console.error(`   ✗ Build error for ${relativeFilePath}:`, error);
    }
}

// Generate API JSON for a function
async function generateFunctionAPI(doc: Record<string, any>, filePath: string, relativeFilePath: string) {
    if (doc.kind === 'class') {
        return; // Skip classes for now
    }

    const category = path.dirname(relativeFilePath);
    const functionName = path.basename(relativeFilePath).replace('.js', '');
    const code = await Bun.file(filePath).text();
    const minCodePath = path.join(distLibDir, relativeFilePath.replace('.js', '.min.js'));
    let minCode = '';
    
    try {
        minCode = await Bun.file(minCodePath).text();
    } catch {
        minCode = 'Minified code not yet generated';
    }
    
    const timestamp = new Date().toISOString();
    
    let apiJson = apiFunctionTemplate
        .replaceAll('FUNCTION_NAME', functionName)
        .replaceAll('CATEGORY', category)
        .replace('DESCRIPTION', doc.description || 'No description')
        .replace('AUTHOR', doc.author || 'theatom06')
        .replace('CODE', JSON.stringify(code))
        .replace('MIN_CODE', JSON.stringify(minCode))
        .replace('TIMESTAMP', timestamp);
    
    // Handle params
    if (doc.params && doc.params.length > 0) {
        const paramsJson = JSON.stringify(doc.params.map((p: any) => ({
            name: p.name,
            type: p.type?.names?.[0] || 'any',
            description: p.description || ''
        })));
        apiJson = apiJson.replace('"PARAMS"', paramsJson);
    } else {
        apiJson = apiJson.replace('"PARAMS"', '[]');
    }
    
    // Handle returns
    if (doc.returns && doc.returns.length > 0) {
        const returnsJson = JSON.stringify(doc.returns.map((r: any) => ({
            type: r.type?.names?.[0] || 'any',
            description: r.description || ''
        })));
        apiJson = apiJson.replace('"RETURNS"', returnsJson);
    } else {
        apiJson = apiJson.replace('"RETURNS"', '[]');
    }
    
    // Handle examples
    if (doc.examples && doc.examples.length > 0) {
        const examplesJson = JSON.stringify(doc.examples);
        apiJson = apiJson.replace('"EXAMPLES"', examplesJson);
    } else {
        apiJson = apiJson.replace('"EXAMPLES"', '[]');
    }
    
    // Save individual function API
    const apiFunctionDir = path.join(distApiDir, 'functions', category);
    await mkdir(apiFunctionDir, { recursive: true });
    await Bun.file(path.join(apiFunctionDir, `${functionName}.json`)).write(apiJson);
    
    // Store for category API generation
    if (!apiData[category]) {
        apiData[category] = [];
    }
    
    apiData[category].push({
        name: functionName,
        description: doc.description || 'No description',
        file: `${functionName}.js`,
        minFile: `${functionName}.min.js`,
        docsUrl: `/docs/${category}/${functionName}.html`,
        cdnUrl: `https://uno.js.org/lib/${category}/${functionName}.js`,
        cdnMinUrl: `https://uno.js.org/lib/${category}/${functionName}.min.js`,
        params: doc.params?.map((p: any) => p.name).join(', ') || '',
        returns: doc.returns?.[0]?.type?.names?.[0] || '',
        examples: doc.examples?.[0] || ''
    });
}

// Handle function documentation generation
async function handleFunctions(doc: Record<string, any>, filePath: string) {
    const code = await Bun.file(filePath).text();
    const relativeFilePath = path.relative(libDir, filePath);

    const filename = path.basename(relativeFilePath).replace('.js', '');
    const filefolder = path.dirname(relativeFilePath);

    // Copy to dist and generate minified version
    await copyToDistAndMinify(filePath, relativeFilePath);
    
    // Generate API JSON
    await generateFunctionAPI(doc, filePath, relativeFilePath);

    let obj = {
        title: filename,
        filefolder: filefolder,
        description: doc.description,
        params: doc.params,
        returns: doc.returns,
        examples: doc.examples,
        author: doc.author,
        code: code
    }

    let md = functionTemplate
        .replace('TITLE', (obj.title.charAt(0).toUpperCase() + obj.title.slice(1)))
        .replaceAll('TITLE', obj.title)
        .replace('TYPE', obj.filefolder.charAt(0).toUpperCase() + obj.filefolder.slice(1))
        .replaceAll('TYPE', obj.filefolder)
        .replaceAll('DESCRIPTION', obj.description)
        .replaceAll('AUTHOR', obj.author)
        .replaceAll('CODE', obj.code)

    if (!obj.author) {
        md = md.replaceAll('AUTHOR', 'theatom06');
    }

    if (obj.params) {
        let params = '';
        obj.params.forEach((param: Record<string, string>) => {
            params += `* **${param.name}** - ${param.description}\n`;
        });
        md = md.replace('PARAMS', params);
    } else {
        md = md.replace('PARAMS', '').replace('## Parameters', '');
    }

    if (obj.returns) {
        let returns = '';
        obj.returns.forEach((ret: any) => {
            returns += `* **${ret.type.names[0]}** - ${ret.description}\n`;
        });
        md = md.replace('RETURNS', returns);
    } else {
        md = md.replace('RETURNS', '').replace('## Returns', '');
    }

    if (obj.examples) {
        let examples = '';
        obj.examples.forEach((example: string) => {
            examples += `${example}\n`;
        });
        md = md.replace('EXAMPLES', examples);
    }

    await Bun.file(path.join(docsDir, relativeFilePath.replace('.js', '.md'))).write(md);
    console.log(`   📝 Generated docs: ${relativeFilePath.replace('.js', '.md')}`);
}

// Handle construct (class) documentation generation
async function handleConstructs(doc: any, filePath: string) {
    const relativeFilePath = path.relative(libDir, filePath);
  
    if(relativeFilePath.endsWith('.min.js')){return;}
    
    // Copy to dist and generate minified version
    await copyToDistAndMinify(filePath, relativeFilePath);
    
    // Generate API JSON
    await generateFunctionAPI(doc, filePath, relativeFilePath);

    let md = constructTemplate

        .replace('TITLE', path.basename(relativeFilePath).replace('.js', '').charAt(0).toUpperCase() + path.basename(relativeFilePath).replace('.js', '').slice(1))
        .replaceAll('TITLE', path.basename(relativeFilePath).replace('.js', ''))
        .replace('TYPE', path.dirname(relativeFilePath).charAt(0).toUpperCase() + path.dirname(relativeFilePath).slice(1))
        .replaceAll('TYPE', path.dirname(relativeFilePath))
        .replaceAll('AUTHOR', 'theatom06')
        .replaceAll('DESCRIPTION', doc.description)

    let obj = {
        params: doc.params,
        returns: doc.returns,
        examples: doc.examples
    }

    if (obj.params) {
        let params = '';
        obj.params.forEach((param: Record<string, string>) => {
            params += `* **${param.name}** - ${param.description}\n`;
        });
        md = md.replace('PARAMS', params);
    } else {
        md = md.replace('PARAMS', '').replace('## Parameters', '');
    }

    if (obj.returns) {
        let returns = '';
        obj.returns.forEach((ret: any) => {
            returns += `* **${ret.type.names[0]}** - ${ret.description}\n`;
        });
        md = md.replace('RETURNS', returns);
    } else {
        md = md.replace('RETURNS', '').replace('## Returns', '');
    }

    if (obj.examples) {
        let examples = '';
        obj.examples.forEach((example: string) => {
            examples += `${example}\n`;
        });
        md = md.replace('EXAMPLES', examples);
    }

    try {
        const jsdoc = await Bun.$`bun x jsdoc2md ${filePath}`.text();

        md = md.replace('JSDOC2MDDOC', jsdoc);
        let temp = md.split('## ');
        temp.forEach((m, i) => {
            if (m.startsWith('Function')) {
                temp.splice(i, 1);
            }
        });

        md = temp.join('## ');

        await Bun.file(path.join(docsDir, relativeFilePath.replace('.js', '.md').replace('.min', ''))).write(md.replaceAll('.md', '.html'));
        console.log(`   📝 Generated docs: ${relativeFilePath.replace('.js', '.md')}`);

    } catch (error) {
        console.log(`   ✗ Error generating docs for ${filePath}: ${error}`);
    }
}

// Process a single file
async function processFile(relativeFilePath: string) {
    const filePath = path.join(libDir, relativeFilePath);
    if(filePath.endsWith('.min.js')) {
        return;
    }
    
    console.log(`\n📦 Processing: ${relativeFilePath}`);

    try {
        const jsdoc = await Bun.$`bun x jsdoc2md --json ${filePath}`.quiet().text();

        let doc = JSON.parse(jsdoc).find((d: any) => d.id === 'module.exports');

        if (!doc) {
            console.log(`   ⚠️  No documentation found (skipping)`);
            return;
        }

        if (!doc.kind) {
            doc.kind = 'function';
        }

        if (doc.kind == 'class') {
            await handleConstructs(doc, filePath);
        } else {
            await handleFunctions(doc, filePath);
        }

        folderStructure[path.dirname(relativeFilePath)].forEach((file: any) => {
            if (file.file == path.basename(relativeFilePath)) {
                file.description = JSON.parse(jsdoc)[0].description;
            }
        });
    } catch (error) {
        console.log(`   ✗ Error processing file: ${error}`);
    }
}

// Recursively process directories
async function processDir(dir: string) {
    const files = await readdir(dir);
    const relativePath = path.relative(libDir, dir);
    
    if (relativePath) {
        console.log(`\n📁 Category: ${relativePath}`);
    }

    if (await Bun.file(path.join(docsDir, relativePath)).exists() == false) {
        await Bun.$`mkdir -p ${path.join(docsDir, relativePath)}`.quiet();
    }

    if (relativePath != '')
        folderStructure[relativePath] = [];

    await Promise.all(files.map(async (file) => {
        const filePath = path.join(dir, file);
        const isDirectory = (await stat(filePath)).isDirectory();
        if (isDirectory) {
            await processDir(filePath);
        } else {
            if(file.endsWith('.min.js')){return;}
            await processFile(path.relative(libDir, filePath));
            folderStructure[relativePath].push({
                file: file,
                description: ''
            });
        }
    }));
}

console.log('═══════════════════════════════════════════════════════════');
console.log('🚀 Starting generation process...\n');

await processDir(libDir);

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📚 Generating category READMEs and APIs...\n');

await Promise.all(Object.keys(folderStructure).map(async folder => {
    // Generate README
    const readmeContent = `# ${folder.charAt(0).toUpperCase() + folder.slice(1)}\n\n` +
        `A set of functions related to ${folder}.\n\n` +
        `## Functions\n\n` +
        folderStructure[folder].map((file: any) => `* [**${file.file}**](./${file.file.replace('.js', '.md')})`).join('\n') + '\n';
    const readmePath = path.join(docsDir, folder, 'README.md');
    await Bun.file(readmePath).write(readmeContent);
    console.log(`   📄 Generated: ${folder}/README.md`);
    
    // Generate category API JSON
    if (apiData[folder] && apiData[folder].length > 0) {
        const timestamp = new Date().toISOString();
        const categoryJson = apiCategoryTemplate
            .replace('CATEGORY', folder)
            .replace('TITLE', folder.charAt(0).toUpperCase() + folder.slice(1))
            .replace('DESCRIPTION', `Functions related to ${folder}`)
            .replace('"COUNT"', apiData[folder].length.toString())
            .replace('TIMESTAMP', timestamp)
            .replace('"functions": [\n    {\n      "name": "FUNCTION_NAME",\n      "description": "FUNCTION_DESCRIPTION",\n      "file": "FUNCTION_NAME.js",\n      "minFile": "FUNCTION_NAME.min.js",\n      "docsUrl": "/docs/CATEGORY/FUNCTION_NAME.html",\n      "cdnUrl": "https://uno.js.org/lib/CATEGORY/FUNCTION_NAME.js",\n      "cdnMinUrl": "https://uno.js.org/lib/CATEGORY/FUNCTION_NAME.min.js",\n      "params": "PARAMS",\n      "returns": "RETURNS",\n      "examples": "EXAMPLES"\n    }\n  ]', JSON.stringify(apiData[folder], null, 2));
        
        await Bun.file(path.join(distApiDir, 'categories', `${folder}.json`)).write(categoryJson);
        console.log(`   🌐 Generated API: categories/${folder}.json`);
    }
}));

// Generate main API index
const categories = Object.keys(apiData).map(cat => ({
    id: cat,
    title: cat.charAt(0).toUpperCase() + cat.slice(1),
    file: `${cat}.json`,
    count: apiData[cat].length
}));

const indexJson = {
    name: "Uno.js",
    description: "A JS library that exports one function per file. This API provides a quick summary of categories and functions for the website.",
    categories: categories,
    generated: new Date().toISOString()
};

await Bun.file(path.join(distApiDir, 'index.json')).write(JSON.stringify(indexJson, null, 2));
console.log(`   🌐 Generated API: index.json\n`);

console.log('═══════════════════════════════════════════════════════════');
console.log('🌐 Generating HTML documentation...\n');
    
let md = markdownit();
md.use(anchor);
md.use(toc);
md.use(sections);

const template = await Bun.file(path.join(templatesDir, 'template.html')).text();

function makeFile(_md: string) {
    const section = md.render(_md.replace('.md', '.html'));
    return template.replace('WEBSITE', section);
}

async function _processFile(filePath: string, file: string) {
    if (file.endsWith('.md')) {
        const fileContent = await Bun.file(filePath).text();
        const html = makeFile(fileContent);
        let htmlPath = filePath.replace(docsDir, distDocsDir).replace('.md', '.html');
        htmlPath = htmlPath.replace('README', 'index');
        await Bun.write(htmlPath, html);
        console.log(`   📄 Generated HTML: ${path.relative(distDocsDir, htmlPath)}`);
        return;
    }

    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        const imgPath = Bun.file(filePath)
        await Bun.write(path.join(distDocsDir, file), imgPath);
        console.log(`   🖼️  Copied image: ${file}`);
        return;
    }
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📋 Copying website assets...\n');

// Copy all assets from website-assets to dist/docs
const assetsFiles = await readdir(websiteAssetsDir);
for (const file of assetsFiles) {
    const assetPath = path.join(websiteAssetsDir, file);
    const destPath = path.join(distDir, file);
    const stats = await stat(assetPath);
    
    if (stats.isDirectory()) {
        await Bun.$`cp -r ${assetPath} ${destPath}`.quiet();
        console.log(`   📁 Copied directory: ${file}/`);
    } else {
        await copyFile(assetPath, destPath);
        console.log(`   📄 Copied asset: ${file}`);
    }
}

await readdir(docsDir).then(async (files) => {
    for (const file of files) {
        const filePath = path.join(docsDir, file);
        const stats = await stat(filePath);

        if (stats.isDirectory()) {
            await mkdir(path.join(distDocsDir, file), { recursive: true });
            const dirFiles = await readdir(filePath);
            for (const dirFile of dirFiles) {
                await _processFile(path.join(filePath, dirFile), dirFile);
            }
        } else {
            await _processFile(filePath, file);
        }
    }
});

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║              ✨ Generation Complete! ✨                  ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');
console.log('📦 Distribution directory:', distDir);
console.log('   ├── lib/        (compiled + minified code)');
console.log('   ├── api/        (JSON API files)');
console.log('   └── docs/       (HTML documentation)');
console.log('');