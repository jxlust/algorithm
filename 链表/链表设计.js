// 哨兵节点被用作伪头始终存在，这样结构中永远不为空，它将至少包含一个伪头。
// MyLinkedList 中所有节点均包含：值 + 链接到下一个元素的指针。

const LinkBean = function (val) {
    this.val = val;
    this.next = null; //LinkBean
}
/**
 * Initialize your data structure here.
 * 
 */
var MyLinkedList = function () {
    this.size = 0;
    this.header = new LinkBean(0);
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
    let cur = this.header;
    for (let i = 0; i < index + 1; i++) {
        cur = cur.next;
    }
    return cur.val;
};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
    this.addAtIndex(0, val);
};

/**
 * Append a node of value val to the last element of the linked list. 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
    this.addAtIndex(this.size, val);
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
    let pred = this.header;
    for (let i = 0; i < index; i++) {
        pred = pred.next;
    }
    // 创建一个新节点对象
    let newNode = new LinkBean(val);
    //1.新节点指向原节点
    //2.前一个节点.next指向新节点
    newNode.next = pred.next;
    pred.next = newNode;

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
    this.size--;
    let pre = this.header;
    for (let i = 0; i < index; i++) {
        pre = pre.next;
    }
    //删除对应index的节点
    pre.next = pre.next.next;
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
obj.addAtIndex(1, 99);
console.log(JSON.stringify(obj.header));
obj.deleteAtIndex(2);
console.log(obj.get(0));
console.log(obj.get(1));
console.log(obj.get(2));