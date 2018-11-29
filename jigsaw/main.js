const ROW = 3;
const COL = 3;

let  game = {
    board:[],
    row: 0,
    col: 0,
    initBoard:function(){
        this.row = ROW;
        this.col = COL;
        let [r, c, idx] = [0, 0, 0];
        for(r = 0; r < this.row; ++r){
            let tmp_row = [];
            for(c = 0; c < this.col; ++c){
                tmp_row.push(idx++);
            }
            this.board.push(tmp_row);
        }
        this.board[this.row - 1][this.col - 1] = -1;
    },
    display:function(){
        for(let r = 0; r < this.board.length; ++r){
            console.log(this.board[r]);
        }
    },
    getBoard:function(){
        return this.board;
    },
    getEnableMoveBlocks:function(){
        let [tr,tc] = this.getEmptyBlock();
        let ret = [];
        let values = [[1,0],[-1,0],[0,1],[0,-1]];
        values.forEach(v=>{
            let [ttr, ttc] = [tr + v[0], tr + v[1]];
            if(ttr >= 0 && ttr < this.row && ttc >= 0 && ttc < this.col){
                ret.push([ttr, ttc]);
            }
        });
        return ret;
    },
    getEmptyBlock:function(){
        return this.getBlockByValue(-1);
    },
    getBlockByValue:function(value){
        for(let r = 0; r < this.row; ++r){
            let tmp_row = this.board[r];
            for(let c = 0; c < this.col; ++c){
                if(tmp_row[c] === value) return [r,c];
            }
        }
        return null;
    }
};

function main(){
    game.initBoard();
    game.display();
    console.log(game.getBlockByValue(-1));
    console.log(game.getEnableMoveBlocks());
}

main();