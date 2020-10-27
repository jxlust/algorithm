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

//状态压缩，进阶，难点，但是也可以通过画的图标分析出一位数组的计算过程
var longestPalindromeSubseq = function (s) {
  let n = s.length;
  let dp = new Array(n).fill(0);
  let last = 0;
  dp[0] = 1;
  //动态规划
  for (let j = 1; j < n; j++) {
    last = 0;
    dp[j] = 1;
    for (let i = j - 1; i >= 0; i--) {
      let temp = dp[i];
      dp[i] = s[i] === s[j] ? last + 2 : Math.max(dp[i + 1], dp[i])
      last = temp;
    }
  }
  // console.log(dp);
  return dp[0]
};

//状态压缩另一个方向上的
var longestPalindromeSubseq = function (s) {
  let n = s.length;
  let dp = new Array(n).fill(0);
  let last = 0;
  dp[0] = 1;
  //动态规划
  for (let j = 1; j < n; j++) {
    last = 0;
    dp[j] = 1;
    for (let i = j - 1; i >= 0; i--) {
      let temp = dp[j-1];
      dp[j] = s[i] === s[j] ? last + 2 : Math.max(dp[j - 1], dp[j])
      last = temp;
    }
  }
  // console.log(dp); //[ 1, 1, 1, 2, 2, 4 ]
  return dp[n-1]
};
