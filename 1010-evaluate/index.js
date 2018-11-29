const eva = require('./evaluate').getInstance();
(function main(){
    //eva.initBoard();
    //eva.outPutBoard();
    let tmp_board = [
        [1,2,3,4,5,6,7,8],
        [1,2,3,4,5,6,7,8],
        [1,2,3,4,5,0,7,8],
        [1,2,3,4,5,0,7,8],
        [1,2,3,4,5,0,7,8],
        [1,2,3,4,5,0,0,8],
        [1,2,3,4,5,6,7,8],
        [1,2,3,4,5,1,7,1]
    ];
    //let v = eva.getFillPosArray(tmp_board, 1);
    let v = eva.evaluateByBoard(tmp_board);
    console.log(v);
})();