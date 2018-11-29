let fs = require('fs');

fs.readFile('input.txt', function(err, data){
    if(err) return console.error(err);
    console.log('异步读取:', data.toString());
});

var data = fs.readFileSync('input.txt');
console.log('同步读取:', data.toString());

// ! 打开文件 fs.open/openSync
fs.open('input.txt', 'r+', function(err, fd){
    if(err) return console.error(err);
    console.log('文件打开成功');
});

// ! 获取文件信息 fs.stat
fs.stat('input.txt', function(err, stats){
    if(err) return console.error(err);
    console.log(stats);
    console.log('是否是文件',stats.isFile());
    console.log('是否是文件夹', stats.isDirectory());
});

// ! 写入文件 fs.writeFile

fs.writeFile('output.txt','测试写入程序',function(err){
    if(err) return console.error(err);
    console.log('写入数据成功');
});

console.log('end');