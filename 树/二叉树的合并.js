/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function (t1, t2) {
    if (t1 == null) {
        return t2;
    }
    if (t2 == null) {
        return t1;
    }
    t1.val = t1.val + t2.val;
    t1.left = mergeTrees(t1.left, t2.left);
    t1.right = mergeTrees(t1.right, t2.right);
    return t1;
};

const TreeNode = function (val) {
    this.val = val;
    //都是TreeNode实例
    this.left = this.right = null;
}

/**
 * 
 * @param {number[]} arr
 * @return {TreeNode} 
 */
const ArrToTreeNode = function (arr, index = 0) {
    let treeNode = null;
    if (index < arr.length) {
        treeNode = new TreeNode();
        treeNode.val = arr[index];
        treeNode.left = ArrToTreeNode(arr, 2 * index + 1);
        treeNode.right = ArrToTreeNode(arr, 2 * index + 2);
    }
    return treeNode;
}
console.log(JSON.stringify( ArrToTreeNode([1,3,45,66,89,12,22,4])));

const ArrToTreeNode2 = function (arr) {
    
}