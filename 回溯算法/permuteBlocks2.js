function test() {
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
      shape: ["1", "2"],
    },
  ];
  permuteBlocksStack(blocks);
}

test();

/**
 * 物体块n，有m中状态的排列组合
 * 算法问题，对一组存在二级分组的数据，输出全排列
 * 这里提供解法2 自顶向下
 * @param  blocks
 */
function permuteBlocks(blocks) {
  const result = [];
  const visitedSet = new Set();
  const dfs = (n, list, path) => {
    if (path.size === blocks.length) {
      // 完成一次排列
      // return [];
      result.push([...list]);
    }
    for (let block of blocks) {
      const key = block.key;
      if (path.has(key)) {
        continue;
      }
      path.add(key);
      for (let shape of block.shape) {
        //  如果shape可能存在重复的，需要去重，比如shape:['1','1','2','3']
        // list.includes(key+shape) continue
        list.push(key + shape);
        dfs(n + 1, list, path);
        list.pop();
      }
      path.delete(key);
    }
  };

  dfs(0, [], visitedSet);
  console.log(result);
}

function swap(list, i, j) {
  const temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}
/**
 * 数组的全排列
 * @param {*} list
 * @returns
 */
function permuteArray(list) {
  const stack = [];
  const dataSize = list.length;
  stack.push({
    index: 0,
    list,
  });
  const result = [];
  while (stack.length) {
    const cur = stack.pop();
    const { index, list } = cur;
    if (index === dataSize - 1) {
      // ok
      result.push(list);
    } else {
      for (let i = index; i < dataSize; i++) {
        const copyList = [...list];
        swap(copyList, i, index);
        stack.push({
          index: index + 1,
          list: copyList,
        });
      }
    }
  }
  return result;
}
/**
 * 手动栈，实现全排列
 * @param {*} blocks
 */
function permuteBlocksStack(blocks) {
  let result = [[]];
  // 因为是需要对目标全排列
  for (let b of blocks) {
    const { key, shape } = b;
    const curList = [];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < shape.length; j++) {
        curList.push([...result[i], key + shape[j]]);
      }
    }
    // 这里每次都需要重置result
    result.length = 0;
    result.push(...curList);
    // []
    // [A1] [A2] [A3]
    // [A1,B1] [A1,B2] _ [A2,B1] [A2,B2]...
    // [A1,B1,C1] ....
    // 遍历上一次结果集，然后遍历当前选择集，进行添加
  }
  console.log("组合：", result);
  // 然后每组里面的再进行排列组合
  const allList = [];
  for (let list of result) {
    const ret = permuteArray(list);
    allList.push(...ret);
  }
  console.log(allList.length, allList);
}

/**
 * 增加难度
 * 物体块n，有m中状态，可以填入到z个区域，请输出可以填入情况的全排列
 */
function permuteAllInMapStack(z, blocks) {
  const result = [];
  const mapKey = new Set();
  const container = new Array(z).fill("");
}
