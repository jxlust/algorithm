/**
 * 峰值元素是指其值大于左右相邻值的元素。
给定一个输入数组 nums，其中 nums[i] ≠ nums[i+1]，找到峰值元素并返回其索引。
数组可能包含多个峰值，在这种情况下，返回任何一个峰值所在位置即可。
你可以假设 nums[-1] = nums[n] = -∞。
*/
// 示例：
// 输入: nums = [1,2,1,3,5,6,4]
// 输出: 1 或 5 
// 解释: 你的函数可以返回索引 1，其峰值元素为 2；
//      或者返回索引 5， 其峰值元素为 6。
const findPeakElement = function (nums) {
    if (nums == null || nums.length == 0) {
        return -1;
    }
    //通过访问元素右邻索引模板实现
    let left = 0;
    let right = nums.length - 1;
    //峰值 nums[0] > nums[-1],nums[n-1] > nums[n] 恒为真
    // nums[-1] = nums[nums.length] = -Number.MAX_SAFE_INTEGER;
    while (left < right) {
        let mid = parseInt(left + (right - left) / 2);
        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    //left == right
    return left;
};

const nums = [1, 2, 1, 3, 5, 6, 4]
console.log('峰值：', findPeakElement(nums));