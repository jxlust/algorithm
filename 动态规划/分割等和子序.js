/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    let sum = 0,
        maxV = 0;
    for (let v of nums) {
        sum += v;
        maxV = Math.max(maxV, v)
    }
    if (sum % 2 === 1) return false;
    let target = sum / 2;
    if (maxV > target) return false;

    //2 3 2 3
    // nums.sort((v1,v2) => v1-v2)
    var helper = function (path, index) {
        if (path === target) {
            return true;
        }
        if (path > target) {
            return false;
        }
        let ans = false;
        //选择列表
        for (let i = index; i < nums.length; i++) {
            //做选择
            path += nums[i];
            //dfs
            ans = helper(path, i + 1);
            if (ans) return true;
            //回退选择
            path -= nums[i];
        }
        return ans;
    }

    return helper(0, 0)
};
// console.log(canPartition([2,2, 5, 1]));


/**
 * 备忘录优化回溯dfs
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    let sum = 0,
        maxV = 0;
    for (let v of nums) {
        sum += v;
        maxV = Math.max(maxV, v)
    }
    if (sum % 2 === 1) return false;
    let target = sum / 2;
    if (maxV > target) return false;
    // nums.sort((v1,v2) => v1-v2)
    let map = new Map();
    var backTrack = function (path, index) {
        if (path === target) {
            return true;
        }
        if (path > target) {
            return false;
        }
        if (map.has(path)) {
            return map.get(path)
        }
        let ans = false;
        for (let i = index; i < nums.length; i++) {
            path += nums[i];
            ans = backTrack(path, i + 1);
            map.set(path, ans)
            if (ans) break;
            path -= nums[i];
        }
        return ans;
    }
    //做选择
    //dfs
    //回退选择
    return backTrack(0, 0)
};

/**
 * 备忘录优化dfs
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    let sum = 0,
        maxV = 0;
    for (let v of nums) {
        sum += v;
        maxV = Math.max(maxV, v)
    }
    if (sum % 2 === 1) return false;
    let target = sum / 2;
    if (maxV > target) return false;
    let map = new Map();
    var helper = function (s, index) {
        //base case:
        if (index >= nums.length || s > target) return false;
        if (s === target) return true;

        let key = `${s}-${index}`; //记忆化使用的key，标识出来就行
        if (map.has(key)) return map.get(key)

        //自顶向下思路递归，当前数可以选或者不选，都是一种情况
        let ret = helper(s + nums[index], index + 1) || helper(s, index + 1);
        map.set(key, ret)
        return ret;
    }
    return helper(0, 0)
};

/**
 * 备忘录优化dfs
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    let sum = 0,
        maxV = 0;
    for (let v of nums) {
        sum += v;
        maxV = Math.max(maxV, v)
    }
    if (sum % 2 === 1) return false;
    let target = sum / 2;
    if (maxV > target) return false;
    
};
// [14,9,8,4,3,2]
// [2, 2, 5, 1]
let test = [14, 9, 8, 4, 3, 2];
console.log(canPartition(test));