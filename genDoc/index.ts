import path from 'path';
import { readdir, stat } from "node:fs/promises";

const libDir = path.join(import.meta.dir, '../lib');
const docsDir = path.join(import.meta.dir, '../documentation');
const workspaceDir = path.join(import.meta.dir, './');
let folderStructure: Record<string, any> = {};

console.log('Uno.js Documentation Generator');
console.log('Version: 1.0.0');
console.log('Author: theatom06');
console.log('License: Carbon License v2');
console.log('----------------------------------');
console.log('Generating documentation...');
console.log('Library directory:', libDir);
console.log('Documentation directory:', docsDir);

const functionTemplate = await Bun.file(path.join(workspaceDir, 'functionTemplate.md')).text();
const constructTemplate = await Bun.file(path.join(workspaceDir, 'constructTemplate.md')).text();

async function handleFunctions(doc: Record<string, any>, filePath: string) {
    const code = await Bun.file(filePath).text();
    const relativeFilePath = path.relative(libDir, filePath);

    const filename = path.basename(relativeFilePath).replace('.js', '');
    const filefolder = path.dirname(relativeFilePath);

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
    await Bun.build({
        entrypoints: [filePath],
        minify: true,
        packages: "bundle",
        outdir: libDir,
        naming: '[name].min.[ext]',
    })
}

async function handleConstructs(doc: any, filePath: string) {
    const relativeFilePath = path.relative(libDir, filePath);

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

        await Bun.file(path.join(docsDir, relativeFilePath.replace('.js', '.md'))).write(md);

    } catch (error) {
        console.log(`Error for file ${filePath} : ${error}`);
    }

    await Bun.build({
        entrypoints: [filePath],
        minify: true,
        packages: "bundle",
        outdir: path.join(libDir, path.dirname(relativeFilePath)),
        naming: '[name].min.[ext]',
    })
}

async function processFile(relativeFilePath: string) {
    const filePath = path.join(libDir, relativeFilePath);
    console.log('   Processing file:', path.relative(libDir, filePath));

    try {
        const jsdoc = await Bun.$`bun x jsdoc2md --json ${filePath}`.text();

        let doc = JSON.parse(jsdoc).find((d: any) => d.id === 'module.exports');

        if (!doc) {
            console.log('No documentation found for', filePath);
            return;
        }

        if (!doc.kind) {
            console.log('No kind found for', filePath);
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
        console.log('   Generated Documentation file:', path.relative(docsDir, relativeFilePath.replace('.js', '.md')));
    } catch (error) {
        console.log(`Error for file ${filePath} : ${error}`);
    }
}

async function processDir(dir: string) {
    const files = await readdir(dir);
    console.log('\nProcessing directory:', dir);

    if (await Bun.file(path.join(docsDir, path.relative(libDir, dir))).exists() == false) {
        await Bun.$`mkdir -p ${path.join(docsDir, path.relative(libDir, dir))}`;
    }

    if (path.relative(libDir, dir) != '')
        folderStructure[path.relative(libDir, dir)] = [];

    await Promise.all(files.map(async (file) => {
        const filePath = path.join(dir, file);
        const isDirectory = (await stat(filePath)).isDirectory();
        if (isDirectory) {
            await processDir(filePath);
        } else {
            await processFile(path.relative(libDir, filePath));
            folderStructure[path.relative(libDir, dir)].push({
                file: file,
                description: ''
            });
        }
    }));
}

await processDir(libDir);

process.on('exit', async () => {
    await Promise.all(Object.keys(folderStructure).map(async folder => {
        const readmeContent = `# ${folder.charAt(0).toUpperCase() + folder.slice(1)}\n\n` +
            `A set of functions related to ${folder}.\n\n` +
            `## Functions\n\n` +
            folderStructure[folder].map((file: any) => `* [**${file.file}**](./${file.file.replace('.js', '.md')})`).join('\n') + '\n';
        const readmePath = path.join(docsDir, folder, 'README.md');
        await Bun.file(readmePath).write(readmeContent);
        console.log('   Generated README file:', path.relative(docsDir, readmePath));
    }));

    Bun.$`bun run ./genWebsite.ts`;

    console.log('\nDocumentation generated successfully!');
});