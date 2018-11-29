let BOARD = [];
let [M_ROW,M_COL] = [8,8];
let Blocks = [
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,2,0,0],
        [0,0,2,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,2,2,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,3,0,0],
        [0,0,3,0,0],
        [0,0,3,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,3,3,3,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,4,4,4,4],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,4,0,0],
        [0,0,4,0,0],
        [0,0,4,0,0],
        [0,0,4,0,0],
        [0,0,0,0,0] 
    ],
    [
        [0,0,5,0,0],
        [0,0,5,0,0],
        [0,0,5,0,0],
        [0,0,5,0,0],
        [0,0,5,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [5,5,5,5,5],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,6,0,0],
        [0,0,6,0,0],
        [0,6,6,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,6,6,0,0],
        [0,0,6,0,0],
        [0,0,6,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,6,0],
        [0,6,6,6,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,6,0,0,0],
        [0,6,6,6,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,1,1,0,0],
        [0,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,2,2,2,0],
        [0,2,2,2,0],
        [0,2,2,2,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,3,3,3,0],
        [0,0,0,3,0],
        [0,0,0,3,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,3,0,0,0],
        [0,3,0,0,0],
        [0,3,3,3,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,4,4,4,0],
        [0,4,0,0,0],
        [0,4,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,5,0],
        [0,0,0,5,0],
        [0,5,5,5,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,6,0,0,0],
        [0,6,6,0,0],
        [0,0,6,0,0],
        [0,0,0,0,0] 
    ],
    [
        [0,0,0,0,0],
        [0,0,1,1,0],
        [0,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,2,0,0],
        [0,2,2,2,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,2,0,0],
        [0,2,2,0,0],
        [0,0,2,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,2,0,0],
        [0,0,2,2,0],
        [0,0,2,0,0],
        [0,0,0,0,0]
    ],
    [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,2,2,2,0],
        [0,0,2,0,0],
        [0,0,0,0,0]
    ]
];
let BlockDis = [ [ [ 0, 0 ] ],
[ [ 0, 0 ], [ 0, 1 ] ],
[ [ 0, 0 ], [ 1, 0 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 0, 3 ], [ 0, 4 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ -1, 2 ], [ 0, 2 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
[ [ 0, 0 ], [ -2, 1 ], [ -1, 1 ], [ 0, 1 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 2, 1 ], [ 2, 2 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 0, 1 ], [ 0, 2 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ -2, 2 ], [ -1, 2 ], [ 0, 2 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 1, 2 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ -1, 1 ], [ 0, 1 ] ],
[ [ 0, 0 ], [ -1, 1 ], [ 0, 1 ], [ 1, 1 ] ],
[ [ 0, 0 ], [ -1, 1 ], [ 0, 1 ], [ 0, 2 ] ],
[ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 0, 2 ] ],
[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 1, 1 ] ] ];
let MaxDeep = 1;
const DeepAddScore = 10;
const StepsAddScore = 5;

function initBoard(){
    for(let r = 0; r < M_ROW; ++r){
        let line = [];
        for(let c = 0; c < M_COL; ++c){
            line.push(0);
        }
        BOARD.push(line);
    }
}

function outputBoard(){
    for(let r = BOARD.length - 1; r >= 0; --r){
        console.log("Row", r ,BOARD[r]);
    }
}
// * 返回[row,col]数组
function getFillPosArray(tmp_board, block_idx){
    let ret = [];
    for(let r = 0; r < tmp_board.length; ++r){
        let line = tmp_board[r];
        for(let c =  0; c < line.length; ++c){
            let block_dis = BlockDis[block_idx];
            let fill_num = 0;
            block_dis.forEach(e=>{
                let [tr, tc] = [r+e[1],r+e[0]];
                if(tr >= 0 && tr < M_ROW && tc >= 0 && tc < M_COL && tmp_board[tr][tc] <= 0){
                    fill_num++;
                }
            });
            if(fill_num === block_dis.length) ret.push([r,c]);
        }
    }
    return ret;
}
// * 返回填充后的Board
function tmpFill(tmp_board, tr, tc, block_idx){
    let block_dis = BlockDis[block_idx];
    block_dis.forEach(e=>{
        let [r,c] = [tr + e[1], tc + e[0]];
        tmp_board[r][c] = 1;
    });
    return tmp_board;
}
// * 评分标准 (n + 1) * 10
function deepCount(tmp_board, block_idx, deep, score){
    let s = score;
    let arr_pos = getFillPosArray(tmp_board, block_idx);
    if(arr_pos.length > 0 && deep < MaxDeep){
        arr_pos.forEach(e=>{
            let ret = tmpFill(tmp_board, e[0], e[1], block_idx);
            s += StepsAddScore;
            for(let i = 0; i < Blocks.length; i++){
                let b1 = cloneBoard(ret);
                s += deepCount(b1, i, deep + 1, score);
            }
        });
        return s;
    }else{
        return (deep + 1) * DeepAddScore;
    }
}

function foramtArray(arr){
    let info = '';
    arr.forEach(e=>{
        info += `{${e[0]},${e[1]}},`;
    });
    return info;
}

function cloneBoard(board){
    let ret = [];
    for(let r = 0; r < board.length; ++r){
        let line = board[r];
        let new_line = [];
        for(let c = 0; c < line.length; ++c){
            new_line[c] = line[c];
        }
        ret.push(new_line);
    }
    return ret;
}

function main(){

    initBoard();
    outputBoard();

    let tmp_board = [
        [1,1,0,0,0,0,0,0], // 0
        [1,1,0,0,0,1,0,0], // 1
        [1,1,0,0,0,1,1,0], // 2
        [1,1,0,0,0,1,0,0], // 3
        [1,1,0,0,1,0,0,0], // 4
        [1,1,0,0,1,1,1,0], // 5
        [0,0,0,0,1,0,0,0], // 6
        [0,0,1,0,0,1,0,0], // 7
    ];
    // * test getFillPosArray
    // for(let i = 0; i < Blocks.length; ++i){
    //     let arr = getFillPosArray(tmp_board, i);
    //     console.log(i,arr.length);
    // }
    // * test tmpFill
    // for(let i = 0; i < Blocks.length; ++i){
    //     let arr = getFillPosArray(tmp_board, i);
    //     //console.log(i,arr.length);
    //     if(arr.length > 0){
    //         let b = tmpFill(tmp_board, arr[0][0], arr[0][1], i);
    //         console.log('fill successed', i);
    //     }
    //     else{
    //         console.log('fill failed', i);
    //     }
    // }
    for(let i = 0; i < Blocks.length; ++i){
        let b1 = cloneBoard(tmp_board);
        let score1 = deepCount(b1, i, 0, 0);
        console.log(i, score1);
    }
    
    
}

main();