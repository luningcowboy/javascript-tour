let bunyuan = require('bunyuan');

function Log(name, filePath){
    this.name = name;
    this.filePath = filePath;
    this.log = bunyuan.createLogger({'name': name, streams:[{stream: process.stdout}, {path: filePath}]});
}
Log.prototype.logInfo = (infoJson)=>{
    this.log.info({info: infoJson});
};
Log.prototype.logImportant = (imJson)=>{
    this.log.info({important: imJson});
};
Log.prototype.logError = (errJson)=>{
    this.log.info({error: errJson});
};
Log.prototype.logMessage = ()=>{
    this.log.info(arguments);
};
module.exprots = Log;
