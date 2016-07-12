const processContent = function(content) {
    return Array.isArray(content)?
        content.forEach(item => processContent.call(this, item)) :
        this.appendChild(toDOM(content));
};

const toDOM = object => {
    if(Array.isArray(object)) {
        return object.map(item => toDOM(item));
    }
    if(typeof object === 'string') {
        object = { node : 'text', content : object };
        // return document.createTextNode(object);
    }
    if(!object.node && object.element) {
        object.node = 'element';
    }
    switch(object.node) {
        case 'element' :
            const element = document.createElement(object.element);
            const attributes = object.attributes;
            const content = object.content;
            if(attributes) {
                Object.keys(attributes).forEach(name => {
                    const value = attributes[name];
                    if(typeof value === 'string') element.setAttribute(name, value);
                });
            }
            if(content) processContent.call(element, content);
            return element;
        case 'text' : return document.createTextNode(object.content);
        case 'comment' : return document.createComment(object.content);
        case 'document' :
            return object.type === 'html'?
                document.implementation.createHTMLDocument(object.title) :
                document.implementation.createDocument(
                    object.namespaceURI || null,
                    object.qualifiedNameStr,
                    object.documentType || null);
        case 'doctype' :
            return document.implementation.createDocumentType(
                object.name,
                object.publicId,
                object.systemId);
        default : throw Error('Unsupported node');
    }
};

export default toDOM;
