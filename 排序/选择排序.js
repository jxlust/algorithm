const mySort = arr => {
    let newArr = [...arr];
    selectionSort(newArr);
    return newArr;
}
const selectionSort = arr => {
    let length = arr.length;
    let temp, minIndex;
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < length ; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        //这里采用交换
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;

    }
}
let array = [57, 43, 99, 56, 99, 5, 33, 56];
console.log(1, mySort(array));