/**
 * 取得最小K个数
 * @param {*} arr 
 * @param {*} k 
 */
const topK = (arr, k) => {
    const maxHeapIfy = (arr, i, len) => {
        let left = (i << 1) + 1;
        let right = (i << 1) + 2;
        let maxIndex = i;
        if (left < len && arr[left] > arr[maxIndex]) {
            maxIndex = left;
        }
        if (right < len && arr[right] > arr[maxIndex]) {
            maxIndex = right;
        }
        if (i != maxIndex) {
            //需要交换 继续调整堆
            swap(arr, i, maxIndex);
            maxHeapIfy(arr, maxIndex, len);
        }
    }

    const keepHeap = (arr, k) => {
        for (let i = arr.length >> 1; i >= 0; i--) {
            maxHeapIfy(arr, i, k);
        }
    }

    let top = arr.slice(0, k);
    keepHeap(top, k);
    for (let i = k; i < arr.length; i++) {
        if (arr[i] < top[0]) {
            top[0] = arr[i];
            keepHeap(top, k);
        }
    }
    return top;
}
/**
 * 交换位置
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 */
const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const array = [56, 22, 99, 83, 25, 56, 99, 2, 15, 45];

// console.log(topK(array, 4));


// 快排
const quickTopK = (arr, k) => {

    const quickSort = function (arr, left, right) {
        if (left >= right) {
            return;
        }
        let i = left;
        let j = right;
        let key = arr[left];
        while (i < j) {
            while (i < j && arr[j] >= key) {
                j--;
            }
            arr[i] = arr[j];
            while (i < j && arr[i] <= key) {
                i++;
            }
            arr[j] = arr[i];
        }
        arr[i] = key;
        if (i === k - 1) {
            // 这种情况是刚刚好左边排好最小k个
            return;
        } else if (k - 1 < i) {
            quickSort(arr, left, i - 1);
        } else {
            // (k - 1 > i)
            quickSort(arr, i + 1, right);
        }

    }
    quickSort(arr, 0, arr.length - 1);
    return arr.slice(0, k);
}

console.log(quickTopK(array, 8));