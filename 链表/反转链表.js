var reverseList = function (head) {
    let cur = null,nexted = head;
    while (nexted) {
        let nx = nexted.next;
        nexted.next = cur;
        cur = nexted;
        nexted = nx;

    }
    return cur;
};


/**
 * 理解：
 * 1 > 2 > 3 > 4 > 5
 * 结束条件head.next为null
 * cur = 5,head = 4
 * 所以是head.next.next = head,就是递归的精髓 5.next = 4 , 5 > 4 > null
 * 4.next = null;
 * 调用栈继续反向指
 * 
 * @param {*} head 
 */
var reverseList = function (head) {
     if(head === null || head.next === null){
        return head;
     }
    let cur =  reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return cur;
};