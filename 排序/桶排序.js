/**
 * 桶排序，分桶，桶内部排序，合并桶
 * @param {number[]} arr 
 * @param {number} bucketSize 
 */
const bucketSort = (arr, bucketSize = 5) => {
    //求最大最小值
    let maxV = arr[0],
        minV = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (maxV < arr[i]) {
            maxV = arr[i]
        }
        if (minV > arr[i]) {
            minV = arr[i]
        }
    }
    //分桶,默认每个桶存的数量5
    let size = parseInt((maxV - minV) / bucketSize) + 1; //桶的个数
    console.log('桶的个数：', size);
    let bucketArr = new Array(size);
    for (let i = 0; i < bucketArr.length; i++) {
        bucketArr[i] = [];
    }
    for (let i = 0; i < arr.length; i++) {
        let p = parseInt((arr[i] - minV) / bucketSize);
        bucketArr[p].push(arr[i]);
    }

    //每个桶内部排序
    arr.length = 0;
    for (let i = 0; i < bucketArr.length; i++) {
        if (bucketArr[i].length) {
            bucketArr[i].sort((a, b) => a - b);
            for (let j = 0; j < bucketArr[i].length; j++) {
                arr.push(bucketArr[i][j]);
            }
        }

    }
}
let array = [57, 43, 99, 56, 99, 5, 33, 56, 32];
bucketSort(array, 10);
console.log(array);