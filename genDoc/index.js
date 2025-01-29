#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
    exec
} = require('child_process');
const crypto = require('crypto');

const libDir = path.join(__dirname, '../lib');
const docsDir = path.join(__dirname, '../documentation');
let folderStructure = {};

console.log('Uno.js Documentation Generator');
console.log('Version: 1.0.0');
console.log('Author: theatom06');
console.log('License: Carbon License v2');
console.log('----------------------------------');

function fileHash(code) {
    const hash = crypto.createHash('sha256').update(code).digest('hex');
    return hash;
}

console.log('Generating documentation...');
console.log('Library directory:', libDir);
console.log('Documentation directory:', docsDir);

let functionTemplate = fs.readFileSync(path.join(__dirname, './functionTemplate.md'), 'utf8');
let constructTemplate = fs.readFileSync(path.join(__dirname, './constructTemplate.md'), 'utf8');

function handleFunctions(doc, filePath) {
    let code = fs.readFileSync(filePath, 'utf8');
    let relativeFilePath = path.relative(libDir, filePath);

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
        .replaceAll('TYPE', obj.filefolder.charAt(0).toUpperCase() + obj.filefolder.slice(1))
        .replaceAll('TYPE', obj.filefolder)
        .replaceAll('DESCRIPTION', obj.description)
        .replaceAll('AUTHOR', obj.author)
        .replaceAll('CODE', obj.code)
        .replaceAll('HASH', fileHash(code));



    if (!obj.author) {
        md = md.replaceAll('AUTHOR', 'theatom06');
    }

    if (obj.params) {
        let params = '';
        obj.params.forEach(param => {
            params += `* **${param.name}** - ${param.description}\n`;
        });
        md = md.replace('PARAMS', params);
    } else {
        md = md.replace('PARAMS', '').replace('## Parameters', '');
    }

    if (obj.returns) {
        let returns = '';
        obj.returns.forEach(ret => {
            returns += `* **${ret.type.names[0]}** - ${ret.description}\n`;
        });
        md = md.replace('RETURNS', returns);
    } else {
        md = md.replace('RETURNS', '').replace('## Returns', '');
    }

    if (obj.examples) {
        let examples = '';
        obj.examples.forEach(example => {
            examples += `${example}\n`;
        });
        md = md.replace('EXAMPLES', examples);
    }

    fs.writeFileSync(path.join(docsDir, relativeFilePath.replace('.js', '.md')), md);
}

function handleConstructs(doc, filePath) {
    let relativeFilePath = path.relative(libDir, filePath);

    let md = constructTemplate
        .replaceAll('TITLE', path.basename(relativeFilePath).replace('.js', '').charAt(0).toUpperCase() + path.basename(relativeFilePath).replace('.js', '').slice(1))
        .replaceAll('TYPE', path.dirname(relativeFilePath).charAt(0).toUpperCase() + path.dirname(relativeFilePath).slice(1))
        .replaceAll('AUTHOR', 'theatom06')
        .replaceAll('DESCRIPTION', doc.description)
        .replaceAll('HASH', fileHash(fs.readFileSync(filePath)));

    let obj = {
        params: doc.params,
        returns: doc.returns,
        examples: doc.examples
    }

    if (obj.params) {
        let params = '';
        obj.params.forEach(param => {
            params += `* **${param.name}** - ${param.description}\n`;
        });
        md = md.replace('PARAMS', params);
    } else {
        md = md.replace('PARAMS', '').replace('## Parameters', '');
    }

    if (obj.returns) {
        let returns = '';
        obj.returns.forEach(ret => {
            returns += `* **${ret.type.names[0]}** - ${ret.description}\n`;
        });
        md = md.replace('RETURNS', returns);
    } else {
        md = md.replace('RETURNS', '').replace('## Returns', '');
    }

    if (obj.examples) {
        let examples = '';
        obj.examples.forEach(example => {
            examples += `${example}\n`;
        });
        md = md.replace('EXAMPLES', examples);
    }

    exec(`npx jsdoc2md  ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            console.log(filePath)
            return;
        }

        md = md.replace('JSDOC2MDDOC', stdout);
        md = md.split('## ');
        md.forEach((m, i) => {
            if (m.startsWith('Function')) {
                md.splice(i, 1);
            }
        });

        md = md.join('## ');


        fs.writeFileSync(path.join(docsDir, relativeFilePath.replace('.js', '.md')), md);
    });
}

function processFile(relativeFilePath) {
    const filePath = path.join(libDir, relativeFilePath);
    console.log('   Processing file:', path.relative(libDir, filePath));
    exec(`npx jsdoc2md  --json ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            console.log(filePath)
            return;
        }

        let doc = JSON.parse(stdout).find(d => d.id === 'module.exports');

        if (!doc) {
            console.log('No documentation found for', filePath);
            return;
        }

        if (!doc.kind) {
            console.log('No kind found for', filePath);
            doc.kind = 'function';
        }

        if (doc.kind == 'class') {
            handleConstructs(doc, filePath);
        } else {
            handleFunctions(doc, filePath);
        }

        folderStructure[path.dirname(relativeFilePath)].forEach(file => {
            if (file.file == path.basename(relativeFilePath)) {
                file.description = JSON.parse(stdout)[0].description;
            }
        });
        console.log('   Generated Documentation file:', path.relative(docsDir, relativeFilePath.replace('.js', '.md')));
    });

}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    console.log('\nProcessing directory:', dir);

    if (!fs.existsSync(path.join(docsDir, path.relative(libDir, dir)))) {
        fs.mkdirSync(path.join(docsDir, path.relative(libDir, dir)));
    }

    if (path.relative(libDir, dir) != '')
        folderStructure[path.relative(libDir, dir)] = [];


    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDir(filePath);
        } else {
            processFile(path.relative(libDir, filePath));
            folderStructure[path.relative(libDir, dir)].push({
                file: file,
                description: ''
            });
        }
    });
}

processDir(libDir);

process.on('exit', () => {
    Object.keys(folderStructure).forEach(folder => {
        const readmeContent = `# ${folder.charAt(0).toUpperCase() + folder.slice(1)}\n\n` +
            `A set of functions related to ${folder}.\n\n` +
            `## Functions\n\n` +
            folderStructure[folder].map(file => `* [**${file.file}**](./${file.file.replace('.js', '.md')}) - ${file.description}`).join('\n') + '\n';
        const readmePath = path.join(docsDir, folder, 'README.md');
        fs.writeFileSync(readmePath, readmeContent);
        console.log('   Generated README file:', path.relative(docsDir, readmePath));
    });

    console.log('\nDocumentation generated successfully!');
});