/**
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

请找出其中最小的元素。

你可以假设数组中不存在重复元素。

输入: [4,5,6,7,0,1,2]
输出: 0
 */

const findMin = nums => {
    // if (!nums) {
    //     return -1;
    // }
    let left = 0,
        right = nums.length - 1;
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return nums[left];
}


const arr = [4, 5, 6, 7, 0, 1, 2];
console.log(findMin(arr));

// 如果存在允许有重复元素
// 我们将该数组可视化，下图中的 X 轴表示元素在数组中的下标，Y 轴表示元素的值。
const findMin2 = nums => {
    // if (!nums) {
    //     return -1;
    // }
    let left = 0,
        right = nums.length - 1;
    while (left < right) {
        const mid = left + ((right - left) >> 1);
        if (nums[mid] < nums[right]) {
            right = mid;
        } else if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            //等于
            right--;
        }
    }
    return nums[left];
}

//[2, 2, 2, 0, 1, 1]
// [3,3,1,3] 
const arr2 = [3, 3, 1, 3];
console.log('允许重复：', findMin2(arr2));