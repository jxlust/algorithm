/**
 * 动态规划
 * 求一个三角数组最小和
 * 如   [19]
 *    [9] [56]
 *  [59] [88] [12]
 * [18] [8] [22] [63]
 * 这里思维是倒过来，从下往上好推到方程
 * 递推方程： dp[i][j] = min(dp[i+1][j],dp[i+1][j+1]) + curr[i][j]
 * @param {*} arr 
 */
function triangleMin(arr) {
    let n = arr.length;
    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(n);
    }

    let lastArr = arr[n - 1];
    for (let j = 0; j < n; j++) {
        dp[n - 1][j] = lastArr[j];
    }

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + arr[i][j];
        }
    }

    return dp[0][0];
}

/**
 * 获取的是路径
 * @param {*} arr 
 */
function triangleMinPath(arr) {
    let n = arr.length;
    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(n);
    }
    let path = new Array(n);
    path[0] = 0;
    let lastArr = arr[n - 1];
    for (let j = 0; j < n; j++) {
        dp[n - 1][j] = lastArr[j];
    }
    var ndp =  dp[n-1].filter(v => v);
    
    var minV = Math.min(...ndp);
    
    path[n-1] = dp[n-1].indexOf(minV);

    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + arr[i][j];
        }
        var ndp =  dp[i].filter(v => v);
        var minV = Math.min(...ndp);        
        path[i] = dp[i].indexOf(minV);
        // path[i + 1] = getIndex(i + 1, j, dp);
    }
    console.log('path', path);
    return path;
}
/**
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 */
function getIndex(i, j, dp) {
    if (dp[i][j] > dp[i][j + 1]) {
        return j + 1;
    } else {
        return j;
    }
}
const arr = [
    [2],
    [3, 4],
    [6, 5, 7],
    [4, 3, 2, 3]
];
let min = triangleMin(arr);
console.log('min', min);

let minPath = triangleMinPath(arr);
console.log('minPath', minPath);