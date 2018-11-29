let http = require('http');
class Server{
    static getInstance(){
        if(!Server._instance) Server._instance = new Server();
        return Server._instance;
    }
    start(){
        console.log('server start');
        http.createServer(function(request, response){
            console.log('server xxxxx');
            login.client.send({a:1,b:2});
        }).listen(8080);
    }
}
Server._instance = null;
module.exports = Server.getInstance();