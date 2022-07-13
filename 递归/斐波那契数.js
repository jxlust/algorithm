/**
 * @param {number} N
 * @return {number}
 */
var fib = function (n) {
    // f(0) = 0 f(1) = 1 f(x) = f(x-1) + f(x-2)
    //基本递归
    // if(n === 0){
    //     return 0
    // }
    // if(n === 1){
    //     return 1;
    // }
    // return fib(n-1) + fib(n-2)

    //动态规划
    // let dp = [0,1];
    // for(let i = 2; i <= n; i++){
    //     dp[i] = dp[i-1] + dp[i-2];
    // }
    // return dp[n];

    //动态规划优化空间复杂度O(1)
    if (n <= 0) {
        return 0;
    }
    let p1 = 0;
    let p2 = 1;
    let cur = 1;
    for (let i = 1; i <= n; i++) {
        cur = (p1 + p2) % 1000000007;
        p1 = p2;
        p2 = cur;
    }
    return cur;

};
