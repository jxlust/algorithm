var postorderTraversal = function (root) {
  let result = [];
  let stack = [];

  let pre = null;
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    //root 为null了
    cur = stack.pop();
    if(cur.right === null || cur.right === pre){
      result.push(cur.val);
      pre = cur;
      cur = null;
    }else{
      stack.push(cur);
      cur = cur.right;
    }
  }
  return result;

}
