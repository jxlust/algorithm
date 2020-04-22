/**
 * 哈夫曼树：给定N个权值作为N个叶子结点，构造一棵二叉树，若该树的带权路径长度达到最小，称这样的二叉树为最优二叉树
 * ，也称为哈夫曼树(Huffman Tree)。哈夫曼树是带权路径长度最短的树，权值较大的结点离根较近。
 * 
 * 构造：
 假设有n个权值，则构造出的哈夫曼树有n个叶子结点。 n个权值分别设为 w1、w2、…、wn，则哈夫曼树的构造规则为：
(1) 将w1、w2、…，wn看成是有n 棵树的森林(每棵树仅有一个结点)；
(2) 在森林中选出两个根结点的权值最小的树合并，作为一棵新树的左、右子树，且新树的根结点权值为其左、右子树根结点权值之和；
(3)从森林中删除选取的两棵树，并将新树加入森林；
(4)重复(2)、(3)步，直到森林中只剩一棵树为止，该树即为所求得的哈夫曼树。
 */

 /**
  * 哈夫曼编码
  * @param {string} str 
  */
const HuffMan = function (str) {
    this.str = str; //ascii字符串
    this.map = {};
    this.code = null;
    this.nodeLists = [];

}

const NodeTree = function (obj, left, right) {
    this.obj = obj;
    this.left = left;
    this.right = right;
}

HuffMan.prototype.getKeyCountMap = function (str) {
    let map = {};
    for (let v of str) {
        if (v in map) {
            map[v]++;
        } else {
            map[v] = 1;
        }
    }
    this.map = map;
    this.sortMap(map);
    // return map;
}

HuffMan.prototype.sortMap = function (map) {
    let keys = Object.keys(map);
    let arr = [];
    for (let k of keys) {
        let obj = {
            key: k,
            val: map[k]
        }
        arr.push(new NodeTree(obj, null, null));
    }
    //小到大排序
    this.nodeLists = arr.sort((v1, v2) => {
        return v1.obj.val - v2.obj.val;
    })
    // console.log(this.nodeLists);
}
HuffMan.prototype.toTree = function () {
    let i = 0;
    let lists = this.nodeLists;
    let parentNode;
    while (lists.length > 1) {
        parentNode = new NodeTree({
            key: null,
            val: lists[i]['obj'].val + lists[i + 1]['obj'].val
        }, lists[i], lists[i + 1])
        lists.splice(i, 2);
        lists.push(parentNode);
        lists.sort((v1, v2) => {
            return v1.obj.val - v2.obj.val;
        })
    }
    let root = lists[0] || new NodeTree();
    // console.log('root', root);
    return root;

}
HuffMan.prototype.changeD = function (tree, code) {
    if (tree.left !== null) {
        this.changeD.call(this, tree.left, code + '0')
    } else {
        this.map[tree.obj.key] = code;
    }
    if(tree.right !== null){
        this.changeD.call(this,tree.right,code + '1');
    }else{
        this.map[tree.obj.key] = code;
    }
}
HuffMan.prototype.codeStr = function () {
    this.getKeyCountMap(this.str);
    let tree = this.toTree();
    this.changeD(tree, '');
    // console.log(this.map);
    let result = '';
    for(let s of this.str){
        result += this.map[s]
    }
    console.log(result);
    return result;

}

new HuffMan('abbcccdddd').codeStr();