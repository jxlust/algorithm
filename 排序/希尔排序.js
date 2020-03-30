// 1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。
// 它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。
// 4.1 算法描述
// 先将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，具体算法描述：

// 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
// 按增量序列个数k，对序列进行k 趟排序；
// 每趟排序，根据对应的增量ti，将待排序列分割成若干长度为m 的子序列，分别对各子表进行直接插入排序。
// 仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。

//测试
let array = [57, 43, 99, 56, 99, 5, 33, 56];
for (let i = 50; i > 0; i--) {
    array.push(i);
}
console.log(1, test(array));

// 4，length 
// 2,length 
// 1,length 
// 时间复杂度为O(n1.3)
function test(arr) {
    let length = arr.length;
    let current;
    //分组
    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        //得到的组进行排序
        for (let i = gap; i < length; i++) {
            current = arr[i];
            // let j = i;
            let preGapIndex = i - gap;
            while (preGapIndex >= 0 && arr[preGapIndex] > current) {
                arr[preGapIndex + gap] = arr[preGapIndex];
                preGapIndex -= gap;
            }
            arr[preGapIndex + gap] = current;
        }
    }
    return arr;
}


function shellSort(arr) {
    var len = arr.length;
    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        console.log(1111111);
        // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
        for (var i = gap; i < len; i++) {
            var j = i;
            var current = arr[i];
            while (j - gap >= 0 && current < arr[j - gap]) {
                arr[j] = arr[j - gap];
                j = j - gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}