/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
/**
 * 思路很简单，序列化二叉树，因为每棵树都有唯一序列化字符串
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
    let result = [];
    let map = new Map();
    const helper = function (node) {
        if (node === null) {
            return '#';
        }
        let serialize = node.val + ',' + helper(node.left) + ',' + helper(node.right);
        console.log(serialize);
        if (map.has(serialize)) {
            let v = map.get(serialize);
            if (v === 1) {
                result.push(node)
            }
            map.set(serialize, v + 1)
        } else {
            map.set(serialize, 1)
        }
        return serialize
    }
    helper(root)
    return result;
};
//    1
// 2    3
//    4   5
let test = {
    val: 1,
    left: {
        val: 2,
        left: null,
        right: null
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
console.log(findDuplicateSubtrees(test));

/**
 * 数组元素都非空，依次填充生成二叉树
 * @param {number[]} arr 
 */
const createTreeByArray = function (arr) {
    const helper = function (index) {
        let node = null;
        if (index < arr.length) {
            node = new TreeNode(arr[index]);
            node.left = helper(2 * index + 1);
            node.right = helper(2 * index + 2)
        }
        return node;
    }
    return helper(0)
}
let arr = [1, 2, 3, 4, 5]
// console.log(createTreeByArray(arr));

/**
 *    1
 *  2   3
 *     4 5
 * 层序遍历还原二叉树 1,2,3,#,#,4,5
 * [1,2,3,null,null,4,5]
 * @param {number[]} arr 
 */
const createTreeBySequence = function (arr) {
    const getNode = function (v) {
        return v === '#' ? null : new TreeNode(v)
    }
    if (!arr || arr.length === 0) return null;
    let n = arr.length;
    let queue = [];
    let index = 0;
    let root = getNode(arr[index++]);
    if (root) queue.push(root);
    while (queue.length) {
        let node = queue.shift();
        let leftNode = null;
        if (index < n) {
            leftNode = getNode(arr[index++]);
        }
        node.left = leftNode;
        if (leftNode) {
            queue.push(leftNode)
        }
        let rightNode = null;
        if (index < n) {
            rightNode = getNode(arr[index++]);
        }
        node.right = rightNode;
        if (rightNode) {
            queue.push(rightNode);
        }
    }
    return root;
}
console.log(createTreeBySequence([1,2,3,'#','#',4,5]));