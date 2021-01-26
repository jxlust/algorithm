//思路
//一样，分割好左右子树，然后递归调用
//前序： 根节点 【左子树】【右子树】
//后序：【左子树】【右子树】【根】
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */
var constructFromPrePost = function (pre, post) {
    const map = new Map();
    for (let i = 0; i < post.length; i++) {
        map.set(post[i], i)
    }
    let n = pre.length;

    const helper = function (preS, preE, postS, postE) {
        if (preE >= n || postE >= n) return null;
        if (preS > preE || postS > postE) return null;
        let root = new TreeNode(pre[preS])
        // let presNext = preS + 1;
        let L = 0;
        if (preS + 1 <= preE) {
            let index = map.get(pre[preS + 1]);
            L = index - postS;
        }
        // pre : presNext ~ presNext + L
        //post: postS ~ index
        root.left = helper(preS + 1, preS + 1 + L < preE ? preS + 1 + L : preE, postS, postS + L);
        //pre:  presNext + L + 1  ~  preE
        //post: index + 1  ~ postE-1
        root.right = helper(preS + 2 + L, preE, postS + L + 1, postE - 1);
        return root;
    }
    return helper(0, n - 1, 0, n - 1);
};


/**
 * 时间复杂度较高
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */
var constructFromPrePost = function (pre, post) {
    const map = new Map();
    for (let i = 0; i < post.length; i++) {
        map.set(post[i], i)
    }
    let N = pre.length;
    if (N === 0) return null;
    let root = new TreeNode(pre[0]);
    if (N === 1) return root;
    let nextV = pre[1];
    let L = map.get(nextV);
    root.left = constructFromPrePost(pre.slice(1, 2 + L), post.slice(0, L + 1));
    root.right = constructFromPrePost(pre.slice(2 + L, N), post.slice(L + 1, N));
    return root;
};
let test = [1, 2, 4, 5, 3, 6, 7],
    test2 = [4, 5, 2, 6, 7, 3, 1]
console.log(constructFromPrePost(test, test2));