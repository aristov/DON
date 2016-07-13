# Document Object Notation

Document Object Notation (DON) - is a format intended for convenient work with HTML and XML documents in JavaScript.
It represents a tree of simple JS-objects with some special fields.

## Example
Consider this XML UI fragment murkup:
```xml
<searchgroup label="Search by Yandex">
    <searchbox/>
    <submitbutton>Go</submitbutton>
</searchgroup>
```
```js
{
    element : 'searchgroup',
    attributes : { label : 'Simple' },
    content : [
        { element : 'searchbox' },
        { element : 'submitbutton', content : 'Go' }
    ]
}
```

## Description

<details>
The list of DON special fields:

### node
Name of the DOM node represented by the object.
Can recieve values, representing several DOM nodes:

- `document`
- `doctype`
- `text`
- `comment`
- `element`

<small>Example</small>
```js
{
    node : 'document'
}
```
Depending of a value of this field the object can have additional fields.

### text
`TextNode` DON equivalent
```js
{
    node : 'text',
    text : 'Hello world!'
}
```

### element
`Element` DON equivalent
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

### attributes
Represents attributes hash-object of `Element`.
```js
{
    element : 'checkbox',
    attributes : {
        checked : 'true',
        view : 'button',
        name : 'confirm'
    }
}
```

### children
Represents an array of children of `element` or `document` node.
Accepts only array of nodes, no other stuff.
```js
{
    node : 'document',
    children : [{ element : 'html' }]
}
```
```js
{
    element : 'list',
    children : [
        { element : 'item', content : 'First item' },
        { element : 'item', content : 'Second item' }
    ]
}
```

### content
Represents arbitrary content of `element` node.
```js
{
    element : 'form',
    content : [
        'Form title',
        { element : 'input' },
        { element : 'button', text : 'Submit' }
    ]
}
```


### comment
`Comment` DON equivalent
```js
{
    node : 'comment',
    comment : 'Something strange'
}
```

### document
`Document` DON equivalent
```js
{
    node : 'document',
    title : 'Fuck you!'
}
```

### doctype
`DocumentType` DON equivalent
```js
{
    node : 'doctype',
    doctype : 'html'
}
```
</details>

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

It's DON representation is:

```javascript
{
    node : 'document',
    children : [
        {
            node : 'doctype',
            doctype : 'html'
        },
        {
            element : 'html',
            children : [
                {
                    element : 'head',
                    children : [
                        {
                            element : 'meta',
                            attributes : { charset : 'utf-8' }
                        },
                        {
                            element : 'title',
                            content : {
                                node : 'text',
                                text : 'DON example'
                            }
                        }
                    ]
                },
                {
                    element : 'body',
                    children : [
                        {
                            node : 'comment',
                            comment : ' hyperlink to DON repository '
                        },
                        {
                            element : 'a',
                            attributes : { href : '//github.com/aristov/don' },
                            content : {
                                node : 'text',
                                text : 'DON on GitHub'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```
