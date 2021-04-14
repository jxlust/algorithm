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
var reverseKGroup = function (head, k) {
  //利用栈，栈先进先出，出栈的时候就是翻转组
  let stack = [];
  let link = new ListNode(-1);
  let p = link; //哨兵
  while (true) {
    let count = 0;
    let temp = head;
    while (temp && count < k) {
      count++;
      stack.push(temp)
      temp = temp.next;
    }
    if (count !== k) {
      p.next = head;
      break;
    }
    //出栈
    // 1 2   3 4 
    while (stack.length) {
      // let pop = stack.pop();
      p.next = stack.pop();
      p = p.next;
    }
    p.next = temp;
    head = temp;

  }

  return link.next;
}


var reverseKGroup = function (head, k) {
  // 1 -> 2 -> 3 -> 4 -> 5
  // k = 2 : 2->1->4->3->5;
  // k = 3 : 3->2->1->4->5;
  const reverse = (node) => {
    let pre = null;
    let cur = node;
    // a->b->c->null
    // a->null
    while (cur) {
      let next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    return pre;
  }
  if (k <= 1) return head;




};

let link = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: null
        }
      }
    }
  }
}

console.log(1, reverseKGroup(link, 2));
