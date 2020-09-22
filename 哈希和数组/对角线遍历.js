/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function (matrix) {
  /**
   *  1  2  3
   *  4  5  6   => 指向右上开始 [1,2,4,7,5,3,6,8,10,11,9,12]
   *  7  8  9
   *  10 11 12 
   */
  /**
   * 
   */

  if (matrix.length === 0) return []
  let i = 0, //row
    j = 0; // col
  let M = matrix.length,
    N = matrix[0].length;
  // i-1,j+1  临界条件 i-1 >= 0 j+1 <  N
  // i+1,j-1  临界条件 i+1 <  M  j -1 >= 0
  let direction = -1; //一开始的方向是 上坡，然后下坡
  let res = [];
  // res.push(matrix[0][0])
  while (i != M - 1 || j != N - 1) {
    res.push(matrix[i][j])
    if (direction < 0) {
      if (i - 1 >= 0 && j + 1 < N) {
        i = i - 1;
        j = j + 1;
      } else if (i - 1 < 0 && j + 1 < N) {
        i = i;
        j = j + 1;
        direction = -direction;
      } else {
        i = i + 1;
        j = j;
        direction = -direction;
      }
    } else {
      if (i + 1 < M && j - 1 >= 0) {
        i = i + 1;
        j = j - 1;
      } else if (i + 1 < M && j - 1 < 0) {
        i = i + 1;
        j = j;
        direction = -direction;
      } else {
        i = i;
        j = j + 1;
        direction = -direction;
      }
    }
  }
  res.push(matrix[M - 1][N - 1])
  return res;

};
let test = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ],
  result = [1, 2, 4, 7, 5, 3, 6, 8, 9]
findDiagonalOrder(test)
