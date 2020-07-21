/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {

  const helper = function (node1, node2) {
    if (node1 === null && node2 === null) {
      return true;
    }
    if (node1 === null || node2 === null) {
      return false;
    }
    if (node1.val != node2.val) {
      return false;
    }
    return helper(node1.left, node2.right) && helper(node1.right, node2.left)
  }

  if (root) {
    return helper(root.left, root.right)
  } else {
    return true;
  }
};

var isSymmetric = function (root) {
  if(root === null || (root.left === null && root.right === null)){
    return true;
  }
  let queue = [];
  queue.push(root.left)
  queue.push(root.right)

  while(queue.length){
    let left = queue.shift();
    let right = queue.shift();

    if(!left && !right){
        continue;
    }
    if(!left || !right){
      return false;
    }
    if(left.val !== right.val){
      return false;
    }
    queue.push(left.left);
    queue.push(right.right);
    queue.push(left.right);
    queue.push(right.left);
  }
  return true;
}