/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  //[2,3,5,2,6]
  //[2,3,5,2,3]
  //[2,3,3,5,2]
  //dp[i][j] i-j的最大利润
  //i,j
  // [7,1,5,3,6,4]

  //双指针
  let i = 0,
    j = 1;
  let max = 0;
  while (j < prices.length) {
    if (prices[i] > prices[j]) {
      i = j;
    } else if (prices[j] - prices[i] > max) {
      max = prices[j] - prices[i]
    }
    j++;

  }
  return max;
};

// 貮：注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
/**
 * 多次买卖最大利润
 * @param {number[]} prices
 * @return {number}
 */
var maxProfitInfinity = function (prices) {
  let i = 0,
    j = 1;
  let max = 0;
  while (j < prices.length) {
    if (prices[j] - prices[i] > 0) {
      max += (prices[j] - prices[i])
    }
    i = j;
    j++;
  }
  return max;

};

//泛式：
// 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  //1.定义状态和选择：
  //状态 第n天 最多k笔交易 状态s（持有or不持有）
  //dp[n][k][s]，选择是卖出、买入、不操作
  //持有 -> 不持有 sell卖出
  //不持有 -> 持有 buy买入

  //理解一笔交易是指进行了一次买入卖出，算一笔
  //** 应当把买入的时候就看做是一笔交易，卖出不计算

  //2.状态转移方程：
  //当前状态是持有s=1, dp[n][k][1] = Max(dp[n-1][k-1][0] - prices[n],dp[n-1][k][1]);
  //当前状态是不持有s=0,dp[n][k][0] = Max(dp[n-1][k][1] + prices[n],dp[n-1][k][0]);

  //3.base case,基本数据初始化
  // dp[-1][k][0] = 0;
  // dp[-1][k][1] = Number.MIN_SAFE_INTEGER

  // dp[n][0][0] = 0; dp[n][0][1] = Number.MIN_SAFE_INTEGER;

  //4.编码-模板 
  // for(...状态1集合){
  //   for(...状态2集合){
  //     for(...状态3集合){
  //       ...
  //       dp[状态1][状态2][状态3] = 择优（选择1，选择2，...）
  //     }
  //   }
  // }

  //5.最终结果就是dp[n][k][0],不持有的肯定是不小于持有的收益的（dp[n][k][0] >= dp[n][k][1]）


  if (k < 1 || prices.length < 1) {
    return 0;
  }
  let n = prices.length - 1;
  //创建dp
  let dp = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(k + 1);
    for (let j = 0; j <= k; j++) {
      if (j === 0) {
        dp[i][j] = [0, Number.MIN_SAFE_INTEGER];
      } else {
        dp[i][j] = [0, 0];
      }
    }
  }
  for (let i = 0; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      //[0,1]状态遍历
      if (i > 0) {
        dp[i][j][0] = Math.max(dp[i - 1][j][1] + prices[i], dp[i - 1][j][0]);
        dp[i][j][1] = Math.max(dp[i - 1][j - 1][0] - prices[i], dp[i - 1][j][1]);
      } else {
        dp[i][j][0] = 0;
        dp[i][j][1] = -prices[i];
      }

    }
  }

  return dp[n][k][0];
};
console.log(maxProfit(2, [3, 2, 6, 5, 0, 3]));



/**
 * 最终优化版
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
  if (k > (prices.length >> 1)) {
    //相当于选择无限笔操作，跟k无关
    return maxProfitInfinity(prices);
  }

  let n = prices.length - 1;
  //创建dp
  let dp = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    dp[i] = new Array(k + 1);
    for (let j = 0; j <= k; j++) {
      if (j === 0) {
        dp[i][j] = [0, Number.MIN_SAFE_INTEGER];
      } else {
        dp[i][j] = [0, 0];
      }
    }
  }
  for (let i = 0; i <= n; i++) {
    for (let j = 1; j <= k; j++) {
      //[0,1]状态遍历
      if (i > 0) {
        dp[i][j][0] = Math.max(dp[i - 1][j][1] + prices[i], dp[i - 1][j][0]);
        dp[i][j][1] = Math.max(dp[i - 1][j - 1][0] - prices[i], dp[i - 1][j][1]);
      } else {
        dp[i][j][0] = 0;
        dp[i][j][1] = -prices[i];
      }
    }
  }

  return dp[n][k][0];
};
