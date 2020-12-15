// 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (!head) return null;
  if (k === 0) return head;

  let p = head;
  let length = 0;
  //把链表变成环
  while (p) {
    length++;
    if (p.next === null) {
      p.next = head;
      break;
    }
    p = p.next;
  }
  let breakIndex = length - k % length;
  let p2 = head;
  for (let i = 0; i < breakIndex - 1; i++) {
    p2 = p2.next;
  }
  let t = p2.next;
  p2.next = null;
  return t;
};

var rotateRight = function (head, k) {
  if (!head) return null;
  if (k === 0) return head;

  let p = head;
  let length = 1;
  while (p.next) {
    length++;
    p = p.next;
  }
  p.next = head;
  //切断的点
  let breakIndex = length - k % length;
  let p2 = head;
  for (let i = 0; i < breakIndex - 1; i++) {
    p2 = p2.next;
  }
  let t = p2.next;
  p2.next = null;
  return t;

};
