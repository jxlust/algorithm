// 两种冒泡排序，向下冒泡，向上冒泡
function sort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                //交换位置
                let tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
        }
    }
    //重新生成一个新数组
    return [...arr];
}

function sort2(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                //交换位置
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    //重新生成一个新数组
    return [...arr];
}
let array = [2, 43, 99, 56, 99, 33, 56];
// let array = [];
for (let i = 8; i > 0; i--) {
    // array.push(i);
}
// console.log('sort1:', sort(array));
// console.log('sort2:', sort2(array));
console.log('sortOptimize:', sortOptimize(array));

//冒泡的改进
function sortOptimize(arr) {
    let length = arr.length;
    if (length < 2) {
        return arr;
    }
    let tmp = null;
    let flag = false;
    for (let i = 0; i < length; i++) {
        flag = true;
        for (let j = 0; j < length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                flag = false;
                //交换
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
        if (flag) break; // 一趟下来没有发生交换说明是有序的了

    }
    return arr;

}