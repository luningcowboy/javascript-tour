let http = require('http');

let server_config = {
    host:"localhost",
    port:8080
};
let client_config = {
    host:'localhost',
    port:8090,
    path:"/"
};

http.createServer(function(request, response){
    console.log('s1 server');
}).listen(server_config.port);

http.request(client_config,(response)=>{
    http.request(client_config,(response)=>{
        response.on('data',(data)=>{
            console.log('s1 data');
        });
        response.on('end',()=>{
            console.log('s1 data end');
        });
    });
});

console.log('start s1 ', server_config);
