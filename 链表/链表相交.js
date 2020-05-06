/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let aLength = 0,
        bLength = 0;
    let a = headA,
        b = headB;
    while (a) {
        aLength++;
        a = a.next;
    }
    while (b) {
        bLength++;
        b = b.next;
    }
    if (a === b) {
        a = headA;
        b = headB;
        if (aLength > bLength) {
            for (let i = 0; i < aLength - bLength; i++) {
                a = a.next;
            }
        } else {
            for (let i = 0; i < bLength - aLength; i++) {
                b = b.next;
            }
        }
        while (a !== b) {
            a = a.next;
            b = b.next;
        }
        return a;
    } else {
        return null;
    }
};

/**
 * 双指针  A >C > D ,B > C > D, 相同速度AC+CD+BC  === BC + CD + AC 相交于C
 * @param {*} headA 
 * @param {*} headB 
 */
var getIntersectionNode = function (headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let a = headA,
        b = headB;
    while (a !== b) {
        a = a ? a.next : headB;
        b = b ? b.next : headA;
    }
    return a;
}