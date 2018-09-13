class Node{
    constructor(value, next = null){
        this.value = value;
        this.next = next;
    }
    toString(callback){
        return callback ? callback(this.value) : `${this.value}`;
    }
}

class LinkedList{
    constructor(comfunc){
        this.head = null;
        this.tail = null;
        this.compare = comfunc;
    }
    prepend(value){
        let new_node = new Node(value,this.head);
        this.head = new_node;
        if(!this.tail) this.tail = new_node;
        return this;
    }
}

module.exports = {
    Node,
    LinkedList
};