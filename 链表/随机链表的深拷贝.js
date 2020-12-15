/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  const map = WeakMap();

  const deepCopy = (node) => {
    if (!node) return null;
    if (map.has(node)) return map.get(node);
    let newNode = new Node(node.val)
    map.set(node, newNode);
    newNode.next = deepCopy(node.next);
    newNode.random = deepCopy(node.random);
    return newNode;
  }
  return deepCopy(head)
};

var copyRandomList = function (head) {
  //利用map多出来空间复杂度O(n)
  //思路，相邻节点插入拷贝节点
  if (!head) return null;
  let p = head; //哨兵
  while (p) {
    //先把next拷贝插入
    let insertNode = new Node(p.val);
    insertNode.next = p.next;
    p.next = insertNode;
    p = p.next.next;
  }
  //设置插入节点的random指针
  p = head;
  while (p) {
    p.next.random = p.random ? p.random.next : null;
    p = p.next.next;
  }

  //分离节点 A->A'->B->B'->C->C'
  //A->B->C 和 A'->B'->C'
  let oldLink = head; // 老链表的哨兵
  let newLink = head.next;

  let newP = head.next; //新链表的哨兵
  while (newP) {
    oldLink.next = newP.next;
    newP.next = oldLink.next ? oldLink.next.next : null;
    newP = newP.next;
    oldLink = oldLink.next;
  }

  return newLink;

}
