class BaseSystem{
    constructor(){
        this.components = []; 
    }
    addComponent(com){
        this.components.push(com);
    }
    removeComponent(com){
        let idx = this.components.indexOf(com);
        if(idx >= 0) this.components.slice(idx, 1);
    }
    update(dt){
        this.components.forEach(com=>{
            if(com) com.update(dt);
        });
    }
};


module.exports = BaseSystem;
