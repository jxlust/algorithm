
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 双指针，快慢指针遍历
 * 判断链表是否有环
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (head === null || head.next === null) {
        return false;
    }
    let slow = head,
        fast = head.next;
    // 条件为两个指针是否相等
    while (slow !== fast) {
        if (fast === null || fast.next === null) {
            //为空遍历完，说明不存在环
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    //相等了，说明有环
    return true;
};

const hasCycle2 = function (head) {
    let slow = head,fast = head;
    //条件是以快指针，判断是否为空
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast){
            return true;
        }
    }
    return false;
}



/** 
 * 获取链表入环的第一个节点，没有返回null
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {

}
var detectCycle = function(head) {
    let set = new Set();
    while(head){
        if(set.has(head)){
            return head;
        }
        set.add(head);
        head = head.next;
    }
    return null;
};