// eg1:
// nums1 = [1, 3]
// nums2 = [2]
// 则中位数是 2.0
// eg2:
// nums1 = [1, 2]
// nums2 = [3, 4]

// 则中位数是 (2 + 3)/2 = 2.5
// 中位数：如果某个有序数组长度是奇数，那么其中位数就是最中间那个，如果是偶数，那么就是最中间两个数字的平均值。

/**
 * 解法1 使用的是最小K个数的递归解法 时间复杂度O(log(n+m))
 * 
 * 思路，对于奇数偶数的统一，可以进行把数都变成奇数，奇数 + 偶数 = 奇数 对n+m进行(n+m+1)+(n+m+2)统一成奇数
 * @param {number[]} nums1 
 * @param {number[]} nums2 
 * @return {number}
 */
const findMid = (nums1, nums2) => {
    /**
     * 
     * @param {number} k 找的K个数
     * @param {number} s1 数组1开始索引
     * @param {number} e1 数组1结束索引
     * @param {number} s2 数组2开始索引
     * @param {number} e2 数组2结束索引
     */
    const getMinK = function (k, s1, e1, s2, e2) {
        if (e1 < s1) {
            return nums2[s2 + k - 1];
        }
        if (e2 < s2) {
            return nums1[s1 + k - 1];
        }
        if (k == 1) {
            return Math.min(nums1[s1], nums2[s2]);
        }
        let m = k >> 1;
        let i = Math.min(s1 + m - 1, nums1.length - 1);
        let j = Math.min(s2 + m - 1, nums2.length - 1);
        if (nums2[j] < nums1[i]) {
            k = k - (j - s2 + 1);
            return getMinK(k, s1, e1, j + 1, e2);
        } else {
            k = k - (i - s1 + 1);
            return getMinK(k, i + 1, e1, s2, e2);
        }
    }
    //中位数，其实就是这两个数的最小K个数，K值可以简单计算求得
    // n + (m - n + 1) / 2
    //如果n+m 是奇数k = ( n + m  + 2) / 2, k = ( n + m  + 1) / 2;（k/2）
    //如果n+m 是偶数 k = ( n + m + 2) / 2  和  k = ( n + m  + 1) / 2; (k/2)
    //可以分开判断求K值
    //也可以把奇数和偶数两种情况都合并
    let n = nums1.length;
    let m = nums2.length;
    let left = (n + m + 1) >>> 1;
    let right = (n + m + 2) >>> 1;
    if (left === right) {
        //奇数
        return getMinK(left, 0, n - 1, 0, m - 1);
    } else {
        return (getMinK(left, 0, n - 1, 0, m - 1) + getMinK(right, 0, n - 1, 0, m - 1)) * 0.5;
    }
    // console.log('xxx',left,right);

}

const arr1 = [8, 9, 10, 12, 15, 20];
const arr2 = [1, 2, 12];
// console.log('两个数组的中位数为：', findMid(arr1, arr2));

/**
 * 解法2 使用的是二分查找 最优法 时间复杂度O(log min(m,n))
 */
const findMid2 = (nums1, nums2) => {
    let m = nums1.length;
    let n = nums2.length;

    if (n < m) {
        //保证n >=m
        return findMid2(nums2, nums1);
    }
    //取长度小的m进行二分
    let left = 0;
    let right = m;
    let halfLen = (m + n + 1) >> 1;
    while (left <= right) {
        let mid = left + ((right - left) >> 1);
        //注意位运算的优先级低
        // let mid = parseInt((left + right) / 2);
        let j = halfLen - mid;
        if (mid < right && nums2[j - 1] > nums1[mid]) {
            //mid太小了
            left = mid + 1;
        } else if (mid > left && nums2[j] < nums1[mid - 1]) {
            //mid太大了
            right = mid - 1;
        } else {
            //mid ok
            //这里存在三种情况 mid >= right; mid <= left; nums2[j] === nums1[mid]
            let maxLeft = 0;
            if (j === 0) {
                // nums2[j]
                maxLeft = nums1[mid - 1];
            } else if (mid === 0) {
                maxLeft = nums2[j - 1];
            } else {
                maxLeft = Math.max(nums1[mid - 1], nums2[j - 1]);
            }

            if ((m + n) % 2 === 1) {
                //奇数直接返回value1
                return maxLeft;
            }

            //偶数
            let minRight = 0;
            if (mid === m) {
                minRight = nums2[j];
            } else if (j === n) {
                minRight = nums1[mid];
            } else {
                minRight = Math.min(nums1[mid], nums2[j]);
            }
            return (maxLeft + minRight) * 0.5;
        }

    }
    //left == right
    return 0;

}

let test1 = [1, 2, 3, 9];
let test2 = [3, 4, 5, 6];
console.log('两个数组的中位数为：', findMid2(test1, test2));