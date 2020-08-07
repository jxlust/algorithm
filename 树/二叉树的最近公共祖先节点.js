/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 二叉树的最近公共祖先
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  /**
   * DFS后序遍历
   * 1. 根节点左子树存不存在最近公共祖先，不存在则在右子树
   * 2. 左子树和右子树都不存在 则为根节点
   */
  if (root === null || root === p || root === q) {
    return root;
  }
  let leftNode = lowestCommonAncestor(root.left, p, q);
  let rightNode = lowestCommonAncestor(root.right, p, q);
  if (leftNode && rightNode) {
    return root;
  }
  return leftNode ? leftNode : rightNode


}

var lowestCommonAncestor2 = function (root, p, q) {
  let pPath = [];
  let qPath = [];

  const dfs = function (node, p, stack) {
    if (!node) {
      return false;
    }
    stack.push(node)
    if (node.val === p.val) {
      return true
    }
    //先去找左子树
    let b = false;
    if (node.left) {
      b = dfs(node.left, p, stack)
    }
    //左子树没找到，找右子树
    if (!b && node.right) {
      b = dfs(node.right, p, stack)
    }
    if (!b) {
      //都没找到出栈，该根节点
      stack.pop()
    }
    return b;

  }

  dfs(root, p, pPath);
  dfs(root, q, qPath);
  let i = 0;
  while (i < pPath.length && i < qPath.length && pPath[i] === qPath[i]) {
    i++;
  }
  if (i - 1 < 0) {
    return null
  } else {
    return pPath[i - 1]
  }

};

var lowestCommonAncestor3 = function (root, p, q) {
  const getPath = (root, node) => {
    let path = [];
    let stack = [];
    let pre = null;
    if (root) {
      stack.push(root);
    }
    while (stack.length) {
      let cur = stack.pop();
      path.push(cur);
      if (cur === node) {
        //找到了该节点
        break
      }
      if (cur.right) {
        stack.push(cur.right)
      } else {

      }
      if (cur.left) {
        stack.push(cur.left)
      }
    }

    return stack;
  }
}

const searchNode = function (root, node) {
  if (root == null || node == null) return [];
  let s = [];
  let p = root;
  let pre = null; //上一次出栈的结点
  while (p || s.length) {
    while (p) {
      //这个while循环的思想还是一直往左找，找的过程结点入栈，如果找到了就打印输出并返回。
      s.push(p);
      if (p.val == node.val) {
        return s;
      }
      console.log(1,p);
      p = p.left;
    }
    //走到这一步说明栈顶元素的左子树为null，那么就开始往栈顶元素的右子树上去找。
    if (s.length) {
      p = s[s.length - 1];
      //如果栈顶元素的右子树为null，或者右子树被遍历过，则弹栈。
      console.log(2,p);
      while (p.right == null || pre != null && p.right == pre) {
        pre = s.pop();
        p = s[s.length - 1];
      }
      console.log(3,p);
      //继续遍历p的右子树
      p = p.right;
    }
  }
  return s;
}

let root = {
  val: 1,
  left: {
    val: 5,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null
    }
  },
  right: {
    val: 8,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: null
  }
}

let p = {
  val: 3,
  left: null,
  right: null
}
let q = {
  val: 6,
  left: null,
  right: null
}
searchNode(root,q)

// lowestCommonAncestor(root, p, q)
