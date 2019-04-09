var memwatch = require('memwatch-next');
var heapdump = require('heapdump');

class MemoryLeakManager{
    constructor(){}
    static writeMemory(path){
        heapdump.writeSnapshot(path + "//" + Date.now() + '.heapsnapshot');
    }

    static autoWatchMemory(path){
        memwatch.on('leak', function(info){
            heapdump.writeSnapshot(path + '//' + Date.now() + '.heapsnapshot');
        });
    }
}
module.exports = MemoryLeakManager;
