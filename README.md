# Document Object Notation

Document Object Notation (DON) - is a format intended for convenient work with HTML and XML documents in JavaScript. It consists of JS-objects with special fields.

## Examples

Text node:

```js
{
  node : 'text',
  content : 'Some text'
}
```

is equivalent to

```html
Some text
```

Element node:

```js
{
  element : 'a'
  attributes : { href : '//github.com', title : 'GitHub, social coding' },
  content : 'Go to GitHub'
}
```

is equivalent to

```html
<a href="//github.com" title="GitHub, social coding">Go to GitHub</a>
```
