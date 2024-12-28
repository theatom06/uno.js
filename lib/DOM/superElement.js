/**
 * @class
 * SuperElement is a class that wraps around the native DOM element and provides a more intuitive and easy to use API.
 * @example
 * let element = new SuperElement('div');
 * element.text('Hello, World!').appendTo(document.body);
 * element.css('color', 'red');
 * element.css('color'); //red
 * @author theatom06
 */
export default class SuperElement {

    /**
     * Create or query a SuperElement.
     * @param {String} emmet The emmet string for creating or querying the element.
     * @param {Boolean} search (optional, false) If true, the emmet string will be used to query an element.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * let element = new SuperElement('div'); //Creates a new div element.
     * let element = new SuperElement('#id', true); //Queries the element with the id 'id'.
     */
    constructor(emmet, search = false){
        let element;
        if (search) {
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

    /**
     * Set or get the text content of the element.
     * @param {String} text The text to set.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.textContent('Hello, World!'); //Sets the text content of the element.
     * element.textContent(); //Returns the text content of the element.
     */
    textContent(text){
        if(!text)
            return this.element.textContent;
        this.element.textContent = text;
        return this;
    }

    /**
     * Append text to the element.
     * @param {String} text The text to append.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.appendText('Hello, '); //Appends text to the element.
     */
    appendText(text){
        this.element.textContent += text;
        return this;    
    }

    /**
     * Prepends text to the element.
     * @param {String} text Text to prepend
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.prependText('Hello, '); //Prepends text to the element.
     */
    prependText(text){
        this.element.textContent = text + this.element.textContent;
        return this;
    }

    /**
     * CAUTION: This method is dangerous and should be used with caution.
     * Set the innerHTML of the element.
     * @param {String} html The HTML string to set.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.DangerouslySetInnerHTML('<h1>Hello, World!</h1>'); //Sets the innerHTML of the element.
     */
    DangerouslySetInnerHTML(html){
        this.element.innerHTML = html;
        return this;
    }

    /**
     * Appends the elemen to a parent element
     * @param {Element} parent The parent element to append the element to.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.appendTo(document.body); //Appends the element to the body.
     */
    appendTo(parent){
        parent.appendChild(this.element);
        return this;
    }

    /**
     * Prepends the element to a parent element.
     * @param {Element} parent The parent element to prepend the element to.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.prependTo(document.body); //Prepends the element to the body.
     */
    prependTo(parent){
        parent.prepend(this.element);
        return this;
    }

    /**
     * Inserts the element before a sibling element.
     * @param {Element} sibling The sibling element to insert the element before.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.insertBefore(sibling); //Inserts the element before the sibling element.
     */
    insertBefore(sibling){
        sibling.parentNode.insertBefore(this.element, sibling);
        return this;
    }

    /**
     * Inserts the element after a sibling element.
     * @param {Element} sibling The sibling element to insert the element after.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.insertAfter(sibling); //Inserts the element after the sibling element.
     */
    insertAfter(sibling){
        sibling.parentNode.insertBefore(this.element, sibling.nextSibling);
        return this;
    }

    /**
     * Removes the element from the DOM.
     * @example
     * element.remove(); //Removes the element from the DOM.
     */
    remove(){
        this.element.remove();
    }

    /**
     * Adds an event listener to the element.
     * @param {String} event The event to listen for.
     * @param {Function} callback The callback function to call when the event is triggered.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.on('click', () => console.log('Clicked!')); //Adds a click event listener to the element.
     */
    on(event, callback){
        this.element.addEventListener(event, callback);
        return this;
    }

    /**
     * Removes an event listener from the element.
     * @param {String} event The event to remove the listener from.
     * @param {Function} callback The callback function to remove.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.off('click', () => console.log('Clicked!')); //Removes the click event listener from the element.
     */
    off(event, callback){
        this.element.removeEventListener(event, callback);
        return this;
    }

    /**
     * Triggers an event on the element.
     * @param {String} event The event to trigger.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.trigger('click'); //Triggers a click event on the element.
     */
    trigger(event){
        this.element.dispatchEvent(new Event(event));
        return this;
    }

    /**
     * Set or get the css properties of the element.
     * @param {String} property The css property to set.
     * @param {String} value The value to set the css property to.
     * @returns {SuperElement} The SuperElement object. 
     * @example
     * element.css('color', 'red'); //Sets the color of the element to red.
     */
    css(property, value){
        if(!value)
            return this.element.style[property];
        this.element.style[property] = value;
        return this;
    }

    /**
     * Adds a class to the element.
     * @param {String} className The class to add.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.addClass('red'); //Adds the class 'red' to the element.
     */
    addClass(className){
        this.element.classList.add(className);
        return this;
    }

    /**
     * Removes a class from the element.
     * @param {String} className The class to remove.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.removeClass('red'); //Removes the class 'red' from the element.
     */
    removeClass(className){
        this.element.classList.remove(className);
        return this;
    }

    /**
     * Toggles a class on the element.
     * @param {String} className The class to toggle.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.toggleClass('red'); //Toggles the class 'red' on the element.
     */
    toggleClass(className){
        this.element.classList.toggle(className);
        return this;
    }

    /**
     * Checks if the element has a class.
     * @param {String} className The class to check
     * @returns {Boolean} True if the element has the class, false otherwise.
     * @example
     * element.hasClass('red'); //Returns true if the element has the class 'red'.
     */
    hasClass(className){
        return this.element.classList.contains(className);
    }

    /**
     * Checks if the element has a class.
     * @returns {DOMTokenList} The classes of the element.
     * @example
     * element.classes(); //Returns the classes of the element.
     */
    classes(){
        return this.element.classList;
    }

    /**
     * Set or get an attribute of the element.
     * @param {String} attribute The attribute to set.
     * @param {String} value The value to set the attribute to.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.attr('id', 'element'); //Sets the id of the element to 'element'.
     * element.attr('id'); //Returns the id of the element.
     */
    attr(attribute, value){
        if(!value)
            return this.element.getAttribute(attribute);
        this.element.setAttribute(attribute, value);
        return this;
    }

    /**
     * Removes an attribute from the element.
     * @param {String} attribute The attribute to remove.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.removeAttr('id'); //Removes the id attribute from the element.
     */
    removeAttr(attribute){
        this.element.removeAttribute(attribute);
        return this;
    }

    /**
     * Toggles an attribute on the element.
     * @param {String} attribute The attribute to toggle.
     * @param {String} value The value to set the attribute to.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.toggleAttr('disabled', 'true'); //Toggles the disabled attribute on the element.
     */
    toggleAttr(attribute, value){
        if(this.element.hasAttribute(attribute))
            this.element.removeAttribute(attribute);
        else
            this.element.setAttribute(attribute, value);
        return this;
    }

    #secret(){
        1e3;
        'Dam.. Your Jobless '
    }
    
    /**
     * Returns the attributes of the element.
     * @returns {NamedNodeMap} The attributes of the element.
     * @example
     * element.attributes(); //Returns the attributes of the element.
     */
    attributes(){
        return this.element.attributes;
    }

    /**
     * Checks if the element has an attribute.
     * @param {String} attribute The attribute to check.
     * @returns {Boolean} True if the element has the attribute, false otherwise.
     * @example
     * element.hasAttribute('id'); //Returns true if the element has the id attribute.
     */
    hasAttribute(attribute){
        return this.element.hasAttribute(attribute);
    }

    /**
     * Returns the parent element of the element.
     * @returns {Element} The parent element of the element.
     */
    parent(){
        return this.element.parentNode;
    }

    /**
     * Returns the children of the element.
     * @returns {HTMLCollection} The children of the element.
     */
    children(){
        return this.element.children;
    }

    /**
     * Returns the siblings of the element.
     * @returns {Array} The siblings of the element.
     */
    siblings(){
        return Array.from(this.element.parentNode.children).filter(child => child !== this.element);
    }

    /**
     * Returns the next sibling of the element.
     * @returns {Element} The next sibling of the element.
     */
    nextElement(){
        return this.element.nextElementSibling;
    }

    /**
     * Returns the previous sibling of the element.
     * @returns {Element} The previous sibling of the element.
     */
    previousElement(){
        return this.element.previousElementSibling;
    }

    /**
     * Returns the closest ancestor of the element that matches the selector.
     * @param {String} selector The selector to match.
     * @returns {Element} The closest ancestor of the element that matches the selector.
     */
    closest(selector){
        return this.element.closest(selector);
    }

    /**
     * Returns the element matching the selector.
     * @param {String} selector The selector to match.
     * @returns {Element} The element matching the selector.
     */
    find(selector){
        return this.element.querySelector(selector);
    }

    /**
     * Returns the elements matching the selector.
     * @param {String} selector The selector to match.
     * @returns {NodeList} The elements matching the selector.
     */
    findAll(selector){
        return this.element.querySelectorAll(selector);
    }

    /**
     * Returns the style of the element.
     * @returns {CSSStyleDeclaration} The style of the element.
     */
    style(){
        return this.element.style;
    }

    /**
     * Returns a clone of the element.
     * @returns {Element} A clone of the element.
     */
    clone(){
        return this.element.cloneNode(true);
    }

    /**
     * Replace the element with another element.
     * @param {Element} element The element to replace the element with.
     * @returns {SuperElement} The SuperElement object.
     */
    replaceWith(element){
        this.element.replaceWith(element);
        return this;
    }

    /**
     * Wrap the element with another element.
     * @param {Element} element The element to wrap the element with.
     * @returns {SuperElement} The SuperElement object.
     */
    wrap(element){
        this.element.parentNode.replaceChild(element, this.element);
        element.appendChild(this.element);
        return this;
    }

    /**
     * Unwrap the element.
     * @returns {SuperElement} The SuperElement object.
     * @example
     * element.unwrap(); //Unwraps the element.
     */
    unwrap(){
        let parent = this.element.parentNode;
        while(this.element.firstChild)
            parent.insertBefore(this.element.firstChild, this.element);
        parent.removeChild(this.element);
        return this;
    }

    /**
     * Scrolls the element into view.
     * @param {Object} options The options for scrolling the element into view.
     * @returns {SuperElement} The SuperElement object.
     */
    scrollIntoView(options){
        this.element.scrollIntoView(options);
        return this;
    }

    /**
     * Scrolls the element to a specified position.
     * @param {Object} options The options for scrolling the element.
     * @returns {SuperElement} The SuperElement object.
     */
    scrollTo(options){
        this.element.scrollTo(options);
        return this;
    }

    /**
     * Empties the element.
     */
    empty(){
        this.element.innerHTML = '';
    }

    /**
     * Disables the element.
     * @returns {SuperElement} The SuperElement object.
     */
    disable(){
        this.element.disabled = true;
        return this;
    }

    /**
     * Enables the element.
     * @returns {SuperElement} The SuperElement object.
     */
    enable(){
        this.element.disabled = false;
        return this;
    }

    /**
     * Returns the element.
     * @returns {Element} The element.
     */
    render(){
        return this.element;
    }
}    