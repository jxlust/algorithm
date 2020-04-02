const solution = (isBadVersion) => {
    //n = 7,版本：[1,2,3,4,5,6,7] 
    return function (n) {
        if (n == null || n == 0) {
            return -1;
        }
        let left = 1;
        let right = n + 1;
        while (left < right) {
            let mid = parseInt(left + (right - left) / 2);
            // let mid = (left + right) >>> 1;
            if (isBadVersion(mid)) {
                right = mid ;
            } else {
                left = mid + 1;
            }
        }
        //left == right
        if (left != (n + 1) && isBadVersion(left)) {
            return left;
        } else {
            return -1;
        }

    }
}

const isBadVersion = (n) => {
    // 模拟同步请求
    return n >= 1702766719;
}
// 2126753390
// 1702766719
console.log('错误版本：', solution(isBadVersion)(2126753390));

console.log();