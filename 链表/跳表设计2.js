class LinkBean {
  //双向链表节点类
  constructor(val) {
    this.val = val;
    this.right = null; //next指针
    this.left = null; //prev指针
    this.down = null; //不同层级的down指针
    this.up = null; //不同层级的up指针
  }
}

const MAX_LEVEL_LIMIT = 16;
const PROMOTE_RATE = 0.5;

class Skiplist {

  constructor() {
    this.maxLevel = 0; //当前最高层级
    //头节点
    this.head = new LinkBean(Number.MIN_SAFE_INTEGER);
    //尾结点
    this.tail = new LinkBean(Number.MAX_SAFE_INTEGER);
    this.head.right = this.tail;
    this.tail.left = this.head;

  }
  /**
   * 返回target是否存在于跳表中。
   * @return boolean
   * @param {number} target 
   */
  search(target) {
    let node = this.findNode(target);
    if (node.val === target) {
      return true;
    }
    return false;
  }
  /**
   * 返回target是否存在于跳表中。
   * @return LinkBean
   * @param {number} target 
   */
  searchNode(target) {
    let node = this.findNode(target);
    if (node.val === target) {
      return node;
    }
    return null;
  }
  /**
   * @return LinkBean
   * @param {number} target 
   */
  findNode(target) {
    let curNode = this.head;
    while (true) {
      while (curNode.right.val != Number.MAX_SAFE_INTEGER && curNode.right.val <= target) {
        curNode = curNode.right;
      }
      if (curNode.down === null) break;
      curNode = curNode.down;
    }
    return curNode;
  }

  /**
   * 在pre后面添加新节点
   * @param {LinkBean} preNode 
   * @param {LinkBean} newNode 
   */
  appendNode(preNode, newNode) {
    // a -> b
    // a ->c -> b
    //注意顺序。。。
    //先把新节点处理好left 和 right
    newNode.left = preNode;
    newNode.right = preNode.right;
    preNode.right.left = newNode;
    preNode.right = newNode;
  }
  /**
   * 新增一层级
   */
  addLevel() {
    this.maxLevel++;
    let p1 = new LinkBean(Number.MIN_SAFE_INTEGER)
    let p2 = new LinkBean(Number.MAX_SAFE_INTEGER)
    p1.right = p2;
    p2.left = p1;
    p1.down = this.head;
    this.head.up = p1;
    p2.down = this.tail;
    this.tail.up = p2;

    //更新设置头节点和尾结点
    this.head = p1;
    this.tail = p2;
  }

  /**
   * 如果删除了元素，导致当前层只有首尾节点，即需要删除当前层
   * 删除一层
   * @param {LinkBean} leftNode  当前层最左侧节点（当前层开始节点）
   */
  removeLevel(leftNode) {
    let rightNode = leftNode.right;
    if (leftNode.up === null) {
      //删除层是最高层
      leftNode.down.up = null;
      rightNode.down.up = null;
      //这里得更像头尾节点，要不然会导致下面添加的地方出现报错
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
   * 插入一个元素到跳表。
   * @param {number} num 
   */
  add(num) {
    let preNode = this.findNode(num);
    // if (preNode.val === num) {
    //   console.log('值相同');
    // }
    let node = new LinkBean(num);
    this.appendNode(preNode, node);
    let currentLevel = 0;

    //随机提升层级,但是不会超过16层
    while (Math.random() < PROMOTE_RATE && currentLevel < MAX_LEVEL_LIMIT) {
      if (currentLevel === this.maxLevel) {
        //新增一层
        this.addLevel();
      }

//       //找到上层的前置节点
      while (preNode.up === null) {
        preNode = preNode.left;
      }
      //找到上层的前置节点
//       while (!!preNode && preNode.up === null) {
//         preNode = preNode.left;
//       }
//       //删除最高层如果没有更新头尾节点，可能会出现空值
//       if(!preNode)return;
 
      
      preNode = preNode.up; //到了上层层级节点
      //把提升层级的插入到这层
      let upNode = new LinkBean(num);
      this.appendNode(preNode, upNode);
      upNode.down = node;
      node.up = upNode;
      //可能还会提升
      node = upNode;
      currentLevel++;
    }
  }
  /**在跳表中删除一个值，如果 num 不存在，直接返回false. 如果存在多个 num ，删除其中任意一个即可。
   * @return boolean
   * @param {number} target 
   */
  erase(num) {
    //底层查找到要删除的节点
    let removeNode = this.searchNode(num);
    if (removeNode === null) {
      return false;
    }
    let currentLevel = 0;
    while (removeNode != null) {
      //当前层删除节点
      removeNode.right.left = removeNode.left;
      removeNode.left.right = removeNode.right;
      //不是底层，且只有开始和结束两个无穷小，无穷大节点，删除该层级
      if (currentLevel != 0 && removeNode.left.val === Number.MIN_SAFE_INTEGER && removeNode.right.val === Number.MAX_SAFE_INTEGER) {
        //删除改层级
        this.removeLevel(removeNode.left)
      } else {
        currentLevel++;
      }
      removeNode = removeNode.up;
    }
    return true;
  }

  /**
   * 输出底层链表，也就是包含了n个数据的链表数据
   */
  printList() {
    let node = this.head;
    let string = '';
    while (node.down != null) {
      node = node.down;
    }
    while (node.right.val != Number.MAX_SAFE_INTEGER) {
      string += (`${node.right.val} -> `)
      node = node.right;
    }
    string += 'null'
    return string;
    // return node;
  }

}

let skipObj = new Skiplist();
// [16],[5],[14],[13],[0],[3],[12],[9],[12]
// skipObj.add(16)
// skipObj.add(5)
// skipObj.add(14)
// skipObj.add(13)
// skipObj.add(0)
// skipObj.add(3)
// skipObj.add(12)
// skipObj.add(9)
for(let i = 88;i >= 0; i--){
  skipObj.add(i)
}
// console.log(skipObj);
console.log(skipObj.printList());
console.log(skipObj.searchNode(3));
skipObj.erase(12)
console.log(skipObj.printList());
/**
 * Your Skiplist object will be instantiated and called as such:
 * Skiplist obj = new Skiplist();
 * boolean param_1 = obj.searchNode(target);
 * obj.add(num);
 * boolean param_3 = obj.erase(num);
 */
