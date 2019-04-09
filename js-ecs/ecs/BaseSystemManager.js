let BaseSystem = require('./BaseSystem.js');
class BaseSystemManager{
    static getInstance(){
        if(!BaseSystemManager._instance){
            BaseSystemManager._instance = new BaseSystemManager();
        }
        return BaseSystemManager._instance;
    }
    constructor(){
        this.systems = new Map();
    }
    init(){}
    regisetrSystemByTag(tag){
        if(!this.systems.has(tag)){
           let sys = new BaseSystem();
           this.systems.set(tag, sys);
        }
    }
    addComponentToSystem(component, system_tag){
        if(this.systems.has(system_tag)){
            this.systems.get(system_tag).addComponent(component);
        }
        else{
            this.regisetrSystemByTag(system_tag);
            this.systems.get(system_tag).addComponent(component);
        }
    }
    update(dt){
        console.log('delay_time', dt);
        this.systems.forEach(sys=>{
            sys.update(dt);
        });
    }
};
BaseSystemManager._instance = null;
module.exports = BaseSystemManager.getInstance();
