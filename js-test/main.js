
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

function main(){

    //test_random();
    let arr = [];
    let max = 100000;
    for(let i = 0; i < max; i++){
        let rand = parseInt(Math.random() * 100);
        arr[rand] ? arr[rand]++ : (arr[rand] = 1);
    }
    arr = arr.map( (t,v) => {
        return {t,v,r:t / max};
    });
    console.log(arr);
}

main();