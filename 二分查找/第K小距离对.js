/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestDistancePair = function (nums, k) {
  let n = nums.length;
  if (k < 1 || k > n * (n - 1) / 2) {
    throw new Error('k的取值范围应该在[1,n*(n-1)/2]')
  }
  nums.sort((v1, v2) => v1 - v2);
  // let maxDistance = nums[n-1] - nums[0];
  let right = nums[n - 1] - nums[0];
  let left = 0;
  //第K小的距离一定在[0,maxDistance],所以对此区间二分
  while (left < right) {
    let mid = (left + right) >>> 1;
    //求距离对在[0,mid]的个数
    let count = 0,j=0;
    for (let i = 0; i < n; i++) {
      while(nums[i]-nums[j] > mid){
        j++;
      }
      count += (i-j);
    }

    if(count >= k){
      right = mid;
    }else{
      left = mid + 1;
    }

  }
  return right;
};
let nums = [1, 2, 2, 11],
  k = 6;
console.log(smallestDistancePair(nums, k));
