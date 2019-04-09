var fs = require('fs');
var path = require('path');

function Config (){
    this.configJson = {};
};

Config.prototype.load = function(fileName){
    var jsonString = fs.readFileSync(path.normalize(__dirname + '/../' + fileName));
    this.configJson = JSON.parse(jsonString);
}

Config.prototype.get = function(key){
    return this.configJson[key];
}

module.exprots = Config;
