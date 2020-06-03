const mySqrt = function (x) {
    let left = 0;
    let right = x;
    while (left <= right) {
        // 防止溢出最大整数
        let mid = parseInt(left + (right - left) / 2);
        if (mid * mid === x) {
            return mid;
        } else if (mid * mid > x) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return right;
}
for (let i = 0; i < 100; i++) {
    console.log(i, mySqrt(i));
}


/**
 * 模板3解法
 * @param {number} x
 * @return {number}
 */
var mySqrt3 = function(x) {
    let left = 0;
    let right = x;
    if( x <= 1){
        return x;
    }
    while(left + 1 < right){
        let mid = left + ((right - left)>>1);
        if(mid * mid === x){
            return mid;
        }else if(mid * mid > x){
            right = mid;
        }else{
            left = mid;
        }
    }
    return left;
};