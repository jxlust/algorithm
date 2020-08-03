/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/****** 层序遍历进行序列化和反序列化 ******  /
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  if (!root) {
    return '#,';
  }
  let str = '';
  let queue = [];
  queue.push(root);
  while (queue.length) {
    let cur = queue.shift();
    if (cur) {
      str += cur.val + ',';
    } else {
      str += '#,';
      continue;
    }
    queue.push(cur.left)
    queue.push(cur.right)
  }
  return str;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  // data.trim();
  var getNode = function (v) {
    if (v === '#') {
      return null;
    } else {
      return new TreeNode(v);
    }
  }
  let array = data.split(',');
  let n = array.length - 1;
  let queue = [];
  let index = 0;
  let root = getNode(array[index++]);
  if (root) {
    queue.push(root)
  }
  while (queue.length) {
    let node = queue.shift();

    node.left = getNode(array[index++]);
    if (node.left) {
      queue.push(node.left)
    }

    node.right = getNode(array[index++]);
    if (node.right) {
      queue.push(node.right)
    }
  }
  return root
};


/****** 前序遍历进行序列化和反序列化 ******  /
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize2 = function (root) {
  let stack = [];
  if (!root) {
    return '#,'
  }
  let str = ''
  stack.push(root)
  while (stack.length) {
    let cur = stack.pop();
    if (cur) {
      str += cur.val + ','
      stack.push(cur.right)
      stack.push(cur.left)
    } else {
      str += '#,'
    }

  }
  return str;
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize2 = function (data) {
  const getNode = (val) => {
    if (val === '#') {
      return null;
    } else {
      return new TreeNode(val)
    }
  }
  let arr = data.split(',');
  // [ '1', '2', '#', '#', '3', '4', '#', '#', '5', '#', '6', '#', '#', '' ]
  let stack = [];
  let index = 0;
  let root = getNode(arr[index++]);
  let cur = root;

  while (cur || stack.length) {
    if (cur) {
      stack.push(cur);
      cur.left = getNode(arr[index++]);
      cur = cur.left;
    } else {
      cur = stack.pop();
      cur.right = getNode(arr[index++]);
      cur = cur.right;
    }

  }

  return root;

}


// let test = '1,2,3,null,null,4,5'
// let deNode = deserialize(test);
// console.log('反序列化：', deNode);
let tree = {
  val: 1,
  right: {
    val: 3,
    right: {
      val: 5,
      right: {
        val: 6,
        left: null,
        right: null
      },
      left: null
    },
    left: {
      val: 4,
      right: null,
      left: null
    }
  },
  left: {
    val: 2,
    right: null,
    left: null
  }
}
let string = serialize2(tree);
console.log('序列化：', string);
let node = deserialize2(string)
console.log('反序列化：', JSON.stringify(node));
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
// [1,2,3,null,null,4,5]
//  serialize()
