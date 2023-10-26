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
