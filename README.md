# Document object notation

Document object notation (DON) — format intended for convenient work with HTML and XML documents in JavaScript.
It represents a DOM structure as a tree of simple JS-objects with some special fields.

## Simple Explanation

The most commonly used fields are:

- `element` — the name of `Element` DOM node
- `attributes` — attributes hash-object of `Element` DOM node
- `content` — content of `Element` DOM node

### Example
Consider simple UI fragment XML murkup:
```xml
<searchgroup label="Search by Yandex">
    <searchbox/>
    <submitbutton>Go</submitbutton>
</searchgroup>
```
It's DON representation is:
```js
{
    element : 'searchgroup',
    attributes : { label : 'Search by Yandex' },
    content : [
        { element : 'searchbox' },
        { element : 'submitbutton', content : 'Go' }
    ]
}
```

## Details

The `node` special field is used to specify the name of a DOM node represented by the object.<br> 
It supports the following values: `document`, `doctype`, `text`, `comment`, `element`.<br>
Depend on this value DON-object may have other special fields, such as: `element`, `attributes`, `content`, `name` etc.

### Examples

#### document
`Document` node DON equivalent
```js
{
    node : 'document',
    content : [/* document content */]
}
```

#### doctype
`DocumentType` node DON equivalent
```js
{
    node : 'doctype',
    name : 'html'
}
```

#### text
`Text` node DON equivalent
```js
{
    node : 'text',
    content : 'Hello world!'
}
```
Text node may be represented as a simple string:
```js
'Hello world!'
```

#### comment
`Comment` node DON equivalent
```js
{
    node : 'comment',
    content : 'Comment node text'
}
```

#### element
`Element` node DON equivalent
```js
{
    node : 'element',
    element : 'input'
}
```
When `element` field is specified, `node` may be omitted:
```js
{
    element : 'input'
}
```

## Installation

```
npm install https://github.com/aristov/DON.git --save
```

## Usage

#### Import module:
```js
import DON from 'DON';
```

#### Convert entire document to DON format:
```js
DON.fromDOM(document);
```
Result:
```js
{ node : 'document', content : <...> }
```

#### Convert XML string to DON format:
```js
DON.fromXML('<root><item foo="bar"/></root>')
```
Simplified result: 
```js
{ 
    node : 'document',
    content : {
        element : 'root',
        content : { 
            element : 'item', 
            attributes : { foo : 'bar' } 
        }
    } 
} 
```

#### Convert DON object to DOM node:
```js
DON.toDOM({ element : 'button', content : 'Submit' }); 
```
Result:
```js
<button>Submit</button>
```

#### Import methods separately:
```js
import fromDOM from 'DON/lib/fromDOM';
import fromXML from 'DON/lib/fromXML';
import toDOM from 'DON/lib/toDOM';
```

## Full feature example

Consider this simple HTML-document:

```html
<!doctype html>
<html>
    <head>
        <meta charset=utf-8>
        <title>DON example</title>
    </head>
    <body>
        <!-- hyperlink to DON repository -->
        <a href=//github.com/aristov/don>DON on GitHub</a>
    </body>
</html>
```

It's full DON representation is:

```javascript
{
    node : 'document',
    content : [
        {
            node : 'doctype',
            name : 'html'
        },
        {
            node : 'element',
            element : 'html',
            content : [
                {
                    node : 'element',
                    element : 'head',
                    content : [
                        {
                            node : 'element',
                            element : 'meta',
                            attributes : { charset : 'utf-8' }
                        },
                        {
                            node : 'element',
                            element : 'title',
                            content : {
                                node : 'text',
                                content : 'DON example'
                            }
                        }
                    ]
                },
                {
                    node : 'element',
                    element : 'body',
                    content : [
                        {
                            node : 'comment',
                            content : ' hyperlink to DON repository '
                        },
                        {
                            node : 'element',
                            element : 'a',
                            attributes : { href : '//github.com/aristov/don' },
                            content : {
                                node : 'text',
                                content : 'DON on GitHub'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

## License

[MIT](LICENSE)
