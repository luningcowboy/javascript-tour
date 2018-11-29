function AreaValue (){
    this.infos = [];
}

AreaValue.prototype.push = function(from, to, value){
    this.infos.push({from: from, to: to, value: value});
};

AreaValue.prototype.getValue = (data)=>{
    let numValue = parseFloat(data);
    for(let key in this.infos){
        let oneInfo = this.infos[key];
        if(numValue >= oneInfo.from && numValue <= oneInfo.to) return oneInfo.value;
    }
    return null;
};

AreaValue.prototype.acceptAreaJson = (areaJson)=>{
    for(let key in areaJson){
        let data = areaJson[key];
        this.push(data.from, data.to, data.value);
    }
};

module.exports = AreaValue;