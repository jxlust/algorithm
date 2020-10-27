// 给定两个字符串 text1 和 text2，返回这两个字符串的最长公共子序列的长度。
// 一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
// 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。两个字符串的「公共子序列」是这两个字符串所共同拥有的子序列。
// 若这两个字符串没有公共子序列，则返回 0。
/**
 * 
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = function (text1, text2) {
  // 做过编辑距离，这题就很简单了
  //1.定义dp, dp[i][j] 表示text1[0,i] 和 text2[0,j]两个字符串的最长公共子序列长度
  //2.画表格 dp table
  //3.base case dp[0][0] = 0,dp[i][0] = 0 易知道
  //4.状态转移方程 dp[i][j] = text1[i] === text2[j] ? pre + 1: Max(dp[i-1][j],dp[i][j-1])
  //5.这里的pre就是 dp[i-1][j-1];
  //6.编码 
  let m = text1.length,
    n = text2.length;
  let dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) {
    dp[j] = new Array(m + 1)
    dp[j][0] = 0;
  }
  //base case 初始化了等于 0

  for (let i = 1; i <= m; i++) {
    dp[0][i] = 0;
    for (let j = 1; j <= n; j++) {
      dp[j][i] = text2[j - 1] === text1[i - 1] ? dp[j - 1][i - 1] + 1 : Math.max(dp[j - 1][i], dp[j][i - 1]);
    }
  }
  return dp[n][m]
};

console.log(longestCommonSubsequence('abcde', 'bdfge'));


/**
 * 
 * @param {string} text1
 * @param {string} text2
 * @return {string} 最长公共子序列字符串
 */
const longestCommonSubsequenceString = function (text1, text2) {
  let m = text1.length,
    n = text2.length;
  let dp = new Array(n + 1);
  for (let j = 0; j <= n; j++) {
    dp[j] = new Array(m + 1)
    dp[j][0] = 0;
  }
  //base case 初始化了等于 0
  let str = [];
  for (let i = 1; i <= m; i++) {
    dp[0][i] = 0;
    for (let j = 1; j <= n; j++) {
      dp[j][i] = text2[j - 1] === text1[i - 1] ? (str[dp[j-1][i-1]] = text1[i-1], dp[j - 1][i - 1] + 1): Math.max(dp[j - 1][i], dp[j][i - 1]);
    }
  }
  console.log(dp[n][m]);
  return str.join('');
};
 
console.log(longestCommonSubsequenceString('abbcde', 'bbdbge'));//bbde
