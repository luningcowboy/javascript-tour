let JSZip = require('./jszip.min.js');
let fs = require('fs');

let test_zip = ()=>{
    console.log('test_zip');
    var zip = new JSZip();
    zip.file("Hello.txt", "Hello World\n");
    var promise = null;
    if (JSZip.support.uint8array) {
        promise = zip.generateAsync({type : "uint8array"});
    } else {
        promise = zip.generateAsync({type : "string"});
    }
    promise.then(content=>{
        console.log(content);
        fs.writeFile('./test.zip',content,
        err=>{
            if(err) console.log(err);
            console.log('Saved.');
        }
        );
    }).catch(e=>console.log(e));
    // var promise = null;
    // if (JSZip.support.uint8array) {
    // promise = zip.generateAsync({type : "uint8array"});
    // } else {
    // promise = zip.generateAsync({type : "string"});

};

test_zip();