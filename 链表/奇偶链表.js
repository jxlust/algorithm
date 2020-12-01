/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
    //双指针
    //p1 = head
    //p2 = head.next;
    // 1 2 3 4 5 ->null

    if (head === null) return head;
    let p2head = head.next;
    let p1 = head;//奇
    let p2 = head.next;//偶

    //把偶数链表剥离
    while(p2 != null && p2.next != null){
        p1.next = p2.next;
        p1 = p1.next;
        p2.next = p1.next;
        p2 = p2.next;
    }

    p1.next = p2head;
    return head;


};