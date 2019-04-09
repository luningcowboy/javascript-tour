function CustomMath(){

}

CustomMath.Liancheng = function(baseValue, times){
    let ret = 1;
    for(let i = 0; i < times; ++i) ret *= baseValue;
    return ret;
}
module.exprots = CustomMath;
