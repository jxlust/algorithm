/**
 * 并查集思路在于什么时候合并，什么时候查找
 * 这题思路是把==的数据进行合并，对于!=的再查找是否存在于同一颗树里面，存在同一颗树则false,都不存在则true
 */
class UF {
  constructor(n) {
      // this.count = n;
      this.parent = []; //指向的父节点
      this.size = []; //每颗树的重量大小
      //初始化
      for (let i = 0; i < n; i++) {
          this.parent[i] = i;
          this.size[i] = 1;
      }

  }
  /**
   * 找根节点
   * @param {*} x 
   */
  find(x) {
      while (x != this.parent[x]) {
          //压缩路径
          this.parent[x] = this.parent[this.parent[x]];
          x = this.parent[x];
      }
      return x;
  }
  union(p, q) {
      let rootP = this.find(p);
      let rootQ = this.find(q);
      if (rootP === rootQ) return;
      if (this.size[rootP] > this.size[rootQ]) {
          this.parent[rootQ] = rootP;
          this.size[rootP] += this.size[rootQ];
      } else {
          this.parent[rootP] = rootQ;
          this.size[rootQ] += this.size[rootP];
      }
      // this.count--;

  }
  isConnected(p, q) {
      let rootP = this.find(p);
      let rootQ = this.find(q);
      return rootP === rootQ
  }
  // getCount() {
  //     return this.count;
  // }
}

/**
* @param {string[]} equations
* @return {boolean}
*/
var equationsPossible = function (equations) {
  let map = [];//存放判断！=的字符
  //字符转字符码
  let uf = new UF(26);
  //a = 0,b=1;
  // let aCode = 'a'.charCodeAt();//97
  for (let v of equations) {
      let v1 = v[0].charCodeAt() - 97;
      let v2 = v[3].charCodeAt() - 97;
      if (v[1] === '=') {
          //union
          uf.union(v1, v2)
      } else {
          map.push([v1, v2])
      }
  }
  for (let [v1, v2] of map) {
      if (uf.isConnected(v1, v2)) {
          return false;
      }
  }
  return true;

};