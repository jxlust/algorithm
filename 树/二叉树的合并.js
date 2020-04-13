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
    this.left = this.right = null;
}

/**
 * 
 * @param {number[]} arr
 * @return {TreeNode} 
 */
const ArrToTreeNode = function (arr) {
   
}

// var test = {
//     val: 5,
//     left: {
//         val: 2,
//         left: 3,
//         right: null
//     },
//     right: {
//         val: 8,
//         left: {
//             val: 10,
//             left: null,
//             right: 8
//         },
//         right: 12
//     }
// }