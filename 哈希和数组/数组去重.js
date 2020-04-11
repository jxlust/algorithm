/**
 * 返回去重后的数的个数
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    if (nums === null) {
        return 0;
    }
    nums.sort((a, b) => a - b);
    let i = 0;
    let j = 1;
    while (j < nums.length) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
        j++;
    }
    console.log(nums);
    return i + 1;
};
const arr1 = [1, 2, 2, 3, 3, 5, 4, 1, 2, 6]
console.log(removeDuplicates(arr1));
/**
 * 数组去重O(n) + 排序O(nlogn)
 * @param {number[]} nums
 * @return {number[]} 
 */
const removeDuplicates2 = function (nums) {
    if (nums && nums.length <= 1) {
        return nums;
    }
    nums.sort((a, b) => a - b);
    let result = [];
    // let i = 0;
    let j = 1;
    result.push(nums[0]);
    while (j < nums.length) {
        if (nums[j] != nums[j - 1]) {
            result.push(nums[j]);
        }
        j++;
    }
    return result;
}
const arr2 = [12, 2, 5, 2, 12, 4, 8, 3, 2];
console.log(removeDuplicates2(arr2));

const removeDuplicates3 = nums => {
    if (nums && nums.length <= 1) {
        return nums;
    }
    let obj = {};
    let result = [];
    // for (let i = 0; i < nums.length; i++) {
    //     // if(!(nums[i] in obj)){
    //     if (!obj[nums[i]]) {
    //         obj[nums[i]] = true;
    //         result.push(nums[i]);
    //     }
    // }
    for(let v of nums){
        if(!obj[v]){
            obj[v] = true;
            result.push(v);
        }
    }
    return result;
}

console.log(removeDuplicates3(arr2));