var helper = function (x, n) {
    // * n是偶数，fn(n/2) * x * x
    // * n是奇数，( fn(n-1/2) * x * x ) * x
    if (n === 0) {
        return 1;
    }
    let h = helper(x,parseInt(n/2));
    if (n % 2 === 0) {
        return h * h;
    } else {
        return h * h * x;
    }

}
var myPow = function (x, n) {
    // if (n === 0) {
    //     return 1;
    // }
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    return helper(x, n);
}

var myPow = function (x,n) {
    if(n === 0){
        return 1;
    }
    if(n === 1){
        return x;
    }
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let h = myPow(x, parseInt(n/2));
    if(n % 2 === 0){
        return h * h;
    }else{
        return h * h * x;
    }

}

console.log(myPow(2, 4));
console.log(myPow(2, 5));
console.log(myPow(2, -4));
/**
 * 快速幂算法
 * 其实是二分法变形
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    if (n === 0) {
        return 1;
    }
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let result = 1;
    let product = x;
    for (let i = n; i > 0; i = i >>> 1) {
        if (i % 2 === 1) {
            result = result * product;
        }
        product = product * product;
    }
    return result;
};