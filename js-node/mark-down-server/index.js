let fs = require('fs');
let marked = require('marked');

let hljs = require('highlight.js');
let javascript = require('highlight.js/lib/languages/javascript');

for(let key in hljs) console.log(key);

hljs.registerLanguage('js',javascript);

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
  }
});

fs.readFile('test.md','utf-8', (err, data)=>{
    if(!err){
        let html = marked(data);
        let t1 = `<link href="https://cdn.bootcss.com/github-markdown-css/2.8.0/github-markdown.min.css" rel="stylesheet">
        <link href="https://cdn.bootcss.com/highlight.js/9.12.0/styles/github-gist.min.css" rel="stylesheet"> `;
        //let t2 = `<script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>  `;
        //let t3 = `<script >hljs.initHighlightingOnLoad();</script> `;
        console.log(html);
        fs.writeFile('public/test6.html', t1  + html,()=>console.log('success'));
    }
});