# Document Object Notation

Document Object Notation (DON) - is a format intended for convenient work with HTML and XML documents in JavaScript.
It represents a tree of simple JS-objects with some special fields.

## Simple Explanation

The most commonly used fields are:

- `element` - the name of `Element` DOM node
- `attributes` - attributes hash-object of `Element` DOM node
- `content` - content of `Element` DOM node

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
    attributes : { label : 'Simple' },
    content : [
        { element : 'searchbox' },
        { element : 'submitbutton', content : 'Go' }
    ]
}
```

## Details

Key DON special fields are listed below.

### node
Name of the DOM node represented by the object.
Can recieve values, representing several DOM nodes:

- `document`
- `doctype`
- `text`
- `comment`
- `element`

```js
{
    node : 'document'
}
```
Depending of a value of this field the object can have additional fields.

#### DON nodes description

##### text
`Text` node DON equivalent
```js
{
    node : 'text',
    content : 'Hello world!'
}
```
Text node may be represented as a simple string:
```js
'Hello baby!'
```

##### element
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

##### comment
`Comment` node DON equivalent
```js
{
    node : 'comment',
    content : 'Comment node text'
}
```

##### document
`Document` node DON equivalent
```js
{
    node : 'document',
    title : 'Document title'
}
```

##### doctype
`DocumentType` node DON equivalent
```js
{
    node : 'doctype',
    name : 'html'
}
```

### attributes
Represents attributes hash-object of `Element` node.
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

### content
Represents content of `element`, `text`, `document` or `comment` node.
```js
{
    node : 'document',
    content : [
        { node : 'comment', content : 'Comment text' },
        { node : 'text', content : 'Text node content' },
        { element : 'button', content : 'Submit' }
    ]
}
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

It's DON representation is:

```javascript
{
    node : 'document',
    content : [
        {
            node : 'doctype',
            name : 'html'
        },
        {
            element : 'html',
            content : [
                {
                    element : 'head',
                    content : [
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
                    content : [
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
