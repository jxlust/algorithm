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

let arr = [1, 2, 5, 3, 4]; //权值

/**
 * 二叉树构造
 * @param {Number} data 
 * @param {Object} left 
 * @param {Object} right 
 */
function TreeNode(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}

const Huffman = function (arr) {
    this.arr = arr;
    this.treeLists = null;
    this.tree = null;

}
Huffman.prototype.initTree = function () {
    // this.arr.filter(v => {
    //     return v !== '';
    // })
    this.arr.sort((a, b) => {
        if (a > b) {
            return 1;
        } else {
            return -1;
        }
    })
    // this.treeLists = new Array();
    this.treeLists = this.arr;
    this.treeLists = this.arr.map(v => {
        return new TreeNode(v, null, null);
    })
    // console.log(this.treeLists);

}
Huffman.prototype.createTree = function () {
    while (this.treeLists.length > 1) {
        let mergeTree = new TreeNode((this.treeLists[0].data + this.treeLists[1].data), this.treeLists[0], this.treeLists[1]);
        this.treeLists.splice(0, 2); //删除前两项
        this.treeLists.push(mergeTree);
        this.treeLists.sort((a, b) => a.data - b.data);
    }
    console.log(JSON.stringify(this.treeLists));
    this.tree = this.treeLists[0] || new TreeNode();
}

Huffman.prototype.encode = function () {
    //对树进行编码 左边0 右边1
    this.map = {}; //存放权重对应的编码值

}

Huffman.prototype.start = function () {
    this.initTree();
    this.createTree();
    console.log(this.tree);
}
new Huffman(arr).start();

var str = 'abcde';
var left = 0,
    right = str.length - 1;
while(left < right){
    [str[left],str[right]] = [str[right],str[left]];
    left++;
    right--;
}
console.log(str);