/**
 * @param {string} s
 * @return {number}
 */
var longestPalindromeSubseq = function (s) {
    // zabbfa => abba 4
    // bbbab => bbbb 4

    //dp[i][j] 表示 s[i,j]的解

    //画出dp table易分析出状态转移方程
    //动态规划 找状态转移方程是难点，自己填一遍表格容易分析出来
    //dp[i][j] = s[i] === s[j] ? dp[i+1][j-1] + 2: Max(dp[i][j-1],dp[i+1][j])

    //base case i=j的时候就是1，也就是表格对角线都是1
    let n = s.length;
    let dp = new Array(n);
    for (let j = 0; j < n; j++) {
        dp[j] = new Array(n).fill(0);
        //base case
        dp[j][j] = 1;
    }
    //动态规划
    for (let j = 1; j < n; j++) {
        for (let i = j - 1; i >= 0; i--) {
            dp[j][i] = s[i] === s[j] ? dp[j - 1][i + 1] + 2 : Math.max(dp[j - 1][i], dp[j][i + 1])
        }
    }
    return dp[n - 1][0]
};
