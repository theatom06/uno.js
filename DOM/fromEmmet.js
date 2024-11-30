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