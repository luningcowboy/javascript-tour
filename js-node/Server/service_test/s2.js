let http = require('http');

let server_config = {
    host:"localhost",
    port:8090
};
let client_config = {
    host:'localhost',
    port:8080,
    path:"/"
};

http.createServer(function(request, response){
    console.log('s2 server');
    http.request(client_config,(response)=>{
        response.on('data',(data)=>{
            console.log('s2 data');
        });
        response.on('end',()=>{
            console.log('s2 data end');
        });
    });

}).listen(server_config.port);
console.log('start s2 ', server_config);
