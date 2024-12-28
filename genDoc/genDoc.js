#!/usr/bin/env node
//@ts-check
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const libDir = path.join(__dirname, '../lib');
const docsDir = path.join(__dirname, '../docs');
console.log('Generating documentation...');
console.log('Library directory:', libDir);
console.log('Documentation directory:', docsDir);

let docTemplate = `# TITLE - TYPE
DESCRIPTION

**Author:** AUTHOR


## Code
\`\`\`js
CODE
\`\`\`

## Parameters
PARAMS

## Returns
RETURNS

## Examples
\`\`\`js
EXAMPLES
\`\`\`
`

let structure = {};

function handleDocumentation(doc, relativeFilePath, code) {
    const filename = path.basename(relativeFilePath).replace('.js', '');
    const filefolder = path.dirname(relativeFilePath);
    let obj = {
        title: filename.charAt(0).toUpperCase() + filename.slice(1),
        filefolder: filefolder.charAt(0).toUpperCase() + filefolder.slice(1),
        description: doc.description,
        params: doc.params,
        returns: doc.returns,
        examples: doc.examples,
        author: doc.author,
        code: code
    }

    let md = docTemplate
                .replace('TITLE', obj.title)
                .replace('TYPE', obj.filefolder)
                .replace('DESCRIPTION', obj.description)
                .replace('AUTHOR', obj.author)
                .replace('CODE', obj.code);

    if(!obj.author) {
        md = md.replace('AUTHOR', 'theatom06');
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

    return md;
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

        const docFilePath = path.join(docsDir, relativeFilePath.replace('.js', '.md'));

        //fs.writeFileSync(docFilePath, handleDocumentation(JSON.parse(stdout)[0], relativeFilePath, fs.readFileSync(filePath).toString()));
        console.log('   Generated Documentation file:', path.relative(docsDir, docFilePath));
    });

}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    console.log('\nProcessing directory:', dir);

    if (!fs.existsSync(path.join(docsDir, path.relative(libDir, dir)))) {
        fs.mkdirSync(path.join(docsDir, path.relative(libDir, dir)));
    }

    if(path.relative(libDir, dir) != '')
        structure[path.relative(libDir, dir)] = [];


    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDir(filePath);
        } else {
            processFile(path.relative(libDir, filePath));
            structure[path.relative(libDir, dir)].push(file);
        }
    });
}

processDir(libDir);
console.log('\nStructure:', structure);
console.log('\nDocumentation generated successfully!');