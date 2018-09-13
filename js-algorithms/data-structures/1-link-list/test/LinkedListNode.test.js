//import LinkedListNode from '../LinkedListNode';
var LinkedListNode = require('../LinkedListNode');
var assert = require('assert');

function run(){
    describe('LinkedListNode',function(){
        it('should create list node with value',()=>{
            let node = new LinkedListNode(1);
            assert.equal(node.value , 1);
            assert.equal(node.next, null);
        });
    });
}

module.exports = run;
