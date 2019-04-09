let SystemManager = require('./BaseSystemManager.js');
class BaseEntity{
    constructor(){
        this.components = [];
    }
    addComponent(com){
        this.components.push(com);
        SystemManager.addComponentToSystem(com, com.tag);
    }
    removeComponent(com){
        let idx = this.components.indexOf(com);
        this.components.slice(idx, 1);
    }
}


module.exports = BaseEntity;
