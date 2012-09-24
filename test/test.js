var assert = require("assert");
var moist = require("../moist.js");

describe("Moist", function() {
    describe("#html(obj)", function() {

        it("should generate an empty div", function() {
            assert.equal('<div></div>', moist.html({div: []}));
        });

        it("should generate a div with class", function() {
            var object = {div: [], _class: "content"},
                expected = '<div class="content"></div>',
                actual = moist.html(object);
            assert.equal(actual, expected);
        });

        it("should generate a div with class and content", function() {
            var object = {div: ["bobbins"], _class: "content"},
                expected = '<div class="content">bobbins</div>',
                actual = moist.html(object);
            assert.equal(actual, expected);
        });

        it("should generate a div with class and nested content", function() {
            var object = {div: [{h1: ["bobbins"]}], _class: "content"},
                expected = '<div class="content"><h1>bobbins</h1></div>',
                actual = moist.html(object);
            assert.equal(actual, expected);
        });

        it("should generate a div with class and nested contents", function() {
            var object = {div: [{h1: ["bobbins"]}, {p: ["nonsense"]}], _class: "content"},
                expected = '<div class="content"><h1>bobbins</h1><p>nonsense</p></div>',
                actual = moist.html(object);
            assert.equal(actual, expected);
        });

        it("should generate two divs from an array", function() {
            var object = [{div:[], _class: "span3"},{div: [], _class: "span9"}],
                expected = '<div class="span3"></div><div class="span9"></div>',
                actual = moist.html(object);
            assert.equal(actual, expected);
        });

        it("should not generate a closing tag for img", function() {
            var object = {img: [], src: "foo.png"},
                expected = '<img src="foo.png">',
                actual = moist.html(object);
            assert.equal(actual, expected);
        });

        it("should concatenate variables", function() {
            var name = "Marvin",
                object = {div: ["Hello ", name, "!"]},
                expected = '<div>Hello Marvin!</div>',
                actual = moist.html(object);
            assert.equal(actual, expected);
        });

        it("should change underscores to hyphens", function() {
            var object = {div: [], ng_view: null},
                expected = '<div ng-view></div>',
                actual = moist.html(object);
            assert.equal(actual, expected);
        }); 
    });
});