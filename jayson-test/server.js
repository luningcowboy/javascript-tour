var jayson = require('jayson');


var server = jayson.server({
    brest: function(args, callback){
        console.log(args);
        callback(null, args[0] + args[1]);
    }
}
);

server.http().listen(3000);
