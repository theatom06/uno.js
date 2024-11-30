export class SuperElement {

    constructor(emmet){
        let element;
        if (document.querySelector(emmet)) {
            element = document.querySelector(emmet);
            return;
        }

        let id = emmet.match(/#([^.]+)/);
        let classes = emmet.match(/\.[^.#\[]+/g);
        let attributes = emmet.match(/\[[^\]]+\]/g);
        let text = emmet.match(/{[^}]+}/);
        element = document.createElement(tagName);

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
    
        this.element = element;
    }

    textContent(text){
        if(!text)
            return this.element.textContent;
        this.element.textContent = text;
        return this;
    }

    appendText(text){
        this.element.textContent += text;
        return this;    
    }

    prependText(text){
        this.element.textContent = text + this.element.textContent;
        return this;
    }

    DangerouslySetInnerHTML(html){
        this.element.innerHTML = html;
        return this;
    }

    appendTo(parent){
        parent.appendChild(this.element);
        return this;
    }

    prependTo(parent){
        parent.prepend(this.element);
        return this;
    }

    insertBefore(sibling){
        sibling.parentNode.insertBefore(this.element, sibling);
        return this;
    }

    insertAfter(sibling){
        sibling.parentNode.insertBefore(this.element, sibling.nextSibling);
        return this;
    }

    remove(){
        this.element.remove();
        return this;
    }

    on(event, callback){
        this.element.addEventListener(event, callback);
        return this;
    }

    off(event, callback){
        this.element.removeEventListener(event, callback);
        return this;
    }

    trigger(event){
        this.element.dispatchEvent(new Event(event));
        return this;
    }

    css(property, value){
        if(!value)
            return this.element.style[property];
        this.element.style[property] = value;
        return this;
    }

    addClass(className){
        this.element.classList.add(className);
        return this;
    }

    removeClass(className){
        this.element.classList.remove(className);
        return this;
    }

    toggleClass(className){
        this.element.classList.toggle(className);
        return this;
    }

    hasClass(className){
        return this.element.classList.contains(className);
    }

    classes(){
        return this.element.classList;
    }

    attr(attribute, value){
        if(!value)
            return this.element.getAttribute(attribute);
        this.element.setAttribute(attribute, value);
        return this;
    }

    removeAttr(attribute){
        this.element.removeAttribute(attribute);

        return this;
    }

    toggleAttr(attribute, value){
        if(this.element.hasAttribute(attribute))
            this.element.removeAttribute(attribute);
        else
            this.element.setAttribute(attribute, value);
        return this;
    }

    attributes(){
        return this.element.attributes;
    }

    hasAttribute(attribute){
        return this.element.hasAttribute(attribute);
    }

    parent(){
        return this.element.parentNode;
    }

    children(){
        return this.element.children;
    }

    siblings(){
        return Array.from(this.element.parentNode.children).filter(child => child !== this.element);
    }

    nextElement(){
        return this.element.nextElementSibling;
    }

    previousElement(){
        return this.element.previousElementSibling;
    }

    closest(selector){
        return this.element.closest(selector);
    }

    find(selector){
        return this.element.querySelector(selector);
    }

    findAll(selector){
        return this.element.querySelectorAll(selector);
    }

    style(){
        return this.element.style;
    }

    clone(){
        return this.element.cloneNode(true);
    }

    replaceWith(element){
        this.element.replaceWith(element);
        return this;
    }

    wrap(element){
        this.element.parentNode.replaceChild(element, this.element);
        element.appendChild(this.element);
        return this;
    }

    unwrap(){
        let parent = this.element.parentNode;
        while(this.element.firstChild)
            parent.insertBefore(this.element.firstChild, this.element);
        parent.removeChild(this.element);
        return this;
    }

    scrollIntoView(options){
        this.element.scrollIntoView(options);
        return this;
    }

    scrollTo(options){
        this.element.scrollTo(options);
        return this;
    }

    empty(){
        this.element.innerHTML = '';
    }

    disable(){
        this.element.disabled = true;
        return this;
    }

    enable(){
        this.element.disabled = false;
        return this;
    }

    render(){
        return this.element;
    }
}    