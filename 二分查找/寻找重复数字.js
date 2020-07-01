/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate2 = function (nums) {
  nums.sort((v1, v2) => v1 - v2);
  let i = 0;
  let j = 1;
  // 1 2 3 3 4
  while (i < nums.length) {
    if (nums[i] == nums[i + 1]) {
      return nums[i]
    }
    i = i + 1;
  }
};
var findDuplicate = function (nums) {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let mid = (left + right) >> 1;
    let count = 0;
    //抽屉原理，小于等于4的元素如果大于4个，则一定存在重复元素范围[1,4]
    for (let i = 0; i < n; i++) {
      if (nums[i] <= mid) {
        count++;
      }
    }
    if (mid < count) {
      //重复数一定存在左侧
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  // console.log(left,right);
  return left
};

var findDuplicateFloyd = function (nums) {
  let fast = nums[nums[0]],
    slow = nums[0];

  while (fast != slow) {
    slow = nums[slow];
    fast = nums[nums[fast]]
  }
  
  slow = 0;
  while(fast != slow){
    slow = nums[slow]
    fast = nums[fast]
  }
  return fast;
}

// 输入: [3,1,3,4,2]
// 输出: 3

let nums = [1, 2, 1, 3, 4]
console.log(findDuplicateFloyd(nums));
