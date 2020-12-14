// 多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。
// 给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。

/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
  //想起高中数学老师说的话，题目废话越多的题，其实越简单
  //这题其实就是输出一颗二叉树的前序遍历结果
  //child相当于左节点，next右节点

  const arr = [];
  const dfs = (node) => {
    if (!node) return;
    arr.push(node);
    dfs(node.child);
    dfs(node.next);
  }
  dfs(head)
  //链接arr
  for (let i = 0; i < arr.length; i++) {
    if (i + 1 < arr.length) {
      arr[i].next = arr[i + 1];
    }
    if (i - 1 >= 0) {
      arr[i].prev = arr[i - 1];
    }
    arr[i].child = null;

  }
  return head;

};

var flatten = function (head) {
  //一次dfs处理
  //双向链表，需要pre,next
  if (!head) return null;
  let newLink = new Node(-1);
  newLink.next.prev = null;
  const dfs = function (pre, cur) {
    if (!cur) return pre;
    pre.next = cur;
    cur.prev = pre;

    let nextNode = cur.next;
    let tailNode = dfs(cur, cur.child)
    cur.child = null;
    return dfs(tailNode, nextNode);
  }
  dfs(newLink, head);
  return newLink.next;
}


/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function (head) {
  if (!head) return null;
  let stack = [];
  stack.push(head);
  let prev = new Node(-1),
    cur = null;
  while (stack.length) {
    //栈
    cur = stack.pop();
    prev.next = cur;
    cur.prev = prev;
    if (cur.next) {
      stack.push(cur.next)
    }
    if (cur.child) {
      stack.push(cur.child)
    }
    cur.child = null;
    prev = cur;
  }
  head.prev = null;
  return head;
};
