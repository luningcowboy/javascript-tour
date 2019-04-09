class BaseComponent{
    constructor(){
        this.enable = true;
        this.tag = 'BaseComponent';
    }
    setEnable(enable){
        this.enable = enable;
    }
    update(dt){
        if(!this.enable) return; 
    }
}

module.exports = BaseComponent;
