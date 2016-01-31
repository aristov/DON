# Document Object Notation

Document Object Notation (DON) - is a format intended for convenient work with HTML and XML documents in JavaScript.
It consists of JS-objects with special fields.

## Example

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

```js
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
                                content : 'DON example'
                            }
                        }
                    ]
                },
                {
                    element : 'body',
                    content : [
                        {
                            node : 'comment',
                            content : ' hyperlink to DON repository '
                        },
                        {
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
