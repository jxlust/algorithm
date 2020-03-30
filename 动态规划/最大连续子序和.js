/**
 * 连续最大子序列和
 * [-2,3,4,-5,6,-3,6,2]
 * 递推方程：
 * dp[i] = Max(dp[i-1]+array[i],array[i]);
 * 化简为：
 * dp[i] = Max(dp[i-1],0) + array[i];
 */
function maxSubArray1(array) {
    let dp = new Array(array.length);
    dp[0] = array[0];
    for (let i = 1; i < array.length; i++) {
        if (dp[i - 1] > 0) {
            dp[i] = dp[i - 1] + array[i];
        } else {
            dp[i] = array[i];
        }
    }
    let max = Math.max(...dp);
    console.log('dp:', dp);
    console.log('max', max);
    return max;
}
const array = [-2, 3, 4, -5, 6, -3, 6, -2];
maxSubArray1(array);

//优化代码
function maxSubArray2(array) {
    if (!array || array.length === 0) {
        return 0;
    }
    let n = array.length;
    let dp = new Array(n);
    dp[0] = array[0];
    let result = dp[0];
    for (let i = 1; i < array.length; i++) {
        dp[i] = Math.max(dp[i - 1], 0) + array[i];
        result = Math.max(result, dp[i]);
    }
    return result;
}
console.log('优化后：', maxSubArray2(array));

//简化代码
function maxSubArray3(array) {
    if (!array || array.length === 0) {
        return 0;
    }
    let n = array.length;
    let dp = array[0];
    let result = dp;
    for (let i = 1; i < n; i++) {
        dp = Math.max(dp, 0) + array[i];
        result = Math.max(result, dp);
    }
    return result;
}
console.log('3:', maxSubArray3(array));