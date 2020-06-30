/** 时间复杂度是O(nlog2n)
 * 从小到大的排序
 * @param {*} arr 
 */
function quickSort(arr, left = 0, right = (arr.length - 1)) {
    if (left >= right) {
        return; //终止
    }
    let i = left;
    let j = right;
    let key = arr[i];
    while (j > i) {
        //找到比
        while (j > i && key <= arr[j]) {
            j--;
        }
        //找到第一个出现的比key小的数进行交换
        arr[i] = arr[j];
        while (j > i && arr[i] <= key) {
            i++;
        }
        arr[j] = arr[i];
    }
    arr[i] = key // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    quickSort(arr, left, i - 1) // 将左边的无序数组重复上面的操作
    quickSort(arr, i + 1, right)
}

function sort(arr) {
    let newArr = arr.concat();
    // let newArr = [...arr]
    quickSort(newArr);

    return newArr;
}
let array = [57, 43, 99, 56, 99, 33, 56];
// let array = [];
// for (let i = 100; i > 0; i--) {
//     array.push(i);
// }
console.log(1, sort(array));
console.log(2, array);

// function sort(arr) {
//     var newArr = arr.slice();
//     quickSort(newArr);
// }

const quickStackSort = function (arr) {
    const qSort = function (arr, i, j) {
        let key = arr[i];
        while (i < j) {
            while (i < j && arr[j] >= key) {
                j--;
            }
            arr[i] = arr[j];
            while (i < j && arr[i] <= key) {
                i++;
            }
            arr[j] = arr[i]
        }
        arr[i] = key;
        return i;
    }
    // 模拟栈调用
    let statck = [];
    let i = 0;
    let j = arr.length - 1;
    statck.push(i)
    statck.push(j);
    while (statck.length) {
        let r = statck.pop();
        let l = statck.pop();
        let tIndex = qSort(arr,l,r);
        console.log(tIndex);
        if(tIndex - 1 > l){
            statck.push(l);
            statck.push(tIndex - 1);
        }
        if(tIndex + 1 < r){
            statck.push(tIndex + 1);
            statck.push(r);
        }
    }
}
let arr2 = [57, 43, 99, 56, 99, 33, 56];
quickStackSort(arr2)
console.log('stack:',arr2);
