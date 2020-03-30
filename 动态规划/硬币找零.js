// 题目： 假设有几种硬币，如1、3、5，并且数量无限。请找出能够组成某个数目的找零所使用最少的硬币数。
/**
 * 1.问题拆解
 *对于数目i，它最少要用的硬币数就是算 i-1、i-3、i-5最少使用的硬币数；
 *以此递推，递推到数目是1、或者3、或者5使用的最少硬币数为1。
 * 
 * 2.找状态基
 * dp[i]跟dp[i-1]、dp[i-3]、dp[i-5]
 * 3.递推方程（推导方程）
 * dp[i] = Math.min(dp[i-1],dp[i-3],dp[i-5]) + 1;
 * 4.代码实现
 * 
 */
/**
 * 最少找零硬币数
 * @param {*} n 
 */
function minCoinNumber(n) {
    let dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    dp[3] = 1;
    dp[5] = 1;
    for (let i = 1; i <= n; i++) {
        if (i >= 5) {
            dp[i] = dp[i - 5] + 1;
        } else if (i >= 3) {
            dp[i] = dp[i - 3] + 1;
        } else if (i >= 1) {
            dp[i] = dp[i - 1] + 1;
        }
    }
    console.log('n:', dp[n]);
    return dp[n];
}
minCoinNumber(13);
/**
 * 最小找零数
 * @param {*} n 一个数目
 * @param {*} coins 零钱种类
 */
function minCoinNumber2(n,coins) {
    let dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    dp[3] = 1;
    dp[5] = 1;
    for (let i = 1; i <= n; i++) {
        if (i >= 5) {
            dp[i] = dp[i - 5] + 1;
        } else if (i >= 3) {
            dp[i] = dp[i - 3] + 1;
        } else if (i >= 1) {
            dp[i] = dp[i - 1] + 1;
        }
    }
    console.log('n:', dp[n]);
    return dp[n];
}