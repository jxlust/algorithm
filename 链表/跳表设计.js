class LinkNode {
  constructor(val) {
    this.val = val;
    this.right = null; //next指针
    this.left = null; //prev指针
    this.down = null; //不同层级的down指针
    this.up = null; //不同层级的up指针
  }

}

const MAX_LEVEL_LIMIT = 16; //限制添加的最大层级 n最大2^16，32,64都可以
const PROBABILITY_RATE = 0.5; //节点提升一层的概率

class Skiplist {
  constructor() {
    this.head = new LinkNode(Number.MIN_SAFE_INTEGER);
    this.tail = new LinkNode(Number.MAX_SAFE_INTEGER);
    this.head.right = this.tail;
    this.tail.left = this.head;

    //链表的最高层级
    this.maxLevel = 0;
  }

  /**
   * 查找跳表中不大于val的第一个节点。
   * @return LinkNode
   * @param {number} val 
   */
  findNode(val) {
    let node = this.head;
    while (true) {
      while (node.right.val != Number.MAX_SAFE_INTEGER && node.right.val <= val) {
        node = node.right;
      }
      if (node.down === null) break;
      node = node.down;
    }
    return node;
  }
  /**
   * 往prev后插入节点new
   * @param {LinkNode} prevNode 
   * @param {LinkNode} newNode 
   */
  appendNode(prevNode, newNode) {
    newNode.left = prevNode;
    newNode.right = prevNode.right;
    prevNode.right.left = newNode;
    prevNode.right = newNode;
  }
  /**
   * 新增一层链表
   */
  addLevel() {
    let p1 = new LinkNode(Number.MIN_SAFE_INTEGER);
    let p2 = new LinkNode(Number.MAX_SAFE_INTEGER);

    p1.right = p2;
    p2.left = p1;

    p1.down = this.head;
    this.head.up = p1;

    p2.down = this.tail;
    this.tail.up = p2;

    this.head = p1;
    this.tail = p2;

    this.maxLevel++;

  }
  /**
   * 删除一层链表
   * @param {LinkNode} leftNode 当前层最左侧节点
   */
  removeLevel(leftNode) {
    let rightNode = leftNode.right;
    //最高层
    if (leftNode.up === null) {
      leftNode.down.up = null;
      rightNode.down.up = null;

      this.head = leftNode.down;
      this.tail = rightNode.down;
    } else {
      //不是最高层
      leftNode.up.down = leftNode.down;
      leftNode.down.up = leftNode.up;
      rightNode.up.down = rightNode.down;
      rightNode.down.up = rightNode.up;
    }
    this.maxLevel--;
  }
  /**
   * 打印最后一层级链表数据
   */
  printList() {
    let node = this.head;
    while (node.down != null) {
      node = node.down;
    }
    let str = '';
    while (node.right.val != Number.MAX_SAFE_INTEGER) {
      str += `${node.right.val},`
      node = node.right;
    }
    str += 'null';
    return str;
  }
  /**
   * 返回target是否存在于跳表中。
   * @return boolean
   * @param {number} target 
   */
  search(target) {
    let node = this.findNode(target);
    return node.val === target;
  }

  /**
   * 插入一个元素到跳表。
   * @param {number} num 
   */
  add(num) {
    let node = new LinkNode(num);
    let prevNode = this.findNode(num);
    //最底层插入
    this.appendNode(prevNode, node);
    let currentLevel = 0;
    //随机决定是否提升层级
    while (Math.random() < PROBABILITY_RATE && currentLevel <= MAX_LEVEL_LIMIT) {
      //提升层级
      //如果当前层就是最大层了就要新增层级
      if (currentLevel === this.maxLevel) {
        this.addLevel();
      }
      while (prevNode.up === null) {
        prevNode = prevNode.left;
      }
      prevNode = prevNode.up; //找到上一层最近节点
      //重新new新节点，注意node之前的不能用了
      let upNode = new LinkNode(num)
      this.appendNode(prevNode, upNode);
      upNode.down = node;
      node.up = upNode;

      node = upNode;
      currentLevel++;
    }

  }
  /**在跳表中删除一个值，如果 num 不存在，直接返回false. 如果存在多个 num ，删除其中任意一个即可。
   * @return boolean
   * @param {number} target 
   */
  erase(num) {
    let removeNode = this.findNode(num);
    if(removeNode.val != num) return false;//无需删除
    let currentLevel = 0;
    while(removeNode != null){
      removeNode.left.right = removeNode.right;
      removeNode.right.left = removeNode.left;
      //最底层不能删除
      if(currentLevel > 0 && removeNode.left.val === Number.MIN_SAFE_INTEGER && removeNode.right.val === Number.MAX_SAFE_INTEGER){
        //删除层级
        this.removeLevel(removeNode.left)
      }else{
        currentLevel++
      }
      removeNode = removeNode.up;
    }
    return true;
  }


}

let skipObj = new Skiplist();

for (let i = 88; i >= 0; i--) {
  skipObj.add(i)
}
console.log(skipObj.printList());

/**
 * Your Skiplist object will be instantiated and called as such:
 * Skiplist obj = new Skiplist();
 * boolean param_1 = obj.search(target);
 * obj.add(num);
 * boolean param_3 = obj.erase(num);
 */
