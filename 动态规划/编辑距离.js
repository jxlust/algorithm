// 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。

// 你可以对一个单词进行如下三种操作：

// 插入一个字符
// 删除一个字符
// 替换一个字符

// 输入：word1 = "horse", word2 = "ros"
// 输出：3
// 解释：
// horse -> rorse (将 'h' 替换为 'r')
// rorse -> rose (删除 'r')
// rose -> ros (删除 'e')

//要点
//1. 对于字符串的动态规划问题，定义两个指针i,j分别从末尾开始
//2. base case
//3. 分类讨论，三个操作，插入，删除，替换，求最小值

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  // horse  =>  ros
  //     i
  //   ros
  //     j
  //容易得出 s[i] === s[j] 不需要编辑，skip跳过 i--,j--, 等价于 求s[0,i-1] s[0,j-1]的编辑距离
  // 次数 = minDistance (s[0,i-1],s[0,j-1])
  //s[i] != s[j]
  //分类讨论，其实就是计算每种操作，然后取最小距离
  //插入： 次数 = minDistance(s[0,i],s[0,j-1]) + 1

  //删除： 次数 = minDistance(s[0,i-1],s[0,j]) + 1

  //替换： 次数 = minDistance(s[0,i-1],s[0,j-1]) + 1

  //综上 当s[i] != s[j]的时候 次数= Min(minDistance(s[0,i],s[0,j-1]) + 1,minDistance(s[0,i-1],s[0,j]) + 1, minDistance(s[0,i-1],s[0,j-1]) + 1)

  //结束条件： i === 0

  //上面是自顶向下的递归思路，实现代码如下
  const helper = function () {
    
  }

};
