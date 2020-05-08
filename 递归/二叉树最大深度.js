/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * BFS搜索
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
    let queue = [];
    let used = [];
    if (root) {
        queue.push(root);
    }
    used.push(root);
    let count = 0;
    while (queue.length) {
        // let node = queue.shift();
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }

        count++;
    }
    return count;
};

/**
 * 深度优先搜索,递归加分治
 * @param {Treenode} root 
 */
const maxDepth2 = function (root) {
    if (root === null) {
        return 0;
    }
    return Math.max(maxDepth2(root.left), maxDepth2(root.right)) + 1;
}
/**
 * 改成用栈实现的DFS
 * @param {Treenod} root 
 */
const maxDepth3 = function (root) {
    if (root === null) {
        return 0;
    }
    let stack = [{
        dep: 1,
        node: root
    }];
    let maxDep = 0;
    while (stack.length) {
        let {
            dep,
            node
        } = stack.pop();
        if (node.left === null && node.right === null) {
            maxDep = Math.max(dep, maxDep);
        }
        if (node.left) {
            stack.push({
                dep: dep + 1,
                node: node.left
            });
        }
        if (node.right) {
            stack.push({
                dep: dep + 1,
                node: node.right
            });
        }
    }
    return maxDep;

}
const TreeNode = function (val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * 创建完全二叉树
 * @param {number[]} test 
 */
const createTree = function (arr, index = 0) {
    if (!arr || arr.length === 0) {
        return null;
    }
    let tree = null;
    if (index < arr.length) {
        tree = new TreeNode(arr[index]);
        tree.left = createTree(arr, 2 * index + 1);
        tree.right = createTree(arr, 2 * index + 2);
    }
    return tree;
}

console.log(createTree([]));
let testNode = createTree([3, 9, 20, null, null, 15, 7]);
console.log(maxDepth(testNode));


/**
 * 二叉树最小深度
 * @param {TreeNode} root 
 */
var minDepth2 = function (root) {
    if (root === null) {
        return 0;
    }
    if (root.left === null && root.right === null) {
        return 1;
    }
    let left = minDepth2(root.left);
    let right = minDepth2(root.right);
    return (left && right) ? 1 + Math.min(left, right) : left + right + 1;
};
var minDepth3 = function (root) {
    if (!root) {
        return 0;
    }
    if (root.left === null && root.right === null) {
        return 1;
    }
    let queue = [];
    let minDep = 1;
    if (root.left === null) {
        queue.push(root.right);
        minDep++;
    } else if (root.right === null) {
        queue.push(root.left);
        minDep++;
    } else {
        queue.push(root);
    }
    while (queue.length) {
        let size = queue.length;
        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            if (node.left === null && node.right === null) {
                return minDep;
            }
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        minDep++;
    }

};

var minDepth3 = function (root) {
    if (!root) {
        return 0;
    }
    let result = 1;
    let queue = [{dep:1,node:root}];
    while(queue.length){
        let {dep,node} = queue.shift();
        result = dep;
        if(node.left === null && node.right === null){
            break;
        }
        if(node.left){
            queue.push({dep:dep+1,node:node.left});
        }
        if(node.right){
            queue.push({dep:dep+1,node:node.right});
        }
    }
    return result;
}


console.log('min:', minDepth(createTree([1, 2, 3, 4, null, null, 2])));