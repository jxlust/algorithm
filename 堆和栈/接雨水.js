/**
 * 分析易得当前装水量跟 左右两侧最大值有关系
 * @param {number[]} nums 
 */
var trap = function (nums) {
  if (nums.length < 2) {
    return 0;
  }
  let lMax = new Array(nums.length),
    rMax = new Array(nums.length);
  lMax[0] = nums[0];
  rMax[nums.length - 1] = nums[nums.length - 1]
  for (let i = 1; i < nums.length; i++) {
    lMax[i] = Math.max(lMax[i - 1], nums[i])
  }
  for (let i = nums.length - 2; i >= 0; i--) {
    rMax[i] = Math.max(nums[i], rMax[i + 1]);
  }
  //备忘录记录了各个数左侧的最大值即leftMax[0,i]和右侧最大值rightMax[i,length-1]
  //当前点装水量 =  min(leftMax,rightMax) - curHeight
  let ret = 0;
  for (let i = 0; i < nums.length; i++) {
    ret += Math.min(lMax[i], rMax[i]) - nums[i]
  }
  return ret;

}

/**
 *  接雨水
 * 
 * 给定n个非负整数表示宽度为1的高度图，计算下雨后堆积的雨水
 * 示例：[0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出 6
 * @param {*} nums 
 */

const trap = function (nums) {
  let result = 0;
  //双指针优化了空间复杂度O(1)

  // 通过上面的计算，确定left和right的值之后，在left和right之间相当于构成了一个桶，桶的高度是最矮的那根柱子。
  // 然后我们从两边往中间逐个查找，如果查找的柱子高度小于桶的高度，那么盛水量就是桶的高度减去我们查找的柱子高度，如果查找的柱子大于桶的高度，我们要更新桶的高度。我们来看下最终代码

  //如果从左边开始，高度是递增的是装不了水的，同理右边也是一样
  let left = 0;
  let right = nums.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  while (left < right) {

    // let height = nums[left] > nums[right] ? nums[right] : nums[left];
    leftMax = Math.max(nums[left], leftMax);
    rightMax = Math.max(nums[right], rightMax);

    if (leftMax < rightMax) {
      //桶的高度leftmax
      result += leftMax - nums[left++]
    } else {
      result += rightMax - nums[right--]
    }

  }
  return result;

}
const trapPerfect = function (height) {
  let result = 0;
  let left = 0;
  let right = height.length - 1;
  let bucketHeight = 0;
  while (left < right) {
    let minH = Math.min(height[left], height[right]);
    bucketHeight = bucketHeight > minH ? bucketHeight : minH
    // result += height[left] < height[right] ?  bucketHeight - height[left++]: bucketHeight = height[right--];
    if (height[left] < height[right]) {
      result += bucketHeight - height[left++];
    } else {
      result += bucketHeight - height[right--];
    }
  }
  return result;
}
console.log(trapPerfect([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1, 2]));

const trapStack = function (nums) {
  let statck = [];
  //低点左右有高点才能接住雨水
  //分析后，得出低曹左右方向比该值大的最小值，可以理解为最低点为n高度的该曹可以装的水 V(n) = distance * (Min(left,right) - n),
  let result = 0;

  for (let i = 0; i < nums.length; i++) {
    while (statck.length && nums[statck[statck.length - 1]] < nums[i]) {
      //维护单调递减栈
      let midIndex = statck.pop();
      if (!statck.length) {
        break;
      }
      let leftIndex = statck[statck.length - 1];
      // i是最右侧墙索引
      let min = nums[leftIndex] > nums[i] ? nums[i] : nums[leftIndex];
      let distance = i - leftIndex - 1;
      result += ((min - nums[midIndex]) * distance)
    }
    statck.push(i)

  }
  return result;

}
// console.log(trapStack([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1, 2]));
