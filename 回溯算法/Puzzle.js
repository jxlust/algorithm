/**
 *
 * 日历拼图算法，定义一些blocks，有重量属性和形状属性，形状利用二维矩阵0和1表示；重量是整数；地图也是一个二维矩阵0和1表示；形状块可以旋转，翻转。用java实现，输出所有最优解，满足填入的形状块重量之和最大。
 * @param {*} postData
 */

function deepClone(obj) {
  if (obj === null || obj === undefined || obj === "") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }
  if (obj !== null && typeof obj === "object") {
    const to = {};
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });
    return to;
  }
  return obj;
}

function rotateMatrix(matrix) {
  const rotated = [];
  // 逆时针旋转90度
  for (let i = 0; i < matrix[0].length; i++) {
    const row = [];
    for (let j = matrix.length - 1; j >= 0; j--) {
      row.push(matrix[j][i]);
    }
    rotated.push(row);
  }
  return rotated;
}

function flippedMatrix(matrix) {
  const flipped = [];
  // 左右翻转
  for (let i = 0; i < matrix.length; i++) {
    const row = [];
    for (let j = matrix[i].length - 1; j >= 0; j--) {
      row.push(matrix[i][j]);
    }
    flipped.push(row);
  }
  return flipped;
}
function matrixToString(matrix) {
  return matrix.join("#");
}
function getAllTransform(matrix) {
  const ret = [];
  const usedSet = new Set();
  let cur = matrix;
  for (let i = 0; i < 4; i++) {
    cur = rotateMatrix(cur);
    for (let j = 0; j < 2; j++) {
      // flip
      cur = flippedMatrix(cur);
      const curStr = matrixToString(cur);
      if (!usedSet.has(curStr)) {
        ret.push(cur);
        usedSet.add(curStr);
      }
    }
  }
  return ret;
}

function isHaveThisKey(path, key) {
  let reg = new RegExp("^" + key, "ig");
  return path.some((item) => reg.test(item));
}

/**
 *  是否可以填入到对应位置
 * @param {*} container
 * @param {*} shape
 * @param {*} row
 * @param {*} col
 * @returns
 */
const isCanPlace = (container, shape, row, col) => {
  if (
    row < 0 ||
    row >= container.length ||
    col < 0 ||
    col >= container[0].length
  ) {
    return false;
  }
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (
        (i + row < container.length &&
          j + col < container[0].length &&
          container[i + row][j + col] != "" &&
          shape[i][j] === 1) ||
        (shape[i][j] === 1 &&
          (i + row >= container.length || j + col >= container[0].length))
      ) {
        return false;
      }
    }
  }
  return true;
};
/**
 * 回溯的回退方法
 */
const removeShape = (container, shape, row, col) => {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1) {
        container[row + i][col + j] = "";
      }
    }
  }
};

const fillTheShape = (container, shape, r, c, objIndex) => {
  for (let si = 0; si < shape.length; si++) {
    for (let sj = 0; sj < shape[0].length; sj++) {
      if (shape[si][sj] === 1) {
        container[si + r][sj + c] = objIndex;
      }
    }
  }
};

const getFillPostion = (shape, row, col, cols) => {
  // 这里获取填充的所有格子，因为前面一定得判断是否可以填入地图，所以这里的必要条件默认就是这个块可以填入到地图里面
  // 不用考虑边界问题，直接获取填入格子位置就行
  const fillCell = [];
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] === 1) {
        fillCell.push((i + row) * cols + j + col);
      }
    }
  }
  //   fillCell.sort((v1, v2) => v1 - v2);
  return fillCell.join("_");
};


function CalcPuzzle(postData) {
  // 结果集合
  // 回溯函数主要思路
  // 1. if(path.length === 区块长度) 一条路径已完成选择
  // 1.1  把结果添加到结果集
  // 2. 遍历所有选择块
  // 2.1 把选择尝试放进容器里面
  // if(!cantFill(block)) continue 跳过
  // path.push('block index');
  // 2.2 回溯dfs
  // dfs(map,deep+1)
  // 2.3 撤销选择
  // map 移除掉block
  const { row, column, blocks } = postData.container;
  const objects = postData.objects;
  const objLength = objects.length;
  const result = [];
  const usedMap = {};
  let maxWeight = -1;
  const container = new Array(row);
  for (let i = 0; i < row; ++i) {
    container[i] = new Array(column).fill("");
  }
  // 障碍填充
  for (let [r, c] of blocks) {
    container[r][c] = "Z";
  }
  const mapSize = row * column;

  const dfs = (map, curMax, pathKey) => {
    if (pathKey.size === objLength) {
      // 所有地图上的格子遍历完了，可以得出一个结果
      if (curMax > maxWeight) {
        // 出现了最优的情况，清空一下数据
        result.length = 0;
        maxWeight = curMax;
        // 深拷贝一下
        result.push(deepClone(map));
      } else if (curMax != 0 && curMax === maxWeight) {
        result.push(deepClone(map));
      }
      return;
    }

    for (let obj of objects) {
      // 做选择

      let allTransformsShape = getAllTransform(obj.shape);
      let isCanFill = false;

      for (let sn in allTransformsShape) {
        let shape = allTransformsShape[sn];

        for (let r = 0; r < row; r++) {
          for (let c = 0; c < column; c++) {
            // 位置，需要计算填入的一个唯一标识
            // 只计入shape为实体的填入位置排列

            const mk = obj.index + "_" + sn + "_" + (r * column + c);
            if (usedMap[mk]) {
              continue;
            }
            usedMap[mk] = true;
            if (isCanPlace(map, shape, r, c)) {
              isCanFill = true;
              // 可以放入
              // 容器填充shape
              fillTheShape(map, shape, r, c, obj.index);
              // 记录一下选择的shape index
              pathKey.add(obj.index);
              // shape填入容器完毕，dfs下一次
              // 计算下一个位置
              dfs(map, curMax + obj.weight, pathKey);
              // 从地图上移除
              removeShape(map, shape, r, c);
              pathKey.delete(obj.index);
            }
          }
        }
      }

      if (!isCanFill) {
        // 这块没有找到合适的填充地方
        pathKey.add(obj.index);
      }
    }
  };

  const pathKey = new Set();
  const parent = new Set();
  //   const visited = new Set();
  dfs(container, 0, pathKey);
  console.log("result:", result);
  console.log("use map:", usedMap);
}

const postData = {
  container: {
    row: 7,
    column: 7,
    blocks: [],
  },
  objects: [
    {
      weight: 1,
      index: "A",
      shape: [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
    },
    {
      weight: 2,
      index: "B",
      shape: [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
  ],
};

const postData2 = {
  container: {
    row: 2,
    column: 2,
    blocks: [[1, 1]],
  },
  objects: [
    {
      index: "A",
      weight: 1,
      shape: [
        [1, 0],
        [1, 0],
      ],
    },
    {
      index: "B",
      weight: 1,
      shape: [[1, 0]],
    },
    // {
    //   index: "C",
    //   weight: 1,
    //   shape: [
    //     [0, 1],
    //     [0, 1],
    //   ],
    // },
  ],
};

CalcPuzzle(postData2);
