class MySplit{
    constructor(value){
        this.value = value;
    }
    [Symbol.split](string){
        let idx = string.indexOf(this.value);
        if(idx === -1) return string;
        return[
            string.substr(0,idx),
            string.substr(idx + this.value.length)
        ];
    }
}

module.exports = MySplit;