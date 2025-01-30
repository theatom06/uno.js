# SuperElement - DOM
SuperElement is a class that wraps around the native DOM element and provides a more intuitive and easy to use API.

**Author:** theatom06

## Import

```js
import superElement from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/DOM/superElement.js';
```
and compresed version
```js
import superElement from 'https://cdn.jsdelivr.net/gh/theatom06/uno.js@main/lib/DOM/superElement.min.js';
```

## Code
This is a construct so the code is too long to be displayed here.
If you want to see the code, you can check it [here](https://github.com/theatom06/uno.js/blob/main/lib/DOM/superElement.js).

## textContent(text) ⇒ <code>SuperElement</code>
Set or get the text content of the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to set. |

**Example**  
```js
element.textContent('Hello, World!'); //Sets the text content of the element.
element.textContent(); //Returns the text content of the element.
```
<a name="appendText"></a>

## appendText(text) ⇒ <code>SuperElement</code>
Append text to the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | The text to append. |

**Example**  
```js
element.appendText('Hello, '); //Appends text to the element.
```
<a name="prependText"></a>

## prependText(text) ⇒ <code>SuperElement</code>
Prepends text to the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | Text to prepend |

**Example**  
```js
element.prependText('Hello, '); //Prepends text to the element.
```
<a name="DangerouslySetInnerHTML"></a>

## DangerouslySetInnerHTML(html) ⇒ <code>SuperElement</code>
CAUTION: This method is dangerous and should be used with caution.
Set the innerHTML of the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| html | <code>String</code> | The HTML string to set. |

**Example**  
```js
element.DangerouslySetInnerHTML('<h1>Hello, World!</h1>'); //Sets the innerHTML of the element.
```
<a name="appendTo"></a>

## appendTo(parent) ⇒ <code>SuperElement</code>
Appends the elemen to a parent element

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Element</code> | The parent element to append the element to. |

**Example**  
```js
element.appendTo(document.body); //Appends the element to the body.
```
<a name="prependTo"></a>

## prependTo(parent) ⇒ <code>SuperElement</code>
Prepends the element to a parent element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Element</code> | The parent element to prepend the element to. |

**Example**  
```js
element.prependTo(document.body); //Prepends the element to the body.
```
<a name="insertBefore"></a>

## insertBefore(sibling) ⇒ <code>SuperElement</code>
Inserts the element before a sibling element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| sibling | <code>Element</code> | The sibling element to insert the element before. |

**Example**  
```js
element.insertBefore(sibling); //Inserts the element before the sibling element.
```
<a name="insertAfter"></a>

## insertAfter(sibling) ⇒ <code>SuperElement</code>
Inserts the element after a sibling element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| sibling | <code>Element</code> | The sibling element to insert the element after. |

**Example**  
```js
element.insertAfter(sibling); //Inserts the element after the sibling element.
```
<a name="remove"></a>

## remove()
Removes the element from the DOM.

**Kind**: global function  
**Example**  
```js
element.remove(); //Removes the element from the DOM.
```
<a name="on"></a>

## on(event, callback) ⇒ <code>SuperElement</code>
Adds an event listener to the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event to listen for. |
| callback | <code>function</code> | The callback function to call when the event is triggered. |

**Example**  
```js
element.on('click', () => console.log('Clicked!')); //Adds a click event listener to the element.
```
<a name="off"></a>

## off(event, callback) ⇒ <code>SuperElement</code>
Removes an event listener from the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event to remove the listener from. |
| callback | <code>function</code> | The callback function to remove. |

**Example**  
```js
element.off('click', () => console.log('Clicked!')); //Removes the click event listener from the element.
```
<a name="trigger"></a>

## trigger(event) ⇒ <code>SuperElement</code>
Triggers an event on the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>String</code> | The event to trigger. |

**Example**  
```js
element.trigger('click'); //Triggers a click event on the element.
```
<a name="css"></a>

## css(property, value) ⇒ <code>SuperElement</code>
Set or get the css properties of the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The css property to set. |
| value | <code>String</code> | The value to set the css property to. |

**Example**  
```js
element.css('color', 'red'); //Sets the color of the element to red.
```
<a name="addClass"></a>

## addClass(className) ⇒ <code>SuperElement</code>
Adds a class to the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | The class to add. |

**Example**  
```js
element.addClass('red'); //Adds the class 'red' to the element.
```
<a name="removeClass"></a>

## removeClass(className) ⇒ <code>SuperElement</code>
Removes a class from the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | The class to remove. |

**Example**  
```js
element.removeClass('red'); //Removes the class 'red' from the element.
```
<a name="toggleClass"></a>

## toggleClass(className) ⇒ <code>SuperElement</code>
Toggles a class on the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | The class to toggle. |

**Example**  
```js
element.toggleClass('red'); //Toggles the class 'red' on the element.
```
<a name="hasClass"></a>

## hasClass(className) ⇒ <code>Boolean</code>
Checks if the element has a class.

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the element has the class, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| className | <code>String</code> | The class to check |

**Example**  
```js
element.hasClass('red'); //Returns true if the element has the class 'red'.
```
<a name="classes"></a>

## classes() ⇒ <code>DOMTokenList</code>
Checks if the element has a class.

**Kind**: global function  
**Returns**: <code>DOMTokenList</code> - The classes of the element.  
**Example**  
```js
element.classes(); //Returns the classes of the element.
```
<a name="attr"></a>

## attr(attribute, value) ⇒ <code>SuperElement</code>
Set or get an attribute of the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>String</code> | The attribute to set. |
| value | <code>String</code> | The value to set the attribute to. |

**Example**  
```js
element.attr('id', 'element'); //Sets the id of the element to 'element'.
element.attr('id'); //Returns the id of the element.
```
<a name="removeAttr"></a>

## removeAttr(attribute) ⇒ <code>SuperElement</code>
Removes an attribute from the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>String</code> | The attribute to remove. |

**Example**  
```js
element.removeAttr('id'); //Removes the id attribute from the element.
```
<a name="toggleAttr"></a>

## toggleAttr(attribute, value) ⇒ <code>SuperElement</code>
Toggles an attribute on the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>String</code> | The attribute to toggle. |
| value | <code>String</code> | The value to set the attribute to. |

**Example**  
```js
element.toggleAttr('disabled', 'true'); //Toggles the disabled attribute on the element.
```
<a name="attributes"></a>

## attributes() ⇒ <code>NamedNodeMap</code>
Returns the attributes of the element.

**Kind**: global function  
**Returns**: <code>NamedNodeMap</code> - The attributes of the element.  
**Example**  
```js
element.attributes(); //Returns the attributes of the element.
```
<a name="hasAttribute"></a>

## hasAttribute(attribute) ⇒ <code>Boolean</code>
Checks if the element has an attribute.

**Kind**: global function  
**Returns**: <code>Boolean</code> - True if the element has the attribute, false otherwise.  

| Param | Type | Description |
| --- | --- | --- |
| attribute | <code>String</code> | The attribute to check. |

**Example**  
```js
element.hasAttribute('id'); //Returns true if the element has the id attribute.
```
<a name="parent"></a>

## parent() ⇒ <code>Element</code>
Returns the parent element of the element.

**Kind**: global function  
**Returns**: <code>Element</code> - The parent element of the element.  
<a name="children"></a>

## children() ⇒ <code>HTMLCollection</code>
Returns the children of the element.

**Kind**: global function  
**Returns**: <code>HTMLCollection</code> - The children of the element.  
<a name="siblings"></a>

## siblings() ⇒ <code>Array</code>
Returns the siblings of the element.

**Kind**: global function  
**Returns**: <code>Array</code> - The siblings of the element.  
<a name="nextElement"></a>

## nextElement() ⇒ <code>Element</code>
Returns the next sibling of the element.

**Kind**: global function  
**Returns**: <code>Element</code> - The next sibling of the element.  
<a name="previousElement"></a>

## previousElement() ⇒ <code>Element</code>
Returns the previous sibling of the element.

**Kind**: global function  
**Returns**: <code>Element</code> - The previous sibling of the element.  
<a name="closest"></a>

## closest(selector) ⇒ <code>Element</code>
Returns the closest ancestor of the element that matches the selector.

**Kind**: global function  
**Returns**: <code>Element</code> - The closest ancestor of the element that matches the selector.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The selector to match. |

<a name="find"></a>

## find(selector) ⇒ <code>Element</code>
Returns the element matching the selector.

**Kind**: global function  
**Returns**: <code>Element</code> - The element matching the selector.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The selector to match. |

<a name="findAll"></a>

## findAll(selector) ⇒ <code>NodeList</code>
Returns the elements matching the selector.

**Kind**: global function  
**Returns**: <code>NodeList</code> - The elements matching the selector.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The selector to match. |

<a name="style"></a>

## style() ⇒ <code>CSSStyleDeclaration</code>
Returns the style of the element.

**Kind**: global function  
**Returns**: <code>CSSStyleDeclaration</code> - The style of the element.  
<a name="clone"></a>

## clone() ⇒ <code>Element</code>
Returns a clone of the element.

**Kind**: global function  
**Returns**: <code>Element</code> - A clone of the element.  
<a name="replaceWith"></a>

## replaceWith(element) ⇒ <code>SuperElement</code>
Replace the element with another element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | The element to replace the element with. |

<a name="wrap"></a>

## wrap(element) ⇒ <code>SuperElement</code>
Wrap the element with another element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | The element to wrap the element with. |

<a name="unwrap"></a>

## unwrap() ⇒ <code>SuperElement</code>
Unwrap the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  
**Example**  
```js
element.unwrap(); //Unwraps the element.
```
<a name="scrollIntoView"></a>

## scrollIntoView(options) ⇒ <code>SuperElement</code>
Scrolls the element into view.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options for scrolling the element into view. |

<a name="scrollTo"></a>

## scrollTo(options) ⇒ <code>SuperElement</code>
Scrolls the element to a specified position.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | The options for scrolling the element. |

<a name="empty"></a>

## empty()
Empties the element.

**Kind**: global function  
<a name="disable"></a>

## disable() ⇒ <code>SuperElement</code>
Disables the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  
<a name="enable"></a>

## enable() ⇒ <code>SuperElement</code>
Enables the element.

**Kind**: global function  
**Returns**: <code>SuperElement</code> - The SuperElement object.  
<a name="render"></a>

## render() ⇒ <code>Element</code>
Returns the element.

**Kind**: global function  
**Returns**: <code>Element</code> - The element.  
Z