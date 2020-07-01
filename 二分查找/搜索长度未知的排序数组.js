const findTarget = function (nums, target) {
  let left = 0;
  let right = 1;
  while (nums[right] < target) {
    left = right;
    right = (right << 1);
  }
  while(left <= right){
    let mid = left + ((right - left)>>1);
    if(nums[mid] === target){
      return mid;
    }else if(nums[mid] > target){
      right = mid - 1;
    }else{
      left = mid + 1;
    }
  }
  return -1
}
let nums = [];
for (let i = 0; i <= 9999; i++) {
  nums.push(i+8)
}
// console.log(nums);
console.log(findTarget(nums, 876));
