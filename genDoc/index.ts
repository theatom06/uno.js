import path from 'path';
import { readdir, stat, mkdir } from "node:fs/promises";
import markdownit from 'markdown-it';
//@ts-ignore
import toc from 'markdown-it-table-of-contents';
//@ts-ignore
import sections from 'markdown-it-header-sections';
import anchor from 'markdown-it-anchor';

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
        outdir: path.join(libDir, path.dirname(relativeFilePath)),
        naming: '[name].min.[ext]',
    })
}

async function handleConstructs(doc: any, filePath: string) {
    const relativeFilePath = path.relative(libDir, filePath);
  
if(relativeFilePath.endsWith('.min.js')){return;}

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
    if(filePath.endsWith('.min.js')) {
        return;
    }
    
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
            if(file.endsWith('.min.js')){return;}
            await processFile(path.relative(libDir, filePath));
            folderStructure[path.relative(libDir, dir)].push({
                file: file,
                description: ''
            });
        }
    }));
}

await processDir(libDir);

    await Promise.all(Object.keys(folderStructure).map(async folder => {
        const readmeContent = `# ${folder.charAt(0).toUpperCase() + folder.slice(1)}\n\n` +
            `A set of functions related to ${folder}.\n\n` +
            `## Functions\n\n` +
            folderStructure[folder].map((file: any) => `* [**${file.file}**](./${file.file.replace('.js', '.md')})`).join('\n') + '\n';
        const readmePath = path.join(docsDir, folder, 'README.md');
        await Bun.file(readmePath).write(readmeContent);
        console.log('   Generated README file:', path.relative(docsDir, readmePath));
    }));


    
    let md = markdownit();
    md.use(anchor);
    md.use(toc);
    md.use(sections);
    
    const web = path.join( import.meta.dir, '../docs/docs/');
    const template = await Bun.file(path.join(
        import.meta.dir, 'template.html')).text();
    
    function makeFile(_md: string) {
        const section = md.render(_md.replace('.md', '.html'));
        return template.replace('WEBSITE', section);
    }
    
    async function _processFile(filePath: string, file: string) {
        console.log(`Processing file: ${file}`);
        if (file.endsWith('.md')) {
            console.log(`File ${file} is a markdown file`);
            const fileContent = await Bun.file(filePath).text();
            const html = makeFile(fileContent);
            let htmlPath = filePath.replace(docsDir, web).replace('.md', '.html');
            htmlPath = htmlPath.replace('README', 'index');
            await Bun.write(htmlPath, html);
            console.log(`Generated HTML file: ${htmlPath}`);
            return;
        }
    
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            console.log(`File ${file} is an image file`);
            const imgPath = Bun.file(filePath)
            await Bun.write(path.join(web, file), imgPath);
            console.log(`Copied image file: ${file}`);
            return;
        }
    }
    
    console.log('Starting file processing...');
    await readdir(docsDir).then(async (files) => {
        for (const file of files) {
            const filePath = path.join(docsDir, file);
            const stats = await stat(filePath);
    
            if (stats.isDirectory()) {
                console.log(`Processing directory: ${file}`);
                await mkdir(path.join(web, file), { recursive: true });
                const dirFiles = await readdir(filePath);
                for (const dirFile of dirFiles) {
                    await _processFile(path.join(filePath, dirFile), dirFile);
                }
            } else {
                await _processFile(filePath, file);
            }
        }
    });
    console.log('File processing completed.');
    Bun.$`cp ${libDir} ${path.join(docsDir, 'lib')}`;

    console.log('\nDocumentation generated successfully!');