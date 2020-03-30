/**
 * 时间复杂度O(nlog2n) 空间复杂度O(1) 内部排序
 * 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：
 * 即子结点的键值或索引总是小于（或者大于）它的父节点。
算法描述
将初始待排序关键字序列(R1,R2….Rn)构建成大顶堆，此堆为初始的无序区；
将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,……Rn-1)和新的有序区(Rn),且满足R[1,2…n-1]<=R[n]；
由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,……Rn-1)调整为新堆，然后再次将R[1]与无序区最后一个元素交换，
得到新的无序区(R1,R2….Rn-2)和新的有序区(Rn-1,Rn)。不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。
 */


// const array = [99, 33, 57, 43, 99, 56, 99, 5, 33, 56];
const array = [56, 22, 99, 83, 25, 56, 99, 2, 15, 45];
/**
 *         56
 *     22      99
 *   83  25  56  99
 *  2  15 45
 * 
 */


var len; // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量
function buildMaxHeap(arr) { // 建立大顶堆
    len = arr.length;
    //这里的优化开头取值就是长度对比切(也就是最后一个值对应的父节点的位置 n/2)，这里是以i为父节点来进行规则判断
    for (var i = Math.floor(len / 2) - 1; i >= 0; i--) {
        heapify(arr, i);
    }
}

function heapify(arr, i) { // 堆调整
    var left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;

    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function heapSort(arr) {
    buildMaxHeap(arr);
    console.log(arr);
    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        //交换后，违反了大堆的规则
        //内部继续进行堆下沉，构建大堆
        len--;
        heapify(arr, 0);
    }

    return arr;
}
console.log(heapSort(array));



/**
 * 本函数为获取倒数第二行节点的第一个索引值
 * @param {*} len 
 */
function getStartIndex(len) {
    let line = Math.ceil(Math.log2(len)) - 1;
    Math.pow(2, line - 1) - 1;
}
