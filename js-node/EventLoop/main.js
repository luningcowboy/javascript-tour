let event = require('events');


let eventEmitter = new event.EventEmitter();
let connectHandler = ()=>{
    console.log('连接成功');
    eventEmitter.emit('data_reveived');
};

eventEmitter.on('connection',connectHandler);

eventEmitter.on('data_reveived',()=>{
    console.log('数据接收成功');
});

eventEmitter.emit('connection');

console.log('end');
