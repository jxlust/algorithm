//描述：
//先序遍历：根节点 →左子树 → 右子树，在子树中继续应用左子树 → 根节点 → 右子树；
//中序遍历：左子树 → 根节点 → 右子树，同理
//后序遍历：左子树 → 右子树 → 根节点，同理

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 二叉树中序遍历 左子树 -> 根节点 -> 右子树
 * @param {TreeNode} root
 * @return {number[]}
 */
var helper = function (root, result) {
    if (root) {
        if (root.left) {
            helper(root.left, result);
        }
        result.push(root.val);
        if (root.right) {
            helper(root.right, result);
        }
    }
}
var inorderTraversal = function (root) {
    let arr = [];
    helper(root, arr);
    return arr;
};

var inorderTraversal2 = function (root) {
    if (!root) {
        return [];
    }
    return [].concat(arguments.callee(root.left),root.val,arguments.callee(root.right))
}

/**
 * 非递归的中序遍历
 * @param {TreeNode} root 
 */
var inorderTraversal3 = function (root) {
    let stack  = [];
    let res = [];
    // let cur = root;
    let cur = root;
    while(cur || stack.length){
        while(cur){
            //左子树入栈
            stack.push(cur);
            cur = cur.left;
        }
        //弹出最后进入的左子树
        cur = stack.pop();
        res.push(cur.val);
        cur = cur.right;
    }
    return res;
}
const TreeNode = function (val) {
    this.val = val;
    this.left = this.right = null;
}

// 输入 [1,null,2,3]
//    1
//     \
//      2
//     /
//    3
// 输出: [1,3,2]

const ArrayToTree = function (arr) {
    if (!arr || arr.length === 0) {
        return null;
    }
    let lists = [];
    for (let v of arr) {
        if (v) {
            lists.push(new TreeNode(v));
        } else {
            lists.push(null);
        }
    }
    let i = 0;
    let half = (arr.length >> 1) - 1;
    while (i <= half) {
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        while (arr[i] == null && i < arr.length) {
            i++;
        }
        if (l < arr.length && arr[l] != null) {
            lists[i].left = lists[l];
        } else {
            if (lists[i]) {
                lists[i].left = null;
            }
        }
        if (r < arr.length && arr[r] != null) {
            lists[i].right = lists[r];
        } else {
            if (lists[i]) {
                lists[i].right = null;
            }
        }
        i++;
    }
    return lists[0];
    // console.log('lists:',lists[0]);
}
let tree = ArrayToTree(['A', null, 'B', 'C', 'D']);
console.log('tree', tree);

// console.log('中序遍历1：', inorderTraversal(tree));
console.log('中序遍历2：', inorderTraversal2(tree));
console.log('中序遍历3：', inorderTraversal3(tree));

