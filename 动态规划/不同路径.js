/**
 * 问题：
 * n*m的格子，从左上角走到右下角路径问题
 * 
 */
/**
 * 思路一：排列组合的方式，从上到下都是走n-1步，从左到右都是走m-1步
 * 总的走的步数 n+m-2, 横向的步骤n-1
 * Cn+m-2(n-1)
 * 
 */
/** 思路二：动态规划解题步骤 
 * 1.分析。跟爬楼梯类似 走到最后一步，两种方式
 * *通过[n-1][m]
 * *通过[n][m-1]
 * 2.所以递推方程可以得出
 * dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * 3.设置初始化值
 * 4.编码
 */
function diffPathCount(n, m) {
    if (n == 0 || m == 0) {
        return 0;
    }
    let dp = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(m + 1);
    }
    dp[0][0] = 0;
    dp[1][1] = 1;
    console.log(dp);
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (i - 1 <= 0 && j - 1 <= 0) {
                dp[i][j] = 1;
            } else if (i - 1 <= 0) {
                dp[i][j] = dp[i][j - 1];
            } else if (j - 1 <= 0) {
                dp[i][j] = dp[i - 1][j];
            } else {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }

        }
    }
    return dp[n][m];
}

var result = diffPathCount(5, 4);
console.log('result:', result);


//优化1 dp[i][j] = d[i-1][j] + d[i][j-1]
function diffPathCount1(n, m) {
    if (n <= 0 || m <= 0) {
        return 0;
    }
    //数组第一个就存n或者m为1的值
    let dp = new Array(n);
    // 初始化
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(m);
        dp[i][0] = 1;
    }
    for (let j = 0; j < m; j++) {
        dp[0][j] = 1;
    }
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }
    return dp[n - 1][m - 1];
}
var result = diffPathCount1(5, 4);
console.log('result1:', result);

//优化2 空间优化理论上空间复杂度为O(n*m)都可以优化成O(min(n,m));

// dp[i][j] = d[i-1][j] + d[i][j-1]

function diffPathCount2(n, m) {
    if (n <= 0 || m <= 0) {
        return 0;
    }
    // let size = Math.min(n, m);
    let arr = new Array(m);
    let curr = new Array(m);
    arr.fill(1);
    curr.fill(1);
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
          curr[j] = arr[j] + curr[j-1];
        }
        arr = Array.from(curr);//curr.concat()
    }
    return curr[m-1];
}
function diffPathCount3(n, m) {
    if (n <= 0 || m <= 0) {
        return 0;
    }
    let curr = new Array(m);
    curr.fill(1);
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
          curr[j] = curr[j] + curr[j-1];
        }
    }
    return curr[m-1];
}
var result = diffPathCount3(5, 4);
console.log('result2:', result);