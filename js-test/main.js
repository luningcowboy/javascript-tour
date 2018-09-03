
let test_random = ()=>{
    let mp = new Map([[1017,[0,20]],[1018,[21,50]],[1019,[51,100]]]);
    console.log(mp);
    let rand = Math.random()*100;
    let idx = -1;
    for( let [k,v] of mp){
        if(rand >= v[0] && rand < v[1]){
            idx = k;
            break;
        }
    }
    console.log(idx);
};
let zhubao_endless = {
        "level": [0, 20, 50, 100, 150, 200, 250, 300, 1000000],
        "zhubao": [
            { "deep":2, "d1":1 },
            { "deep":4, "d1":1, "d2":1 },
            { "deep":6, "d1":1, "d2":1, "d3":1 },
            { "deep":8, "d1":1, "d2":1, "d3":1 },
            { "deep":10, "d1":2, "d2":1, "d3":1 },
            { "deep":10, "d1":2, "d2":2, "d3":1 },
            { "deep":10, "d1":2, "d2":2, "d3":2 },
            { "deep":10, "d1":3, "d2":2, "d3":3 }
        ]
};
let test_read_endless_config = ()=>{
    let endless_level = 0;
    let getRandomZhuBaoConfig = function(){
        let zhubao_config = zhubao_endless;
        let level = zhubao_config.level;
        let zhubao = zhubao_config.zhubao;
        for(let i = 0;i < level.length; i++){
            let e = level[i];
            if(i > 0 && endless_level < e && endless_level >= level[i - 1]){
                return zhubao[i - 1];
            }
        }
        return -1;
    };
    let tmp_fill_idx = {};
    tmp_fill_idx[1] = [1,2,3];
    tmp_fill_idx[5] = [111,110,109];
    tmp_fill_idx[3] = [12,13,14];
    let zhubao_map = new Map([['d1',112],['d2',113],['d3',114]]);
    let zhubao_config = getRandomZhuBaoConfig();
    console.log('无尽模式===>',zhubao_config,Object.keys(zhubao_config),zhubao_map);
    if(zhubao_config !== -1){
        let deep = zhubao_config.deep;
        let zhubao_keys = Object.keys(zhubao_config);
        let max = 0;
        zhubao_keys.forEach(element => {
            if(element !== 'deep'){
                max += zhubao_config[element];
            }
        });
        console.log(max);
        let row_keys = Object.keys(tmp_fill_idx);
        let cur_idx = row_keys.length - 1;
        let useable_fill_idx = [];
        while (deep > 0) {
            let tmp_key = row_keys[cur_idx];
            console.log(`key:${tmp_key}, deep:${deep}`);
            useable_fill_idx.push(...tmp_fill_idx[tmp_key]);
            cur_idx--;
            deep--;
        }
        console.log(useable_fill_idx);
        let current_fill_idx = 0;
        zhubao_keys.forEach(element => {
            if(zhubao_map.has(element)){
                let zhubao_key = zhubao_map.get(element);
                let value = zhubao_config[element]
                for(let i = 0; i < value; i++){
                    useable_fill_idx[current_fill_idx++] = zhubao_key;
                }
            }
        });
        console.log(useable_fill_idx);
    }


};

function main(){

    //test_random();
    // let arr = [];
    // let max = 100000;
    // for(let i = 0; i < max; i++){
    //     let rand = parseInt(Math.random() * 100);
    //     arr[rand] ? arr[rand]++ : (arr[rand] = 1);
    // }
    // arr = arr.map( (t,v) => {
    //     return {t,v,r:t / max};
    // });
    // console.log(arr);

    test_read_endless_config();

}

main();