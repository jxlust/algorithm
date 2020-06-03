/**
 * 排序数组查找元素第一个位置和最后一个位置
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    if (!nums.length) {
        return [-1, -1];
    }
    if (nums.length == 1) {
        if (nums[0] === target) {
            return [0, -1];
        } else {
            return [-1, -1];
        }
    }
    let left = 0;
    let right = nums.length - 1;
    while (left + 1 < right) {
        let mid = left + ((right - left) >> 1);
        if (nums[mid] >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    //left + 1 === right
    console.log(left, right);
    let indexArr = [-1, -1];
    if (nums[left] != target && nums[right] != target) {
        return indexArr;
    } else if (nums[left] == target && nums[right] == target) {
        while(right < nums.length && nums[right] == target){
            right++;
        }
        return [left,right]
    } else if (nums[left] == target) {
        return [left, -1];
    } else {
        return [right, -1];
    }


};
var nums = [5, 7, 7, 8, 8, 10];
console.log(searchRange(nums, 7));