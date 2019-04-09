try{
    require('dotenv').config({path: __dirname + "/../.env"});
}catch(e){}

var util = require('util');

function DebugHelper(){
    
}

DebugHelper.debug = null;
DebugHelper.debugName = null;

DebugHelper.init = (name)=>{
    DebugHelper.debugName = name;
    DebugHelper.debug = require('debug').name;
    DebugHelper.debug.log = console.log.bind(console);
};

DebugHelper.log = (fromatStr)=>{
    var args = Array.prototype.slice.call(arguments, 0, arguments.length);
    DebugHelper.debug.apply(DebugHelper.debug.args);
}
module.exprots = DebugHelper;
