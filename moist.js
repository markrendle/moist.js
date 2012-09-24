; (function () {
    var voidTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source'];
    function isVoid(tag) {
        return voidTags.indexOf(tag.toLowerCase()) > -1;
    }
    function typeOf(value) {
        var s = typeof value;
        if (s === 'object') {
            if (value) {
                if (value instanceof Array) {
                    s = 'array';
                }
            } else {
                s = 'null';
            }
        }
        return s;
    }
    function arrayToHtml(array) {
        var html = '';
        for (var i = 0; i < array.length; i++) {
            switch (typeOf(array[i])) {
                case "string":
                case "number":
                    html = html + array[i];
                    break;
                case "object":
                    html = html + toHtml(array[i]);
                    break;
                case "array":
                    html = html + arrayToHtml(array[i]);
                    break;
            }
        };
        return html;
    }
    function stringToTag(str) {
        return str.indexOf('_') < 0 ? str
            :
            str.replace(/^_+/, '')
                .replace(/_+$/, '')
                .replace(/_/, '-');
    }
    function objectToHtml(object) {
        var tag = "",
            html = "",
            attributes = "";
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                var value = object[key];
                switch (typeOf(value)) {
                    case "array":
                        tag = stringToTag(key);
                        break;
                    case "string":
                    case "number":
                        attributes = attributes + ' ' + stringToTag(key) + '="' + value + '"';
                        break;
                    case "boolean":
                        attributes = attributes + ' ' + stringToTag(key) + '="' + (value ? 'true' : 'false') + '"';
                        break;
                    case "null":
                        attributes = attributes + ' ' + stringToTag(key);
                        break;
                }
            }
        }
        if (tag.length > 0) {
            html = '<' + tag + attributes + '>';
            if (object[tag].length > 0) {
                html = html + arrayToHtml(object[tag]);
            }
            if (!isVoid(tag)) {
                html = html + '</' + tag + '>';
            }
            return html;
        }
        throw new Error("Fail");
    }
    function toHtml(object) {
        switch (typeOf(object)) {
            case "object":
                return objectToHtml(object);
                break;
            case "array":
                return arrayToHtml(object);
                break;
            default:
                return object;
        };
    }
    var moist = { html: toHtml }
    if (typeof window !== "undefined") {
        window.Moist = moist;
    } else {
        if (typeof exports !== "undefined") {
            exports.html = toHtml;
        }
    }
    if (typeof define === "function" && define.amd) {
        define(function () {
            return moist;
        });
    }
    return moist;
})();