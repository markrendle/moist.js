# moist.js

Just a really lightweight way of specifying HTML as JavaScript objects, so you don't get all kinds of messy markup strings inside your JS, and you don't have to manipulate the DOM directly which is slooooow.

## Usage

To generate this HTML:

```html
<div id="content"><h1>Moist!</h1></div>
```

use this:

```javascript
Moist.html({div:[{h1:["Moist!"]}], id: "content"});
```

Check out [the tests](https://github.com/markrendle/moist.js/blob/master/test/test.js) for more info.