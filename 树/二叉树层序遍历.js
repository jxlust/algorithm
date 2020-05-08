/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    //BFS
    if (root === null) {
        return [];
    }
    let queue = [];
    queue.push(root);
    let result = [];
    while (queue.length) {
        let arr = [];
        for (let i = queue.length - 1; i >= 0; i--) {
            let node = queue.shift();
            arr.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(arr);
    }
    return result;
};
var test = {
    val: 1,
    left: {
        val: 2,
        left: null,
        right: null,
    },
    right: {
        val: 3,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 5,
            left: null,
            right: null
        }
    }
}
console.log(levelOrder(test));