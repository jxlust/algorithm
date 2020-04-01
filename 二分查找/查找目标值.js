/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * @param {*} nums 
 * @param {*} target 
 */
const search = function (nums, target) {

    let mid = nums.length >> 1;
    if (mid === 0) {
        return (nums[0] == target) ? 0 : -1;
    }
    while (mid != 0 && mid != nums.length-1) {
    
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            mid = mid - mid >> 1;
        } else {
            // (nums[mid] < target)
            mid = mid + mid >> 1;
        }
    }

    return -1;

};

const arr = [-1, 0, 3, 5, 9, 12];
console.log(search(arr, 9));