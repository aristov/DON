import fromDOM from './fromDOM';

/**
 * Converts XML-string to DON-tree
 * @param {String} xml
 * @returns {Object} Document object notation
 */
const fromXML = xml => {
    const document = parser.parseFromString(xml, 'application/xml');
    return fromDOM(document);
};

const parser = new DOMParser;

export default fromXML;
