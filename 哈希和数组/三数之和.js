// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
// 满足要求的三元组集合为：
// [
//  [-1, 0, 1],
//  [-1, -1, 2]
// ]

/**
 * 三数之和为0的三元组 数组加双指针思路
 * @param {Number[]} nums 
 */
const threeSum = nums => {
    let result = [];
    if (nums == null || nums.length < 3) {
        return result;
    }
    //先排序
    // nums.sort(function (v1, v2) {
    //     // 实际表现如果这样比较是更加耗时的。。。
    //     if (v1 > v2) {
    //         return 1;
    //     } else {
    //         return -1;
    //     }
    // });
    nums.sort((v1, v2) => v1 - v2);
    let left,right;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            //跟前面元素重复跳过
            continue;
        }
        if (nums[i] > 0) {
            // break;
            return result;
        } else {
            left = i + 1;
            right = nums.length - 1;
            while (left < right) {
                if ((nums[i] + nums[left] + nums[right]) === 0) {
                    result.push([nums[i], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    left++;
                    right--;
                } else if ((nums[i] + nums[left] + nums[right]) > 0) {
                    // right 左移
                    right--;
                } else {
                    // left 右移
                    left++;
                }
            }

        }
    }
    return result;
    // throw new Error('没有满足要求的三个数');

}
var nums = [-1, 0, 1, 2, -1, -4];
// var nums = [0,-1,0,1,0];

console.log(threeSum(nums));