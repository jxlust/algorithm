/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let dif = target - nums[i];
        if (map.has(dif)) {
            return [map.get(dif), i]
        }
        map.set(nums[i], i);
    }
    return [-1, -1]
};

var twoSum2 = function (nums, target) {
    let hash = [],diff;
    for (let i = 0; i < nums.length; i++) {
        diff = target - nums[i];
        if (hash[diff] !== undefined) {
            return [hash[diff], i]
        }
        hash[nums[i]] = i;
    }
    throw new Error('没有两数子和等于目标值' + target);
};