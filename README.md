# moist.js

Just a really lightweight way of specifying HTML as JavaScript objects, so you don't get all kinds of messy markup strings inside your JS, and you don't have to manipulate the DOM directly which is slooooow.

## Usage

This:
```javascript
Moist.html({div:[]});
```
produces
```html
<div></div>
```

This:
```javascript
Moist.html({div:["Moist!"]});
```
produces
```html
<div>Moist!</div>
```

This:
```javascript
Moist.html({div:[{h1:["Moist!"]}], id: "main", _class: "container"});
```
produces
```html
<div id="main" class="container"><h1>Moist!</h1></div>
```

Check out [the tests](https://github.com/markrendle/moist.js/blob/master/test/test.js) for more info.