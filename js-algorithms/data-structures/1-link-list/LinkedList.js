//import LinkListNode from './LinkedListNode';
//import Comparator from '../utils/Comparator';
let LinkListNode = require('./LinkedListNode');
let Comparator = require('../utils/Comparator');
class LinkedList{
    constructor(comparatorFuction){
        this.head = null;
        this.tail = null;
        this.compare = comparatorFuction;
    }
    prepend(value){
        const new_node = new LinkListNode(value,this.head);
        this.head = new_node;
        if(!this.tail) this.tail = new_node;
        return this;
    }
    append(value){
        const new_node = new LinkListNode(value);
        if(!this.head){
            this.head = new_node;
            this.tail = new_node;
        }
        else{
            this.tail.next = new_node;
            this.tail = new_node;        
        }
        return this;
    }
    delete(value){
        if(!this.head) return null;
        let delete_node = null;
        while(this.head && this.compare.equal(this.head.value, value)){
            delete_node = this.head;
            this.head = this.head.next;
        }

        let current_node = this.head;
        if(current_node !== null){
            while(current_node.next){
                if(this.compare.equal(current_node.next.value, value)){
                    delete_node = current_node;
                    current_node.next = current_node.next.next;
                }
                else{
                    current_node = current_node.next;
                }
            }
        }
        if(this.compare.equal(this.tail.value, value)){
            this.tail = current_node;
        }
        return delete_node;
    }
    find({value = undefined, callback = undefined}){
        if(!this.head) return null;

        let current_node = this.head;
        while(current_node){
            if(callback && callback(current_node.value)){
                return current_node;
            }
            if(value !== undefined && this.compare.equal(current_node.value, value)){
                return current_node;
            }
            current_node = current_node.next;
        }
        return null;
    }
    deleteTail(){
        const deleted_tail = this.tail;
        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
            return deleted_tail;
        }

        let current_node = this.head;
        while(current_node.next){
            if(!current_node.next.next){
                current_node.next = null;
            }
            else{
                current_node = current_node.next;
            }
        }
        this.tail = current_node;
        return deleted_tail;
    }

    deleteHead(){
        if(!this.head) return null;
        let delete_head = this.head;
        if(this.head.next) this.head = this.head.next;
        else [this.head,this.tail] = [null,null];
        return delete_head;
    }
    fromArray(values){
        values.forEach(value => this.append(value));
        return this;
    }
    toArray(){
        const nodes = [];
        let current_node = this.head;
        while(current_node){
            nodes.push(current_node);
            current_node = current_node.next;
        }
        return nodes;
    }
    toString(callback){
        return this.toArray().map(node=>node.toString(callback)).toString();
    }
    reverse(){
        let current_node = this.head;
        let per_node = null;
        let next_node = null;
        while(current_node){
            next_node = current_node.next;
            current_node.next = per_node;
            per_node = current_node;
            current_node = next_node;
        }
        this.tail = this.head;
        this.head = this.per_node;
        return this;
    }
}

module.exports = LinkedList;