let http = require('http');
class Client{
    static getInstance(){
        if(!Client._instance) Client._instance = new Client();
        return Client._instance;
    }
    start(){
        console.log('client start');
        
    }
    send(msg){
        console.log('client', 'send', JSON.stringify(msg));
    }
}
Client._instance = null;
module.exports = Client.getInstance();