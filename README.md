# Document Object Notation

Document Object Notation (DON) — is a format intended for convenient work with HTML and XML documents in JavaScript.
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
    attributes : { label : 'Simple' },
    content : [
        { element : 'searchbox' },
        { element : 'submitbutton', content : 'Go' }
    ]
}
```

## Details

`node` special field is used to specify the name of a DOM node represented by the object:

- `document`
- `doctype`
- `text`
- `comment`
- `element`

### Examples

#### document
`Document` node DON equivalent
```js
{
    node : 'document',
    title : 'Document title'
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
'Hello baby!'
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
