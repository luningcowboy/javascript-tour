var marked = require('marked');

// 同步使用 highlight.js 转换代码
marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value
    }
});

var markdownString = '```js\n console.log("hello"); \n```';
var HTMLString = marked(markdownString);

let template = '';