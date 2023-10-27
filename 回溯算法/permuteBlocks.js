/**
 * 物体块n，有m中状态的排列组合
 * @param  blocks
 */
function permuteBlocks(blocks) {
  const result = [];
  const dfs = (n, path, parent) => {
    if (path.length === blocks.length) {
      // 完成一次排列
      result.push([...path]);
    }
    for (let item of blocks) {
      if (parent.includes(item.key)) {
        continue;
      }
      parent.push(item.key);
      for (let sp of item.shape) {
        if (path.includes(item.key + sp)) {
          continue;
        }
        // 选择一种形状
        path.push(item.key + sp);
        // 深度搜索
        dfs(n + 1, path, parent);
        // 撤销
        path.pop();
      }
      parent.pop();
    }
  };

  dfs(0, [], []);
  console.log(result);
}

const map = ["M1", "M2", "M3"];
const blocks = [
  {
    key: "A",
    shape: ["1", "2", "3"],
  },
  {
    key: "B",
    shape: ["1", "2"],
  },
  {
    key: "C",
    shape: ["1"],
  },
];

permuteBlocks(blocks);

/**
 * 增加难度
 * 物体块n，有m中状态，可以填入到z个区域，请输出可以填入情况的全排列
 */
function permuteAllInMap(z, blocks) {
  const result = [];
  const mapKey = new Set();
  const dfs = (n, path, parent, map) => {
    // block放完了就输出
    if (path.length === blocks.length) {
      const keys = map.join("#");
      if (!mapKey.has(keys)) {
        result.push([...map]);
        mapKey.add(keys);
      }
      return;
    }
    for (let block of blocks) {
      if (parent.includes(block.key)) {
        continue;
      }
      parent.push(block.key);
      for (let sp of block.shape) {
        const shapeV = block.key + sp;
        if (path.includes(shapeV)) {
          continue;
        }
        path.push(shapeV);
        let isFill = false;
        for (let i in map) {
          if (map[i] === "") {
            isFill = true;
            // 可以填入
            map[i] = shapeV;
            dfs(n + 1, path, parent, map);
            map[i] = "";
          }
        }
        if (!isFill) {
          // 处理没有填入的情况
          dfs(n + 1, path, parent, map);
        }
        path.pop();
      }

      parent.pop();
    }
  };

  const container = new Array(z).fill("");
  dfs(0, [], [], container);
  console.log("length:", result.length, "map:", result);
}

permuteAllInMap(2, blocks);

function permuteBlocksStack(blocks) {
  let stack = [];
  let length = blocks.length;
  let result = [];

  for (let b of blocks) {
    for (let s of b.shape) {
      stack.push(b.key + "_" + s);
    }
  }
  
}

permuteBlocksStack(blocks);

/**
 * 增加难度 利用手动stack处理
 * 物体块n，有m中状态，可以填入到z个区域，请输出可以填入情况的全排列
 */
function permuteAllInMapByStack(z, blocks) {
  const result = [];
  const mapKey = new Set();
  // container
  const container = new Array(z).fill("");
  const stack = [];
  for (let block of blocks) {
    stack.push(block);
  }
  // 最多放置到地图容器里块个数
  const maxCount = Math.min(z, blocks.length);
  const path = [];
  while (stack.length) {
    // 栈不为空
    if (path.length === maxCount) {
      // 能填的都填完了
      // 防止重复
      let keys = container.join("#");
      if (!mapKey.has(keys)) {
        mapKey.add(keys);
        result.push([...container]);
      }
      // clear
      path.length = 0;
    }
    const cur = stack.pop();
    const shape = cur.shape;

    for (let s of shape) {
      let shapeKey = cur.key + s;
      path.push(shapeKey);
    }
  }

  console.log("length:", result.length, "map:", result);
}

// permuteAllInMapByStack(3, blocks);
