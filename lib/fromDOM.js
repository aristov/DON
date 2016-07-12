const map = Array.prototype.map;
const reduce = Array.prototype.reduce;

const processChildNodes = node => map.call(node.childNodes, child => fromDOM(child));

const { ELEMENT_NODE, TEXT_NODE, COMMENT_NODE, DOCUMENT_NODE, DOCUMENT_TYPE_NODE } = Node;

const fromDOM = node => {
    switch(node.nodeType) {
        case ELEMENT_NODE : return {
            node : 'element',
            element : node.tagName,
            attributes : reduce.call(node.attributes, (res, attr) => {
                res[attr.name] = attr.value;
                return res;
            }, {}),
            content : processChildNodes(node)
        };
        case TEXT_NODE : return {
            node : 'text',
            content : node.textContent
        };
        case COMMENT_NODE : return {
            node : 'comment',
            content : node.textContent
        };
        case DOCUMENT_NODE : return {
            node : 'document',
            content : processChildNodes(node)
        };
        case DOCUMENT_TYPE_NODE : return {
            node : 'doctype',
            name : node.name
        };
        default : throw Error('Unsupported node');
    }
};

export default fromDOM;
