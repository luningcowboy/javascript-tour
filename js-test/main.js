
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

function test_map(){
    let m = new Map();
    m.set(111,[0,1]);
    m.set(112,[0,2]);
    m.set(113,[0,3]);
    for(let e of m){
        console.log(e);
    }
}

function test_loop(){
    for(let i = 0; i < 10; i++) console.log(`xxxx${i}`);
    for(let i = 0; i < 10; ++i) console.log(`yyyy${i}`);
    // ! 循环的时候尽量减少使用i++,i++会比++i多一次开销
}

function test_creat_road(){
    let BlocksMap = [
        [1],
        [0,2],
        [1,3],
        [2,4],
        [3,5],
        [4,6],
        [5,7],
        [6,8],
        [7,9],
        [8]
    ];
    let AllBlocks = [
        '1000000000', // 0
        '0100000000', // 1
        '0010000000', // 2
        '0001000000', // 3
        '0000100000', // 4
        '0000010000', // 5
        '0000001000', // 6
        '0000000100', // 7
        '0000000010', // 8
        '0000000001', // 9
    ];

    let current = AllBlocks[parseInt(AllBlocks.length * Math.random())];
    let info = '';
    for(let i = 0; i < 100000; i++){
        let arr = [...current];
        let idx = arr.indexOf("1");
        let next_arr = BlocksMap[idx];
        if(next_arr.length === 2) current = AllBlocks[Math.random() > 0.5 ? next_arr[0] : next_arr[1]];
        else if(next_arr.length === 1) current = AllBlocks[next_arr[0]];
        info += next_arr[0];
    }
    console.log(info);
}

function test1010 (){
    let board = [];
    let col = 8;
    let row = 8;
    
    return {
        initBoard:function(){
            for(let r = 0; r < row; ++r){
                let line = [];
                for(let c = 0; c < col; ++c){
                    line.push(0);
                }
                board.push(line);
            }
        },
        randomFill:function(){
            for(let r = 0; r < row; ++r){
                for(let c = 0; c < col; ++c){
                    board[r][c] = Math.random() > 0.5 ? 1 : 0; 
                }
            }
        },
        isCanFillByConfig:function(config){
            let ret = false;
            return ret;
        },
        parseConfig:function(config){
            let pos1st = null;
            let pos_list = [[0,0]];
            for(let r = 0; r < config.length; ++r){
                for(let c = 0; c < config[r].length; ++c){
                    if(config[r][c] >= 1){
                        if(pos1st === null){
                            pos1st = [];
                            pos1st[0] = r;
                            pos1st[1] = c;
                        }
                        else{
                            let pos_dis = [];
                            pos_dis[0] = pos1st[0] - r;
                            pos_dis[1] = c - pos1st[1];
                            pos_list.push(pos_dis);
                        }
                    }
                }
            }
            return pos_list;
        }
    };
}

function outputBlocks(block_config, block_dis){
    console.log("\n************************\n");
    for(let r = 0; r < block_config.length; ++r){
        let line = block_config[r];
        let info = '';
        for(let c = 0; c < line.length; ++c){
            let v = block_config[r][c];
            if(v > 0) info += ' x';
            else info += ' o';
        } 
        console.log(info, '  ', line);
    }
    console.log('------------------------');
    let blocMap = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ];
    let isCanFill = (r,c)=>{
        //console.log('iscanfill',r,c);
        let fill_len = 0;
        for(let i = 0; i < block_dis.length; ++i){
            let [rr,cc] = [...block_dis[i]];
            rr = r + rr;
            cc = c + cc;
            if(rr >= 0 && rr < 5 && cc >= 0 && cc < 5){
                fill_len++;
            }
        }
        if(fill_len === block_dis.length) return true;
        return false;
    };
    let fillBlockMap = (r,c)=>{
        for(let i = 0; i < block_dis.length; ++i){
            let [rr,cc] = [...block_dis[i]];
            rr = r + rr;
            cc = c + cc;
            blocMap[rr][cc] = 1;
        }
    };
    let is_filled = false;
    for(let r = 0; r < blocMap.length; ++r){
        let line = blocMap[r];
        for(let c = 0; c < line.length; ++c){
            if(!is_filled && isCanFill(r, c)){
                fillBlockMap(r, c);
                is_filled = true;
                break;
            }
        }
    }
    for(let r = 0; r < blocMap.length; ++r){
        let line = blocMap[r];
        let info = '';
        for(let c = 0; c < line.length; ++c){
            let v = blocMap[r][c];
            if(v > 0) info += ' x';
            else info += ' o';
        } 
        console.log(info, '  ', line);
    }
}

