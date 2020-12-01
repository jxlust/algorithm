/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
    //难点：删除的是头就很麻烦
    //添加哨兵节点
    let listNode = new ListNode(Number.MIN_SAFE_INTEGER);
    listNode.next = head;

    let pre = listNode;
    while (pre) {
        if (pre != null && pre.next != null && pre.next.val === val) {
            pre.next = pre.next.next;
        }else{
            pre = pre.next;
        }
    }
    return listNode.next;

};