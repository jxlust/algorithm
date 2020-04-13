/**
 * 非递归的思想是至低向上，先两两合并，在四个四个...
 * @param {*} arr 
 */
const mergeSort = function (arr) {
    //注意这里不能使用箭头函数了，需要获取方法内部的this
    const merge = function (arr, left, mid, right) {
        let temp = [];
        let i = left;
        let j = mid + 1;
        let k = 0;
        while (i <= mid && j <= right) {
            if (arr[i] < arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }
        while (i <= mid) {
            temp[k++] = arr[i++];
        }
        while (j <= right) {
            temp[k++] = arr[j++]
        }
        //内部修改原数组
        for (let i = 0; i < k; i++) {
            arr[left++] = temp[i];
        }
    }
    let length = arr.length;
    for (let i = 1; i < length; i = 2 * i) {
        let left = 0;
        let mid = left + i - 1; //左边集合最后一个值
        let right = mid + i; //右边集合最大索引

        while (right < length) {
            merge(arr, left, mid, right);
            // left = left + 2 * i;
            left = right + 1;
            mid = left + i - 1;
            right = mid + i;
        }

        if (left < length && mid < length) {
            //长度小于了right
            merge(arr, left, mid, length - 1)
        }

    }
    return arr;
}



let array = [57, 43, 99, 56, 99, 5, 33, 56, 32];
console.log('排序后：', mergeSort(array))
// new mergeSort(array)
console.log(array);