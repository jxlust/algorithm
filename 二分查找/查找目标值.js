/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * @param {*} nums 
 * @param {*} target 
 */
const search = function (nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        //考虑到可能发生的整型溢出，使用 left + (right - left)/2 取mid更安全一点
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;

};
const search2 = function (nums, target) {

    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        //考虑到可能发生的整型溢出，使用 left + (right - left)/2 取mid更安全一点
        let mid = (left + right) >> 1;
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    //left == right
    return nums[left] >= target ? left : left + 1;

};


const arr = [-1, 0, 3, 5, 9, 12];
console.log(search(arr, 9));