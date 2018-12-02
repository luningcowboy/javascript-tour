let markdown = require('markdown').markdown;


for(let key in markdown) console.log(key);

let fs = require('fs');


fs.readFile('test.md','utf-8', (err, data)=>{
    if(!err){
        //let doc = markdown.toHTML(data);
        //console.log(doc);
        fs.writeFile('public/test2.html', markdown.toHTML(data),()=>console.log('success'));
    }
});