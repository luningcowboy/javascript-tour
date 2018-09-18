let fs = require('fs');

let data = fs.readFileSync('input.txt');

console.log(data.toString());

fs.readFile('input.txt',(err, data)=>{
    console.log(err, data);
});