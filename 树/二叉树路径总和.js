var hasPathSum = function (root, sum) {
  //深度优先搜索DFS
  const dfs = (node, s) => {
    // console.log(1, s, node);
    if (!node) {
      return false
    }
    if (!node.left && !node.right) {
      return sum === (s + node.val)
    }
    //回溯算法 第一种情况false回到上个节点走另一条分支
    return dfs(node.left, s + node.val) || dfs(node.right, s + node.val)

  }
  return dfs(root, 0)

};

//BFS
var hasPathSum = function (root, sum) {
  if (!root) {
    return false
  }
  //使用队列
  let queue = []
  queue.push({
    node: root,
    s: root.val,
  })
  let res = 0
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let {
        node,
        s
      } = queue.shift()
      if (!node.left && !node.right) {
        //是叶子节点了
        if (s === sum) {
          return true;
        }
      } else {
        if (node.left) {
          queue.push({
            node: node.left,
            s: s + node.left.val
          })
        }
        if (node.right) {
          queue.push({
            node: node.right,
            s: s + node.right.val
          })
        }

      }
    }
  }
  return false
}

var hasPathSum = function (root, sum) {
  if (!root) {
    return false;
  }
  let statck = [];
  statck.push({
    node: root,
    s: root.val
  })
  while (statck.length) {
    let {
      node,
      s
    } = statck.pop();
    if (!node.left && !node.right) {
      //叶子节点
      if (s === sum) {
        return true;
      }
    }
    if (node.left) {
      statck.push({
        node: node.left,
        s: s + node.left.val
      })
    }
    if (node.right) {
      statck.push({
        node: node.right,
        s: s + node.right.val
      })
    }
  }
  return false;
}
