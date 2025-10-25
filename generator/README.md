# Uno.js Documentation Generator

This is a documentation generator for the Uno.js.

## How it works
- It reads each file of the `lib` folder
- It uses `jsdoc-2-markdown` to generate **`json` of the exported functions**
- If it is a **class**, it will generate a markdown file for it via **jsdoc-2-markdown markdown file**
- The template for the class is in `genDoc/constuctTemplate.md`
- If it is a **function**, it will generate a markdown file for it via **jsdoc-2-markdown json file** with the template
- The template for the function is in `genDoc/functionTemplate.md`
- It makes a `README.md` file in the root of the folder of each `type` that contains the **list of all the classes and functions**
- It makes a root `README.md` file that contains the **list of all the `type`(s)**

## Upcoming Features
- Useing file hash to check if the file has changed to avoid regenerating the same file
- Add a `--watch` flag to watch the files and regenerate the documentation

## Prerequisites
- Node.js
- npm
- jsdoc-2-markdown installed globally

## How to use
- Run `npm install` to install the dependencies
- Run './genDoc.js' to generate the documentation
- The documentation will be in the `docs` folder

## License
MIT