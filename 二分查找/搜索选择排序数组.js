/**
 * 示例 1:
 *输入: nums = [4,5,6,7,0,1,2], target = 0 
 *输出: 4
 *示例 2:
 *输入: nums = [4,5,6,7,0,1,2], target = 3
 *输出: -1
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        let mid = left + ((right - left) >> 1);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] >= nums[left]) {
            //左边是有序的
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else{
            //右边是有序的
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }

        }
    }
    return -1;

};

// var nums = [4, 5, 6, 7, 0, 1, 2];
var nums = [3,1]
console.log(search(nums, 1));