/**
 * 计数排序不是基于比较的排序算法，其核心在于将输入的数据值转化为键存储在额外开辟的数组空间中。
 *  作为一种线性时间复杂度的排序计数排序要求输入的数据必须是有确定范围的整数。
时间复杂度 O(n+k)
算法描述
找出待排序的数组中最大和最小的元素；
统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。
 */

function countSort(arr) {
    // 需要知道两个最值
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i]
        }
    }

    let tempArray = new Array(max + 1);

    for (let i = 0; i < arr.length; i++) {
        let v = arr[i];
        if (tempArray[v]) {
            tempArray[v]++;
        } else {
            tempArray[v] = 1;
        }
    }
    let newArr = [];
    for (let i = 0; i <= max; i++) {
        if (tempArray[i]) {
            while (tempArray[i] > 0) {
                newArr.push(i);
                tempArray[i]--;
            }
        }
    }
    console.log('count sort:', newArr);
    return newArr;
}

// 优化，设置偏移值
function countSort2(arr) {
    let [max, min] = getMaxAndValue(arr);

    //这里优化了空间复杂度
    // let offset = min;
    let len = max - min + 1;
    let tempArray = new Array(len);

    for (let i = 0; i < arr.length; i++) {
        let v = arr[i];
        if (tempArray[v - min]) {
            tempArray[v - min]++;
        } else {
            tempArray[v - min] = 1;
        }
    }
    // let newArr = [];
    let newIndex = 0;
    for (let i = 0; i < len; i++) {
        if (tempArray[i]) {
            while (tempArray[i] > 0) {
                // arr.push(i + min);
                arr[newIndex++] = i + min;
                tempArray[i]--;
            }
        }
    }
    console.log('count sort2:', arr);
}

const array = [56, 22, 99, 83, 25, 56, 99, 2, 15, 45];
countSort2(array);

function getMaxValue(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i]
        }
    }
    return max;
}

function getMaxAndValue(arr) {
    let max = arr[0];
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
        if (min > arr[i]) {
            min = arr[i];
        }
    }
    return [max, min];
}