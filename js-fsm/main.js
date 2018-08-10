/// 有限状态机测试
/// 特点:
/// 1. 状态总数是有限的
/// 2. 任一时刻，只处在一种状态之中
/// 3. 某种条件下，会从一种状态转变(transition)到另一种状态
/// API
/**
 * fsm.is(s) 当前的状态是否是s状态，返回true/false
 * fsm.can(t) 
 * fsm.cannot(t)
 * fsm.transitions()
 * fsm.allTransitions()
 * fsm.allStates()
 */
//let StateMachine = require('./state-machine.min.js');
let StateMachine = require('./state-machine.js');
let test_fsm_0 = ()=>{
    let fsm = new StateMachine({
        init: 'solid',
        transitions:[
            {name: 'melt', from:'solid', to:'liquid'},
            {name: 'freeze', from: 'liquid', to: 'solid'},
            {name: 'vaporize', from: 'liquid', to: 'gas'},
            {name: 'condense', from: 'gas', to: 'liquid'}
        ],
        methods:{
            onMelt:()=>{console.log('I melted.');},
            onFreeze:()=>{console.log('I freezed.');},
            onVaporize:()=>{console.log('I vaporized.');},
            onCondense:()=>{console.log('I condensed.');}
        }
    });
    console.log(fsm.state,fsm.transitions() );
    fsm.melt();
    console.log(fsm.state,fsm.transitions() );
    fsm.freeze();
    console.log(fsm.state,fsm.transitions() );
    fsm.melt();
    console.log(fsm.state,fsm.transitions() );
    fsm.vaporize();
    console.log(fsm.state,fsm.transitions() );
    fsm.condense();
    console.log(fsm.state,fsm.transitions() );

    console.log(fsm.allTransitions());
};
let fsm_els_game = ()=>{
    let fsm = new StateMachine({
        init: 'homePage',
        transitions:[
            {name: 'playVS', from: 'homePage', to: 'modeVS'},
            {name: 'playSingle', from: 'homePage', to: 'modeSingle'},
            {name: 'playWisper', from: 'homePage', to: 'modeWisper'},
            {name: 'VSEnd', from: 'modeVS', to: 'homePage'},
            {name: 'singleEnd', from: 'modeSingle', to: 'homePage'},
            {name: 'wisperEnd', from: 'modeWisper', to: 'homePage'}
        ],
        methods:{
            onPlayVS: ()=>{},
            onPlaySingle: ()=>{},
            onPlayWisper: ()=>{},
            onVSEnd: ()=>{},
            onSingleEnd: ()=>{},
            onWisperEnd: ()=>{}
        }
    });
};
let fsm_pop_manager = ()=>{
    let fsm = new StateMachine({
        init: 'normal',
        transitions: [
            {name: 'showPop',from: 'normal', to: 'show'},
            {name: ''}
        ],
    });
};
function main(){
    console.log('有限状态机Finite-state machine');
    //test_fsm_0();
    eval('test_fsm_0()');

}

main();