/**
 *
 * 日历拼图算法，定义一些blocks，有重量属性和形状属性，
 * 形状利用二维矩阵0和1表示；重量是整数；地图也是一个二维矩阵0和1表示；形状块可以旋转，翻转。
 * 输出所有最优解，满足填入的形状块重量之和最大。
 *
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
/**
 * 利用手动stack来处理
 * @param {*} postData
 */
function CalcPuzzle(postData) {
  // 初始化一些数据
  const { row, column, blocks } = postData.container;
  const objects = postData.objects;
  // 对与物体块，先计算一下他的4*2种状态（旋转和翻转），存储起来先
  for (let obj of objects) {
    obj.allShape = getAllTransform(obj.shape);
  }
  const nums = objects.length;
  // 结果集合
  const result = [];
  // 记录满足条件的地图集合唯一key, 防止出现重复的地图拼法
  const usedMapSet = new Set();

  let maxWeight = -1;
  const container = new Array(row);
  for (let i = 0; i < row; ++i) {
    container[i] = new Array(column).fill("");
  }
  // 地图初始化障碍物，填充Z
  for (let [r, c] of blocks) {
    container[r][c] = "Z";
  }

  const stack = [];
  // const

  console.log("最优解的个数:", result.length, ",max weight:", maxWeight);
}

const postData = {
  container: {
    row: 20,
    column: 20,
    blocks: [[1, 1]],
  },
  objects: [
    {
      index: "A",
      weight: 10,
      shape: [
        [1, 0],
        [1, 0],
      ],
    },
    {
      index: "B",
      weight: 1,
      shape: [[1, 1, 1, 1]],
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

CalcPuzzle(postData);
