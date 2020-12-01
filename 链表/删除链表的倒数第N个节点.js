/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    //双指针快慢指针
    let p1 = head;
    let p2 = head;
    //快指针先移动n步
    while(n > 0){
        p1 = p1.next;
        n--;
    }
    if(p1 === null){
        //说明删除的节点是头节点
        return head.next;
    }
    //再同时移动，p1移动到null这个时候p2就是待删除节点
    // a-b-c-d-e-f-g
    //     i
    // j
    //但是单链表 我要知道删除节点的前一个节点
    //p2再慢执行一部
    p1 = p1.next;
    while(p1 != null){
        p1 = p1.next;
        p2 = p2.next;
    }
    p2.next = p2.next.next;
    return head;
};