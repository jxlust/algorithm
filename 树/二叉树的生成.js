/**
 * 数组变成完全二叉树
 * @param {number[]} arr 
 * @param {number} index
 * @return TreeNode
 */
const ArrayToTree = function (arr, index = 0) {
    if (!arr || arr.length === 0) {
        return null;
    }
    let treeNode = null;
    if (index < arr.length) {
        treeNode = new TreeNode();
        treeNode.val = arr[index];
        treeNode.left = ArrayToTree(arr, 2 * index + 1);
        treeNode.right = ArrayToTree(arr, 2 * index + 2);
    }
    return treeNode;
}

/**
 * 迭代法创建普通二叉树，这里利用了对象的引用
 * @param {number[]} arr 
 */
const ArrayToTree2 = function (arr) {
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
console.log(ArrayToTree2([1, null, null, null, 2]));