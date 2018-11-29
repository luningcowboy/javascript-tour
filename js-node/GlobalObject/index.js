console.log(__filename);// 当前正在执行的脚本名字
console.log(__dirname);// 当前执行代码所在的目录
function printHello(){
    console.log('HelloWorld');
}

let t = setTimeout(printHello, 2000);

clearTimeout(t);

let index = 0;
let tmp_interval = null;
function testInterval(){
    console.log('testInterval');
    if(index === 5) {
        clearInterval(tmp_interval);
    }
    index++;
}
tmp_interval = setInterval(testInterval, 500);


process.on('exit', function(code){
    console.log('退出代码为:', code);
});
