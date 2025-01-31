import markdownit from 'markdown-it';
//@ts-ignore
import toc from 'markdown-it-table-of-contents';
//@ts-ignore
import sections from 'markdown-it-header-sections';
import anchor from 'markdown-it-anchor';
import path from 'path';
import {
    readdir,
    stat,
    mkdir
} from 'fs/promises';

let md = markdownit();
md.use(anchor);
md.use(toc);
md.use(sections);

const web = path.join( import.meta.dir, '../docs/docs/');
const docsDir = path.join( import.meta.dir, '../documentation');
const template = await Bun.file(path.join(
    import.meta.dir, 'template.html')).text();

function makeFile(_md: string) {
    const section = md.render(_md.replace('.md', '.html'));
    return template.replace('WEBSITE', section);
}

async function processFile(filePath: string, file: string) {
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
                await processFile(path.join(filePath, dirFile), dirFile);
            }
        } else {
            await processFile(filePath, file);
        }
    }
});
console.log('File processing completed.');