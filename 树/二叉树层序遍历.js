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


var helper = function (root, level, result) {
    //这里判断是第一次遍历到level层级，方法还有一种 level === result.length
    // if(!result[level]){
    if (level === result.length) {
        result[level] = [root.val];
    } else {
        result[level].push(root.val);
    }
    if (root.left) {
        helper(root.left, level + 1, result);
    }
    if (root.right) {
        helper(root.right, level + 1, result);
    }

}
/**
 * 递归写法DFS
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderDFS = function (root) {
    //BFS
    if (root === null) {
        return [];
    }
    let result = [];

    helper(root, 0, result);
    return result;
}

console.log('DFS:', levelOrderDFS(test));