const LinkBean = function (val) {
    this.val = val;
    this.next = null; //LinkBean
    this.prev = null;
}
/**
 * Initialize your data structure here.
 * 
 */
var MyLinkedList = function () {
    this.size = 0;
    //哨兵节点被用作伪头始终存在，这样结构中永远不为空，它将至少包含一个伪头。
    this.header = new LinkBean(0);
    this.tail = new LinkBean(0);
    this.header.next = this.tail;
    this.tail.prev = this.header;
};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1. 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
    if (index < 0 || index >= this.size) {
        return -1;
    }
    let cur;
    let endIndex = this.size - index;
    if (index < endIndex) {
        cur = this.header;
        for (let i = 0; i < index + 1; i++) {
            cur = cur.next;
        }
    } else {
        cur = this.tail;
        for (let i = 0; i < endIndex; i++) {
            cur = cur.prev;
        }
    }

    return cur.val;
};
MyLinkedList.prototype.addNode = function (pred, nexted, val) {
    let addNode = new LinkBean(val);
    addNode.next = nexted;
    addNode.prev = pred;
    pred.next = addNode;
    nexted.prev = addNode;
    this.size++;
}
/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    let pred = this.header;
    let nexted = this.header.next;
    this.addNode(pred, nexted, val);
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    let nexted = this.tail;
    let pred = nexted.prev;
    this.addNode(pred, nexted, val);
};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
    if (index > this.size) {
        return;
    }
    if (index < 0) {
        index = 0;
    }
    // 判断index 和 size - index大小，用小的进行遍历
    let pred, nexted;
    let endIndex = this.size - index;
    if (index < endIndex) {
        pred = this.header;
        for (let i = 0; i < index; i++) {
            pred = pred.next;
        }
        nexted = pred.next;
    } else {
        nexted = this.tail;
        for (let i = 0; i < endIndex; i++) {
            nexted = nexted.prev;
        }
        pred = nexted.prev;
    }
    // 创建一个新节点对象
    let addNode = new LinkBean(val);
    addNode.next = nexted;
    addNode.prev = pred;
    pred.next = addNode;
    nexted.prev = addNode;
    this.size++;
};

/**
 * Delete the index-th node in the linked list, if the index is valid. 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
    if (index < 0 || index >= this.size) {
        return;
    }
    let cur;
    let endIndex = this.size - index;
    if (index < endIndex) {
        cur = this.header;
        for (let i = 0; i < index + 1; i++) {
            cur = cur.next;
        }
    } else {
        cur = this.tail;
        for (let i = 0; i < endIndex; i++) {
            cur = cur.prev;
        }
    }
    //删除对应index的节点
    this.size--;
    cur.prev.next = cur.next;
    cur.next.prev = cur.prev;

};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

var obj = new MyLinkedList();
obj.addAtHead(1);
obj.addAtTail(2);
obj.addAtIndex(0, 9); //插入
obj.addAtIndex(1, 99);
console.log('length:', obj.size);
obj.deleteAtIndex(1);
console.log(obj.get(0));
console.log(obj.get(1));
console.log(obj.get(2));
console.log(obj.get(3));