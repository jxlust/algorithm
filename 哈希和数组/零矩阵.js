/**
 * 编写一种算法，若M × N矩阵中某个元素为0，则将其所在的行与列清零。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  /**
   * 1  2  3      1 0 3
   * 1  0  1  =>  0 0 0
   * 9  1  2      9 0 2
   */

  let setX = new Set(),
    setY = new Set();
  let N = matrix.length,
    M = matrix[0].length;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] === 0) {
        setX.add(i)
        setY.add(j)
      }
    }
  }
  for (let x of setX) {
    for (let i = 0; i < M; i++) {
      matrix[x][i] = 0;
    }
  }
  for (let y of setY) {
    for (let i = 0; i < N; i++) {
      matrix[i][y] = 0;
    }
  }
  console.log(matrix);
};
let test = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5]
];
setZeroes(test)





var setZeroes = function (matrix) {
  if (matrix.length === 0) return;
  let isFirstRowHaved = false,
    isFirstColHaved = false;
  let M = matrix.length,
    N = matrix[0].length;
  for (let i = 0; i < M; i++) {
    if (matrix[i][0] === 0) {
      isFirstColHaved = true;
      break;
    }
  }
  for (let i = 0; i < N; i++) {
    if (matrix[0][i] === 0) {
      isFirstRowHaved = true;
      break;
    }
  }

  for (let i = 1; i < M; i++) {
    for (let j = 1; j < N; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }
  for (let i = 1; i < M; i++) {
    for (let j = 1; j < N; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  //剩下的就是首列和首行之前存储了是否存在0
  if (isFirstRowHaved) {
    for (let i = 0; i < M; i++) {
      matrix[0][i] = 0;
    }
  }
  if (isFirstColHaved) {
    for (let i = 0; i < N; i++) {
      matrix[i][0] = 0;
    }
  }
}
