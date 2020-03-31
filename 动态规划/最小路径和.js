/**
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
说明：每次只能向下或者向右移动一步。
 * @param {*} grid 
 */
var minPathSum = function (grid) {
    let m = grid.length;
    // if (m <= 0) {
    //     return 0;
    // }
    let n = grid[0].length;
    // if (n <= 0) {
    //     return 0;
    // }

    // dp[i][j] = min(dp[i-1][j],dp[i][j-1]) + curr[i][j];
    let dp = new Array(m);
    for (let i = 0; i < m; i++) {
        dp[i] = new Array(n);
        // dp[i][0] = grid[i][0];
    }
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) {
                dp[i][j] = grid[0][0];
            } else if (i == 0) {
                dp[i][j] = dp[i][j - 1] + grid[i][j];
            } else if (j == 0) {
                dp[i][j] = dp[i - 1][j] + grid[i][j];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }
    }
    console.log(dp);
    return dp[m - 1][n - 1] ? dp[m - 1][n - 1] : 0;

};

/**
 * 优化改进版
 * dp[j] = Math.min(dp[j],dp[j-1]) + arr[i][j]
 * @param {*} grid 
 */
var minPathSum2 = function (grid) {
    // let m = grid.length;
    let n = grid[0].length;
    let dp = new Array(n);

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) {
                dp[j] = grid[0][0];
            } else if (i == 0) {
                dp[j] = dp[j - 1] + grid[i][j];
            } else if (j == 0) {
                dp[j] = dp[j] + grid[i][j];
            } else {
                dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
            }
        }
    }
    // console.log(dp);
    return dp[n - 1] ? dp[n - 1] : 0;
};

const arr = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
    // [2, 4, 1]
]
console.log('最小路径和：', minPathSum2(arr));