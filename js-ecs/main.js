let SystemManager = require('./ecs/BaseSystemManager.js');
function sleep(delay_time){
    let start = new Date().getTime();
    while(new Date().getTime() - start < delay_time){
        continue;
    }
}
function main(){
    console.log('start');
    SystemManager.init();    

    let fps = 60;
    let fps_time = parseInt(1000 / fps);
    let start_time = 0;
    let end_time = 0;
    let dt = 0;
    while(true){
        console.log('loop start');
        if(start_time === 0) dt = 0;
        else dt = new Date().getTime() - start_time;
        start_time = new Date().getTime(); 


        SystemManager.update(dt/1000);


        end_time = new Date().getTime();
        if(end_time - start_time < fps){
            sleep(fps - end_time + start_time);
        }
        console.log('loop end');
    }

}


main();
