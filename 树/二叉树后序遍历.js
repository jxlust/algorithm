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
    if (cur.right === null || cur.right === pre) {
      result.push(cur.val);
      pre = cur;
      cur = null;
    } else {
      stack.push(cur);
      cur = cur.right;
    }
  }
  return result;

}


var postorderTraversal = function (root) {
  let result = [];
  let stack = [];

  let pre = null;

  while (root || stack.length) {
    if (root) {
      stack.push(root)
      root = root.left;
    } else {
      let top = stack[stack.length - 1];
      if (top.right === null || top.right === pre) {
        stack.pop();
        result.push(top.val);
        pre = top;
      } else {
        root = top.right;
      }
    }
  }

  return result;

}


// 栈的思想 找到出栈的地方，和递归入栈的地方，类比 递归的输出return和递归调用

var postorderTraversal = function (root) {
  //  1
  // 2 3
  //  4 5 
  let res = [];
  let stack = [];
  let cur = root;
  let pre = null; //存上一次拜访过的节点
  while (cur || stack.length) {
    if (cur) {
      stack.push(cur);
      cur = cur.left;
    } else {
      let top = stack[stack.length - 1];
      if (top.right === null && top.right === pre) {
        stack.pop();//出栈的值===top
        res.push(top.val);
        pre = top;
      } else {
        cur = top.right;
      }
    }
  }

  return res;
}