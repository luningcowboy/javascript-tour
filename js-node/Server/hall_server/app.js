var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname + './public'));

server.listen(5002);

io.on('connection', function(socket){
    socket.on('hi', function(data){
        console.log(data);
        socket.emit('c_hi', 'hello too!');
    });
    socket.on('disconnect', function(data){
        console.log('disconnect', data);
        socket.lemit('c_leave', '离开');
    });
});

console.log('login server start');