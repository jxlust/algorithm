 /**
  * 最大（最小）堆,完全二叉树的数据结构
  * 父节点比所有子节点元素大（小），子节点构成的堆也要满足最大（小）堆
  * 
  */

 /**
  * 最大堆插入
  */
 const array = [56, 22, 99, 83, 25, 56, 99, 2, 15];
 // 构建最大堆


 //插入
 function insertHeap(arr, i) {

 }


 var countValue = 0;
 // buildMaxHeap(array);
 heapSort(array);

 /**
  * 构建最大堆，算法时间复杂度待优化 build只需要截取一半值
  * 优化后：
  * @param {*} arr 
  */
 function buildMaxHeap(arr, length) {
     for (let i = 0; i < length; i++) {
         let position = i;
         let parentIndex = getParentIndex(position);
         while (position > 0 && arr[parentIndex] < arr[position]) {
             //如果有父节点以及父节点值小于当前节点，交换swap();
             // swap(arr,parentIndex,position);
             let temp = arr[parentIndex];
             arr[parentIndex] = arr[position];
             arr[position] = temp;

             position = parentIndex;
             parentIndex = getParentIndex(position);
         }
         countValue++;
     }
     // console.log('形成的最大堆:', arr);
     // printDeepTree(arr);
     //然后进行堆排序
     // return arr;
 }

 /**
  * 打印树每行的数据
  * @param {*} arr 
  */
 function printDeepTree(arr) {
     let line = Math.ceil(Math.log2(arr.length + 1));
     for (let i = 0; i < line; i++) {
         let rang = Math.pow(2, i) - 1;
         let newArr = arr.slice(rang, 2 * rang + 1);
         console.log(getSpace(line - i) + newArr.join('  '));
         // for (j = rang; j < arr.length && j < 2 * rang + 1; j++) {
         //     // console.log(arr[j] + '  ');
         // }
         // console.log('\n');
     }
 }

 function getParentIndex(child) {
     //  return Math.floor((child + 1) / 2) - 1;
     return Math.floor((child - 1) / 2);
 }

 function swap(arr, i, j) {
     let temp = arr[i];
     arr[i] = arr[j];
     arr[j] = temp;
 }


 function getSpace(n) {
     var str = '';
     while (n > 0) {
         str += '  ';
         n--;
     }
     return str;
 }

 /**
  * 自己实现的堆排序，待优化 空间复杂度O(n) 时间复杂度
  * @param {*} arr 
  */
 function heapSort(arr) {
     var len = arr.length;
     buildMaxHeap(arr, len);
     console.log('countValue:', countValue);
     //  let newArr = new Array();
     for (let i = arr.length - 1; i >= 0; i--) {
         swap(arr, 0, i);
         len--;
         buildMaxHeap(arr, len);
         //  newArr.unshift(arr.pop());
         //  buildMaxHeap(arr);
     }
     console.log('countValue:', countValue);
     console.log('排序后：', arr);
 }
 