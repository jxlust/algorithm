function exchangeSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                //交换
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return;
    }
    let i = left;
    let j = right;
    let key = arr[i];

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
    //此时i=j
    arr[i] = key;
    //然后分别再左右内部排序
    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right);
}
// let array = [57, 43, 99, 56, 99, 33, 56];
// quickSort(array);
// console.log(1,array);

