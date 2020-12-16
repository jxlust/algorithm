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
  const reverse = (startNode, endNode) => {
    let temp = endNode.next;
    let p = startNode;
    while (temp != endNode) {
      let nx = p.next;
      p.next = temp;
      temp = p;
      p = nx;
    }
    return temp;

  }

  if (k <= 1) return head;

  let parent = new ListNode(-1);
  parent.next = head;
  let p = parent; //哨兵

  while (p.next) {
    let tail = p; // 因为while 判断了p.next，所以tail一定不会第一次就为空

    for (let i = 0; i < k; i++) {
      tail = tail.next;
      if (tail === null) {
        //到链表结尾了，且不满足k个数
        return parent.next;
      }
    }
    // tail 到了当前组的最后节点
    // 记录下一组开头节点
    // let nextStart = tail.next;
    //核心 翻转
    let temp = reverse(head, tail);
    p.next = temp;
    tail = head;
    p = tail;
    head = tail.next;

  }
  return parent.next;

};

const reverse = (startNode, endNode) => {
  let temp = endNode.next;
  let p = startNode;
  while (temp != endNode) {
    let nx = p.next;
    p.next = temp;
    temp = p;
    p = nx;
  }
  console.log(1, JSON.stringify(temp));
  console.log(2, p);
  console.log(3, startNode);
  console.log(4, JSON.stringify(endNode));
  // 1 {"val":3,"next":{"val":2,"next":{"val":1,"next":{"val":4,"next":{"val":5,"next":null}}}}}
  // 2 { val: 4, next: { val: 5, next: null } }
  // 3 { val: 1, next: { val: 4, next: { val: 5, next: null } } }
  // 4 {"val":3,"next":{"val":2,"next":{"val":1,"next":{"val":4,"next":{"val":5,"next":null}}}}}
  return temp;
}

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

reverse(link, link.next.next);
console.log(link);
