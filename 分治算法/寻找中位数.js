/**
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
你可以假设 nums1 和 nums2 不会同时为空。

eg1:
nums1 = [1, 3]
nums2 = [2]
则中位数是 2.0
eg2:
nums1 = [1, 2]
nums2 = [3, 4]

则中位数是 (2 + 3)/2 = 2.5
中位数：如果某个有序数组长度是奇数，那么其中位数就是最中间那个，如果是偶数，那么就是最中间两个数字的平均值。
 * @param {*} nums1 
 * @param {*} nums2 
*/
// 本问题的难点是时间复杂度的限制O(log(n+m)),二分查找，分治


// 方法一：简单粗暴的两个数组进行合并，然后通过中位数定义计算，（两个有序数组也就是归并排序的一个合并过程）,时间复杂度O(n+m),空间复杂度O(n+m)
const findMidNum = function (nums1, nums2) {
    let len1 = nums1.length;
    let len2 = nums2.length;
    // 这里这种方式还要说明，排序是从小到大，如果大到小,倒过来
    let isMin = nums1[0] <= nums1[len1 - 1];
    let mArr = merge(nums1, nums2, isMin);
    console.log('marr:', mArr);

    let mid = Math.floor(mArr.length / 2);
    console.log(mid);
    if (mArr.length % 2 === 0) {
        //偶数
        return (mArr[mid - 1] + mArr[mid]) / 2;
    } else {
        //奇数
        return mArr[mid];
    }
}

function merge(arr1, arr2, isMin) {
    let arr = [];
    while (arr1.length > 0 && arr2.length > 0) {
        if (arr1[0] > arr2[0]) {
            if (isMin) {
                arr.push(arr2.shift())
            } else {
                arr.push(arr1.shift())
            }
        } else {
            if (isMin) {
                arr.push(arr1.shift())
            } else {
                arr.push(arr2.shift())
            }
        }
    }
    while (arr1.length) {
        arr.push(arr1.shift());
    }
    while (arr2.length) {
        arr.push(arr2.shift());
    }
    return arr;
}


const arr1 = [10, 9, 8];
const arr2 = [2, 1];
console.log('两个数组的中位数为：', findMidNum(arr1, arr2));



// 方法二，递归,时间复杂度O(log(n+m)),优化为尾递归后空间复杂度O(1),



// 方法三，二分查找，这个是最优的时间复杂度优化到了log(min(m,n)) 空间复杂度O(1)
