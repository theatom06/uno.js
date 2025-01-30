# FromEmmet - DOM
Create an element from an emmet string

**Author:** theatom06

## Import 

```js
import fromEmmet from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/DOM/fromEmmet.js';
```
and compresed version
```js
import fromEmmet from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/DOM/fromEmmet.min.js';
```

## Code
The raw code of the function is available here:
```js
/**
 * Create an element from an emmet string
 * @param {string} emmet The emmet string.
 * @returns {HTMLElement} The created element.
 * @example
 * fromEmmet('div#id.class1.class2[attr1=val1 attr2=val2]{text}'); // <div id="id" class="class1 class2" attr1="val1" attr2="val2">text</div>
 * @author theatom06
 */
export default function fromEmmet(emmet){
    let tagName = emmet.split(/[#.]/)[0];
    let id = emmet.match(/#([^.]+)/);
    let classes = emmet.match(/\.[^.#\[]+/g);
    let attributes = emmet.match(/\[[^\]]+\]/g);
    let text = emmet.match(/{[^}]+}/);
    let element = document.createElement(tagName);
    if(id)
        element.id = id[1];
    if(classes)
        element.classList.add(...classes.map(c => c.slice(1)));
    if(attributes)
        attributes.forEach(a => {
            let [name, value] = a.slice(1, -1).split('=');
            element.setAttribute(name, value);
        });
    if(text)
        element.textContent = text[0].slice(1, -1);

    return element;
}
```

## Parameters
* **emmet** - The emmet string.


## Returns
* **HTMLElement** - The created element.


## Examples
```js
fromEmmet('div#id.class1.class2[attr1=val1 attr2=val2]{text}'); // <div id="id" class="class1 class2" attr1="val1" attr2="val2">text</div>

```