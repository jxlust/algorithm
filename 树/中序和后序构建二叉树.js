/**
 * @param {number[]} inorder 中序遍历数组
 * @param {number[]} postorder 后序遍历数组
 * @return {TreeNode}
 */
var buildTree = function (inorder, postorder) {
  //思路：找根节点，划分左右子树
  let n = inorder.length;
  //先记录一下中序的遍历数据的位置
  let map = new Map();
  for (let i = 0; i < n; i++) {
    map.set(inorder[i], i);
  }

  const helper = (iStart, iEnd, pStart, pEnd) => {
    if (iStart > iEnd) {
      return null;
    }
    if (pStart > pEnd) {
      return null;
    }
    let nodeV = postorder[pEnd];
    let iPos = map.get(nodeV);
    let disLeft = iPos - iStart;
    let node = new TreeNode(nodeV);
    node.left = helper(iStart, iPos - 1, pStart, pStart + disLeft - 1);
    node.right = helper(iPos + 1, iEnd, pStart + disLeft, pEnd - 1)

    return node;
  }
  return helper(0, n - 1, 0, n - 1)
};
