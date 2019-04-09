let FSM = require('./state-machine.min.js');
let Stats = {
    None: 'none',
    ShowIn: 'show_in',
    ShowHappy: 'show_happy',
    ShowLose: 'show_lose',
    ShowIdle: 'show_idle',
};

let fsm = new FSM({
    init: Stats.None,
    transitions:[
        {name: 'showIn', from: Stats.None, to: Stats.ShowIn},
        {name: 'showHappy', from: Stats.ShowIdle, to: Stats.ShowHappy},
        {name: 'showLose', from: Stats.ShowIdle, to: Stats.ShowLose},
        {name: 'showIdle', from: Stats.ShowIn, to: Stats.ShowIdle},
        {name: 'showIdle', from: Stats.ShowHappy, to: Stats.ShowIdle},
        {name: 'showIdle', from: Stats.ShowLose, to: Stats.ShowIdle},
        {name: 'reset', from: Stats.None, to: Stats.None},
        {name: 'reset', from: Stats.ShowIn, to: Stats.None},
        {name: 'reset', from: Stats.ShowHappy, to: Stats.None},
        {name: 'reset', from: Stats.ShowLose, to: Stats.None},
        {name: 'reset', from: Stats.ShowIdle, to: Stats.None},
    ],
    methods:{
        onShowIn:()=>{
            console.log('onShowIn');
        },
        onShowHappy:()=>{
            console.log('onShowHappy');
        },
        onShowLose:()=>{
            console.log('onShowLose');
        },
        onShowIdle:()=>{
            console.log('onShowIdle');
        },
        onReset:()=>{
            console.log('onReset');
        },
    }
});

console.log(fsm.state, fsm.transitions());
fsm.showIn();
console.log(fsm.state, fsm.transitions());
/*
fsm.showIdle();
console.log(fsm.state, fsm.transitions());
fsm.reset();
console.log(fsm.state, fsm.transitions());
console.log(fsm.allStates());
console.log(fsm.allTransitions());
*/
