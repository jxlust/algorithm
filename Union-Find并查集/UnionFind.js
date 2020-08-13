class UF {
  constructor(n) {
    //连通分量个数（森林个数）
    this.count = n;
    //节点x的父节点parent[x]
    this.parent = [];
    //节点x的重量,平衡树
    this.size = [];
    //初始化
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      //节点的父节点都指向自己，重量都为1
      this.size[i] = 1;
    }
  }

  /**
   * 返回x节点的根节点
   * @param {*} x 
   */
  findRoot(x) {
    while (x != this.parent[x]) {
      //路径压缩 优化树的深度（不大于3）
      this.parent[x] = this.parent[this.parent[x]]
      x = this.parent[x]
    }
    return x;
  }
  /**返回连通分量个数   */
  getCount() {
    return this.count;
  }
  /**
   * 连通p和q节点
   * @param {*} p 
   * @param {*} q 
   */
  union(p, q) {
    let pRoot = this.findRoot(p);
    let qRoot = this.findRoot(q);
    //已连通
    if (pRoot === qRoot) {
      return;
    }
    //小树接到大树下面平衡
    if (this.size[pRoot] > this.size[qRoot]) {
      this.parent[qRoot] = pRoot;
      this.size[pRoot] += this.size[qRoot];
    } else {
      this.parent[pRoot] = qRoot;
      this.size[qRoot] += this.size[pRoot];
    }
    this.count--;
  }
  /**
   * 判断p和q是否连通
   * @param {*} p 
   * @param {*} q 
   * @return {Boolean}
   */
  isConnected(p, q) {
    let pRoot = this.findRoot(p);
    let qRoot = this.findRoot(q);
    return pRoot === qRoot;
  }

}


//测试
let un = new UF(5);
console.log(un.getCount());
console.log(un.union(0, 1));
console.log(un.union(1, 2));
console.log(un.isConnected(0, 2));
console.log(un.getCount());