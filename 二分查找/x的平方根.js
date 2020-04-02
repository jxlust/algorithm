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