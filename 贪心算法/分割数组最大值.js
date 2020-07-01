// 给定一个非负整数数组和一个整数 m，你需要将这个数组分成 m 个非空的连续子数组。设计一个算法使得这 m 个子数组各自和的最大值最小。

// 注意:
// 数组长度 n 满足以下条件:

// 1 ≤ n ≤ 1000
// 1 ≤ m ≤ min(50, n)
// 示例:

// 输入:
// nums = [7,2,5,10,8]
// m = 2

// 输出:
// 18

// 解释:
// 一共有四种方法将nums分割为2个子数组。
// 其中最好的方式是将其分为[7,2,5] 和 [10,8]，
// 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。

/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function(nums, m) {
    let left = 0,right = 0;
    for(let v of nums){
        left = v > left ? v: left;
        right += v;
    }
    while(left < right){
        let mid = (left + right) >>> 1;
        
        let count = 1;
        let subSum = 0;
        for(let v of nums){
            if(subSum + v > mid){
                count++;
                subSum = v;
             }else{
                subSum += v; 
             }
        }
        if(count <= m){
            right = mid;
        }else{
            left = mid + 1;
        }
    }
    return left
};

/**
 * 求分割数组的最大值中的最小值
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function (nums, m) {
  //1.数组所有组合的最大值范围是[max(nums),sum(nums)]
  //2.对于已知范围问题，可以采取二分查找
  //3.直接上二分法模板
//   let left = Math.max(...nums);
//   let right = nums.reduce(function (pre, cur) {
//     return pre + cur
//   })
  let left = 0,right = 0;
  for(let i of nums){
    left = left > i ? left : i;
    right += i;
  }
  
  while (left < right) {
    let mid = (left + right) >>> 1;
    //下面是高能代码：贪心算法思路
    //1.现在对数组凑满足和不小于mid的子数组的个数count
    //分割初始值为1
    let count = 1;
    let subSum = 0;
    for (let i = 0; i < nums.length; i++) {
      if (subSum + nums[i] > mid) {
        count++;
        subSum = nums[i]
      }else{
        subSum += nums[i]
      }
    }
    //常规二分逻辑判断
    //如果个数count比m大，说明mid偏小了
    if (count <= m) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left;
}
