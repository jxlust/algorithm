/**
 * 给定一个整数数组，判断是否存在重复元素。
 * 如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let n = nums.length
  let set = new Set(nums)
  return n != set.size
}

// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。
var containsNearbyDuplicate = function (nums, k) {
  //不存在 false
  //存在且 |i-j| <= k ,其他false;
  let map = new Map()
  for (let i = 0, len = nums.length; i < len; i++) {
    let key = nums[i]
    if (map.has(key) && i - map.get(key) <= k) {
      return true
    } else {
      map.set(key, i)
    }
  }
  return false
}

// 给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。
// 如果存在则返回 true，不存在返回 false。

var containsNearbyAlmostDuplicate = function (nums, k, t) {
  //分桶
  // <=t, 对于 x 就划分了区间[x-t,x+t]
  //设定桶的大小为t+1，则在同一个桶里面的数据肯定满足，如果是相邻桶，判断一下差值，其他情况肯定不满足返回false
  //桶0,1,2,3,负数同理;  x = (t + 1) a + b (b = [0,t]) ,例如：桶a=0,区间=[0,1,2,3],桶a=-1,区间=[-4,-3,-2,-1];

  //所以对于数x, 属于哪个桶 x>=0, x / (t + 1); x < 0, (x + 1 / w) - 1;

  let map = new Map()
  let n = nums.length
  for (let i = 0; i < n; i++) {
    let num = nums[i]
    let bucket = getBucket(num, t + 1)
    for (let opt of [-1, 0, 1]) {
      //当前桶，邻居桶，统一判断就行
      let neighbor = bucket + opt
      if (map.has(neighbor)) {
        let pre = map.get(neighbor)
        if (Math.abs(nums[pre] - num) <= t && i - pre <= k) {
          return true
        }
      }
    }
    //否
    map.set(bucket, i)
  }
  return false

  /**
   * 第几个桶
   * @param {number} x 桶里元素
   * @param {number} v 桶的容量
   * @returns
   */
  function getBucket(x, v) {
    return x >= 0 ? (x / v) | 0 : (((x + 1) / v) | 0) - 1
  }
}



var containsNearbyAlmostDuplicate = function (nums, k, t) {
  let map = new Map()
  let n = nums.length
  for (let i = 0; i < n; i++) {
    let num = nums[i]
    let bucket = getBucket(num, t + 1)
    for (let opt of [-1, 0, 1]) {
      //当前桶，邻居桶
      let neighbor = bucket + opt
      if (map.has(neighbor) && Math.abs(map.get(neighbor) - num) <= t) {
				return true
      }
    }
    map.set(bucket, num)
		if(i >= k){
			map.delete(getBucket(nums[i - k],t+1))
		}
  }
  return false

  /**
   * 第几个桶
   * @param {number} x 桶里元素
   * @param {number} v 桶的容量
   * @returns
   */
  function getBucket(x, v) {
    return x >= 0 ? (x / v) | 0 : (((x + 1) / v) | 0) - 1
  }
}

/**
 * 找第一个不重复的值
 * @param {string} s
 */
function findFirstValue(s) {
  let map = new Map()
  //arr前面出现重复的移掉
  for (let v of s) {
    if (map.has(v)) {
      map.set(v, map.get(v) + 1)
    } else {
      map.set(v, 1)
    }
  }

  for (let [key, v] of map) {
    if (v === 1) return key
  }
  return ' '
}

// console.log(findFirstValue('aaabcdbde'));



/**
 * 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
 * 数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。
 * @param {number[]} nums
 * @return {number}
 */
 var findRepeatNumber = function(nums) {
  //索引表
  let i = 0;
  let n = nums.length;
  //nums[i]跟它的原始索引位置交换nums[nums[i]]
  while(i < n){
      if(nums[i] === i){
          //索引位置对应了
          i++;
          continue;
      }
      if(nums[i] === nums[nums[i]]){
          //出现重复数
          return nums[i];
      }
      //交换
      let temp = nums[i];
      nums[i] = nums[temp];
      nums[temp] = temp;
  }
  return -1;
};