function formatIp(info){
    //当前 IP：106.121.74.190  来自于：中国 北京 北京  电信
    return info.split('：')[2].split(' ');
}



function main(){
    // let rand = Math.random();
    // let rate = 0.1;
    // let a = rate || 0.5;
    // console.log(a, rand);

    let pj_config = [0,6,10,14];
    let pj_num = 15;
    console.log(parseInt(pj_config[pj_config.length]));
    if(pj_num > pj_config[pj_config.length]){
        console.log('xxxxxx');
    }
    else{
        console.log('yyyyy');
    }
  
    // let Blocks = [
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,0,0],
    //         [0,0,1,0,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,2,0,0],
    //         [0,0,2,0,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,0,0],
    //         [0,0,2,2,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,3,0,0],
    //         [0,0,3,0,0],
    //         [0,0,3,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,0,0],
    //         [0,3,3,3,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,0,0],
    //         [0,4,4,4,4],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,4,0,0],
    //         [0,0,4,0,0],
    //         [0,0,4,0,0],
    //         [0,0,4,0,0],
    //         [0,0,0,0,0] 
    //     ],
    //     [
    //         [0,0,5,0,0],
    //         [0,0,5,0,0],
    //         [0,0,5,0,0],
    //         [0,0,5,0,0],
    //         [0,0,5,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,0,0],
    //         [5,5,5,5,5],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,6,0,0],
    //         [0,0,6,0,0],
    //         [0,6,6,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,6,6,0,0],
    //         [0,0,6,0,0],
    //         [0,0,6,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,6,0],
    //         [0,6,6,6,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,6,0,0,0],
    //         [0,6,6,6,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,1,1,0,0],
    //         [0,1,1,0,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,2,2,2,0],
    //         [0,2,2,2,0],
    //         [0,2,2,2,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,3,3,3,0],
    //         [0,0,0,3,0],
    //         [0,0,0,3,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,3,0,0,0],
    //         [0,3,0,0,0],
    //         [0,3,3,3,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,4,4,4,0],
    //         [0,4,0,0,0],
    //         [0,4,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,5,0],
    //         [0,0,0,5,0],
    //         [0,5,5,5,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,6,0,0,0],
    //         [0,6,6,0,0],
    //         [0,0,6,0,0],
    //         [0,0,0,0,0] 
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,1,1,0],
    //         [0,1,1,0,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,2,0,0],
    //         [0,2,2,2,0],
    //         [0,0,0,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,3,0,0],
    //         [0,3,3,0,0],
    //         [0,0,3,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,2,0,0],
    //         [0,0,2,2,0],
    //         [0,0,2,0,0],
    //         [0,0,0,0,0]
    //     ],
    //     [
    //         [0,0,0,0,0],
    //         [0,0,0,0,0],
    //         [0,2,2,2,0],
    //         [0,0,2,0,0],
    //         [0,0,0,0,0]
    //     ]
    // ];
    // let tt = new test1010();
    // tt.initBoard();
    // tt.randomFill();
    // let configs = [];
    // for(let i = 0; i < Blocks.length; ++i){
    //     let config = tt.parseConfig(Blocks[i]);
    //     configs.push(config);
    //     outputBlocks(Blocks[i], config);
    // }
    // console.log(configs);
    // let config = tt.parseConfig(Blocks[21]);
    // outputBlocks(Blocks[21], config);
    // console.log(config);
    //console.log(configs);
    //test_creat_road();
    //test_map();
    //test_loop();
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

    //test_read_endless_config();

    // function f(a,b,m){
    //     let ret = [];
    //     let t = [1,2];
    //     //2*2
    //     //2*2*2
    //     //2*2*2*2
    //     //2*2*2*2*2
    //     return ret;
    // }
    let BoomClearBlocks = [
        [0, 2], [-1, 1] ,[0, 1] ,
        [1, 1], [-2, 0] ,[-1, 0] ,
        [0, 0], [1, 0]  ,[2, 0],
        [-1,-1],[0,-1]  ,[1,-1],[0,-2]
    ];
    // BoomClearBlocks.forEach(([r, c])=>{
    //     console.log(r,c);
    // });
    let s1 = Math.sin(60);
    console.log(s1);

    let a = 15;
    for(let i = 0; i < 100; ++i){
        console.log(i % a);
    }
}

main();

