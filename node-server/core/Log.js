var bunyan = require('bunyan');
function Log(name, filePath){
    this.name = name;
    this.filePath = filePath;
    this.log = bunyan.createLogger({'name':name, streams:[{stream:process.stdout},{path: filePath}]});
}

Log.prototype.logInfo = function(infoJson){
    this.log.info({info: infoJson});
}


Log.prototype.logImportant = function(imJson){
    this.log.info({important: imJson});
}

Log.prototype.logError = function(errorJson){
    this.log.error({error: errorJson});
}

Log.prototype.logMessage = function(){
    this.log.info(arguments);
}

module.exports = Log;
