/**不同的二叉搜索树的个数
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
    //思路：动态规划
    // 给定一个有序序列 1 ... n，为了根据序列构建一棵二叉搜索树。我们可以遍历每个数字 i，将该数字作为树根，1 ... (i-1) 序列将成为左子树，(i+1) ... n 序列将成为右子树。于是，我们可以递归地从子序列构建子树。
    // 在上述方法中，由于根各自不同，每棵二叉树都保证是独特的。
    // 可见，问题可以分解成规模较小的子问题。因此，我们可以存储并复用子问题的解，而不是递归的（也重复的）解决这些子问题，这就是动态规划法。
    //1. n=1只有一棵树,以此类推：dp[1] = 1,dp[2] = 2, dp[3] = 5,dp[4] = 1+2+5+4+2 = 14 ,...
    //2. 定义两个函数G(n)表示 n个节点二叉树的个数，F(i,n)表示以i为根（1 <= i <= n）的二叉树个数
    //3. 动态规划
    //3.1 G(n) = F(1,n) + F(2,n) + ... + F(n,n) = (i=1 -> n)∑F(i,n)
    //3.2 G(0) = 1,G(1) = 1 
    //3.3 F(i,n) = G(i-1) * G(n-i)
    //3.4 G(n) = G(0) * G(n-1) + G(1) * G(n-2) + ... + G(n-1) * G(0)
    // 复杂度分析
    // 空间复杂度 : 上述算法的空间复杂度主要是存储所有的中间结果，因此为 O(N)O(N)O(N)。
    // 时间复杂度 : 上述算法的主要计算开销在于包含 G[i] 的语句。因此，时间复杂度为这些语句的执行次数，也就是 ∑i=2ni=(2+n)(n−1)2\sum_{i=2}^{n} i = \frac{(2+n)(n-1)}{2}∑i=2n​i=2(2+n)(n−1)​。因此，时间复杂度为 O(N2)O(N^2)O(N2)。
    let dp = [1, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = 0;
        for (let j = 1; j <= i; j++) {
            dp[i] += dp[j - 1] * dp[i - j];
        }
    }
    return dp[n];

};
/**
 * 卡塔兰数
 *  Catalan(n) = C2n n - C2n (n+1)
 * @param {*} n 
 */
var numTrees2 = function (n) {
    // C0​=1,Cn+1​=2(2n+1)/(n+2)​Cn​
    // let dp = [1, 1];
    // for (let i = 2; i <= n; i++) {
    //     dp[i] = 2 * (2 * i -1) / (i + 1) * dp[i - 1];
    // }
    // return dp[n];
    let c = 1;
    for (let i = 1; i <= n; i++) {
        c = 2 * (2 * i - 1) / (i + 1) * c;
    }
    return c;

}
console.log(numTrees2(4));


// 输入: 3
// 输出:
// [
//   [1,null,3,2],
//   [3,2,null,1],
//   [3,1,null,null,2],
//   [2,1,3],
//   [1,null,2,null,3]
// ]
// 解释:
// 以上的输出对应以下 5 种不同结构的二叉搜索树：
//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {

};