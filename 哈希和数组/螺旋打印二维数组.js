/**
 * 把矩阵按螺旋方式打印出来
 * @param {*} nums
 * @returns
 */
function spiralPrint(nums) {
  const n = nums.length;
  const size = n * n;
  let i = 0;
  let left = 0,
    top = 0,
    right = n - 1,
    bottom = n - 1;

  const result = [];

  while (i < size) {
    // left -> right
    for (let x = top, y = left; y <= right; y++, i++) {
      //   result.push(nums[x][y]);
      result[i] = nums[x][y];
    }
    top++;

    // up -> down
    for (let x = top, y = right; x <= bottom; x++, i++) {
      //   result.push(nums[x][y]);
      result[i] = nums[x][y];
    }
    right--;

    // right -> left
    for (let x = bottom, y = right; y >= left; y--, i++) {
      //   result.push(nums[x][y]);
      result[i] = nums[x][y];
    }
    bottom--;

    // down -> up
    for (let x = bottom, y = left; x >= top; x--, i++) {
      //   result.push(nums[x][y]);
      result[i] = nums[x][y];
    }
    left++;
  }

  return result;
}

const nums = [
  [1, 2, 3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10, 9, 8, 7],
];

console.log(spiralPrint(nums));

/**
 * 生成螺旋矩阵
 * @param {*} n
 */
function generateSpiralMatrix(n) {
  const size = n * n;
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n);
  }
  let left = 0,
    top = 0,
    right = n - 1,
    bottom = n - 1;
  // 计数
  let count = 1;
  while (count <= size) {
    for (let x = top, y = left; y <= right; y++) {
      matrix[x][y] = count++;
    }
    top++;
    for (let x = top, y = right; x <= bottom; x++) {
      matrix[x][y] = count++;
    }
    right--;
    for (let x = bottom, y = right; y >= left; y--) {
      matrix[x][y] = count++;
    }
    bottom--;
    for (let x = bottom, y = left; x >= top; x--) {
      matrix[x][y] = count++;
    }
    left++;
  }

  return matrix;
}

console.log(generateSpiralMatrix(4));
