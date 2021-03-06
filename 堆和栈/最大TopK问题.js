// k >> 1 === k/2
/**
 * 问题描述：寻找最大的k个数,
 * 维护最大的K个数，使用最小堆，因为最小堆第一个数是除k之后的数最大的了，所以这个最小堆就是最大的k个数
 * 维护最小的K个数，使用最大堆
 * [12,3,4,5,123]
 */

const topK = (arr, k) => {
    var top = new Array(k);
    top = arr.slice(0, k);
    // heapMinify(top, 0, k);
    console.log(top);

    for (let i = k; i < arr.length; i++) {
        if (arr[i] > top[0]) {
            top.shift();
            top.push(arr[i]);
        }
    }
    const heapMinify = (arr, i, len) => {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let minIndex = i;

        if (left < len && arr[left] < arr[minIndex]) {
            minIndex = left;
        }
        if (right < len && arr[right] < arr[minIndex]) {
            minIndex = right;
        }

        if (minIndex != i) {
            swap(arr, i, minIndex);
            heapMinify(arr, minIndex, len);
        }
    }
}

const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
const array = [56, 22, 99, 83, 25, 56, 99, 2, 15, 45];
topK(array, 8)