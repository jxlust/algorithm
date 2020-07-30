
var test = [3, 5, 4, 1, 0]
/**
 * 单调栈理解示例
 * 找到从左侧开始比当前元素小的第一个元素，输出
 * 1. 取元素i入栈
 * 2. 取栈顶元素和当前元素j对比，当前元素j大则跳到1,小则执行3
 * 3. 小则拿到了想要的结果，栈顶元素出栈 ,设置结果，记录indexof(栈顶元素) => 当前元素 （栈顶元素的第一个最小元素）
 * 4. 重复1
 * 5. 遍历完，结束
 * 时间复杂度分析，最大情况是都是累积到最后处理栈，运行次数： n-1 + n-1 = 2n-2 ,所以时间复杂度为O(n)
 * @param {*} test 数组 
 */
function monoStack(test) {
  let statck = [];
  let nextMin = new Array(test.length);
  nextMin.fill(-1);
  for (let i = 0; i < test.length; i++) {
    while (statck.length && test[statck[statck.length - 1]] > test[i]) {
      let index = statck.pop();
      nextMin[index] = test[i];
    }
    statck.push(i);
  }
  return nextMin
}
// console.log(monoStack(test));

// function maxPrice(nums) {
//   let i = 0;
//   let max = 0;
//   for (let j = 1; j < nums.length; j++) {
//     if (nums[j] > nums[i]) {
//       let diff = nums[j] - nums[i];
//       max = max > diff ? max : diff;
//     } else {
//       i = j;
//     }
//   }
//   return max;
// }
function maxPrice(nums) {
  let statck = [];
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    //维护单调递减栈
    while (statck.length && statck[statck.length - 1] < nums[i]) {
      let diff = nums[i] - statck.pop();
      max = max > diff ? max : diff;
    }
    statck.push(nums[i])
  }
  return max;
}
console.log(maxPrice([4, 3, 2, 1]));
console.log(maxPrice([2, 3, 1, 5]));
console.log(maxPrice([2, 2, 2, 2]));

/**
 * 每日温度
 * 
 * 根据气温输出，之后出现更高的气温，还要等待的天数，如果气温不再升高等待天数记0
 * 如：给定一个列表 temper = [73,74,75,71,69,72,76,73]
 * 输出 [1,1,4,2,1,1,0,0]
 * @param {*} nums 
 */
// const dailyTemperatures = function (nums) {
//   let n = nums.length;
//   let res = new Array(n);
//   res.fill(0);
//   for (let i = 0; i < n; i++) {
//     for (let j = i + 1; j < n; j++) {
//       if (nums[j] > nums[i]) {
//         res[i] = j - i;
//         break;
//       }
//     }
//   }
//   return res
// }
const dailyTemperatures = function (nums) {
  //单调栈解法
  let stack = [];
  let n = nums.length;
  let res = new Array(n);
  res.fill(0);
  for (let i = 0; i < n; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      let topI = stack.pop()
      res[topI] = i - topI;
    }
    stack.push(i)
  }
  return res;

}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
