let http = require('http');
var url = require('url');
let server_config = {
    host:"localhost",
    port:10086
};
let client_config = {
    host:'localhost',
    port:10086,
    path:"/login"
};

http.createServer(function(request, response){
    console.log('s3 server');
    var pathname = url.parse(request.url).pathname;

    response.write('hello');
    response.end();
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

}).listen(server_config.port);
console.log('start s3 ', server_config);
