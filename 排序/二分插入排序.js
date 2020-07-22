 /**
  * 简单的插入排序是依次从左到右或从右到左比较，当后面的值较小时，需要判断的次数很多
  * 二分插入排序优化了这点，即使用二分查找找到插入点
  */
 const binaryInsertSort = function (arr, left = 0, right = arr.length) {
   const binarySearch = (arr, left, right, key) => {
     //这里得判断一下没进入循环的情况
     if (left >= right) {
       if (arr[left] >= key) {
         return left + 1;
       } else {
         return left;
       }
     }
     while (left < right) {
       let mid = left + ((right - left) >> 1);
       if (arr[mid] > key) {
         right = mid;
       } else {
         left = mid + 1;
       }
     }
     return left;

   }
   let size = arr.length;
   if (!size) {
     return;
   }
   for (let i = left + 1; i < right; i++) {
     let cur = arr[i];

     let pos = binarySearch(arr, left, i, cur);
     for (let j = i; j > pos; j--) {
       arr[j] = arr[j - 1]
     }
     arr[pos] = cur;
   }
 }
 let test = [12, 33, 6, 45, 233, 99, 45, 3, 33, 56, 45]
 binaryInsertSort(test)
 console.log(test);
