/**
 * 归并排序是建立在归并操作上的一种有效的排序算法。
该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列；即先使每个子序列有序，再使子序列段间有序。若将两个有序表合并成一个有序表，称为2-路归并。 
归并排序是一种稳定的排序方法。和选择排序一样，归并排序的性能不受输入数据的影响，但表现比选择排序好的多，因为始终都是O(nlogn）的时间复杂度。代价是需要额外的内存空间。
算法描述
把长度为n的输入序列分成两个长度为n/2的子序列；
对这两个子序列分别采用归并排序；
将两个排序好的子序列合并成一个最终的排序序列。
*/

function mergeSort(arr) {
    let length = arr.length;
    if (length < 2) {
        return arr;
    }
    let midIndex = Math.floor(length / 2);
    // 0~midIndex-1  midIndex ~ (length-1)
    let left = arr.slice(0, midIndex);
    let right = arr.slice(midIndex);

    return merge(mergeSort(left), mergeSort(right));
}

//利用栈
function merge(left, right) {
    let arr = [];
    // console.log(left, right);
    while (left.length > 0 && right.length > 0) {
        if (right[0] < left[0]) {
            arr.push(right.shift());
        } else {
            arr.push(left.shift());
        }
    }
    while (left.length) {
        arr.push(left.shift());
    }
    while (right.length) {
        arr.push(right.shift());
    }
    // if (left.length) {
    //     arr = arr.concat(left);
    // }
    // if (right.length) {
    //     arr = arr.concat(right);
    // }
    return arr;

}


//非递归
/**
 * 非递归的改写，思路是置地向上的，也就是迭代法
 * @param {*} arr 
 */
function mergeSort2(arr) {
    let length = arr.length;
    if (length < 2) {
        return arr;
    }
    // let newArr = [];
    let temp = new Array(length);
    for (let i = 1; i < length; i = 2 * i) {
        // 切割i 先一个一个两两合并成一个，在两个两个...
        for (let s = 0; s < length; s = s + 2 * i) {
            // (0,1) (2,3) (4,5) (6)
            // [0, 2]
            // [2, 4]

            let left = arr.slice(s, s + i);
            let right = arr.slice(s + i, s + 2 * i);
            // console.log(999, i, s);
            // let mA = merge(left, right);
            mergeSelf(left, right, temp, s, i);
            // console.log(1, mA);
            // arr.splice(s, mA.length, ...mA);
        }

        arr = temp;
    }
    return arr;
}

function mergeSelf(left, right, temp, s, i) {
    console.log('i s:',i,s);
    let first = s * i;
    while (left.length > 0 && right.length > 0) {
        if (left[0] > right[0]) {
            temp[first++] = right.shift();
        } else {
            temp[first++] = left.shift();
        }
    }

    while (left.length) {
        temp[first++] = left.shift();
    }
    while (right.length) {
        temp[first++] = right.shift();
    }
    console.log(i, temp);
}

function mergeSort3(arr) {

}

let array = [57, 43, 99, 56, 99, 5, 33, 56, 32];
console.log('排序后：', mergeSort2(array))