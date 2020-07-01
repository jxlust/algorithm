const TreeNode = function (val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
// 注意:
// 你可以假设树中没有重复的元素。

const buildTree = function (preorder, inorder) {

  let map = {};
  let n = inorder.length;
  // let map = new Map();
  for (let i = 0; i < n; i++) {
    map[inorder[i]] = i;
  }
  const helper = function (p_start, p_end, i_start, i_end) {
    // console.log(pre, inor);
    console.log(p_start,p_end,i_start,i_end);
    // if (p_start == p_end) {
    //   return null;
    // }
    if(p_start > p_end){
      return null;
    }

    let rV = preorder[p_start];
    let root = new TreeNode(rV);
    let nIndex = map[rV];
    let leftNum = nIndex - i_start;
    root.left = helper(p_start + 1, p_start  + leftNum, i_start, nIndex - 1);
    root.right = helper(p_start + 1 + leftNum, p_end, nIndex + 1, i_end);
    return root;
  }
  return helper(0, n-1 , 0, n-1 )

}
const buildTree3 = function (preorder, inorder) {

  const helper = function (pre, inor) {
    console.log(pre, inor);
    let map = {};
    // let map = new Map();
    for (let i = 0; i < inor.length; i++) {
      map[inor[i]] = i;
    }
    if (pre.length === 0 || inor.length === 0) {
      return null;
    }
    let rV = pre[0];
    let root = new TreeNode(rV);
    let nIndex = map[rV];
    root.left = helper(pre.slice(1, nIndex + 1), inor.slice(0, nIndex));
    root.right = helper(pre.slice(nIndex + 1), inor.slice(nIndex + 1));
    return root;
  }
  return helper(preorder, inorder)

}

let test1 =  [3,9,20,15,7]
let test2 = [9,3,15,20,7]
console.log(JSON.stringify(buildTree(test1, test2)));
