class LinkBean {
  constructor(val) {
    this.val = val;
    this.next = null;//next指针
    this.down = null;//不同层级的down指针
    this.up = null;// 
  }

}


class Skiplist {
  constructor() {

  }
  /**
   * 返回target是否存在于跳表中。
   * @return boolean
   * @param {number} target 
   */
  search(target) {

  }

  /**
   * 插入一个元素到跳表。
   * @param {number} num 
   */
  add(num) {

  }
  /**在跳表中删除一个值，如果 num 不存在，直接返回false. 如果存在多个 num ，删除其中任意一个即可。
   * @return boolean
   * @param {number} target 
   */
  erase(num) {

  }


}

/**
 * Your Skiplist object will be instantiated and called as such:
 * Skiplist obj = new Skiplist();
 * boolean param_1 = obj.search(target);
 * obj.add(num);
 * boolean param_3 = obj.erase(num);
 */