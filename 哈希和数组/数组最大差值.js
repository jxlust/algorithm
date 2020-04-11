const maxProfit = arr => {
    if (arr == null || arr.length <= 1) {
        return 0;
    }
    let maxValue = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            let diff = arr[i] - arr[j];
            if (diff > maxValue) {
                maxValue = diff;
            }
        }
    }
    return (maxValue > 0) ? maxValue : 0;

}
/**
 * 双指针实现，时间复杂度O(n)
 * @param {*} arr 
 */
const maxProfit2 = arr => {
    if (arr == null || arr.length <= 1) {
        return 0;
    }
    // let maxValue = 0;
    //双指针
    let p1 = 0;
    let p2 = 1;
    let maxValue = arr[p2] - arr[p1];
    while (p2 < arr.length) {
        if (arr[p2] < arr[p1]) {
            p1 = p2;
        } else {
            if (arr[p2] - arr[p1] > maxValue) {
                maxValue = arr[p2] - arr[p1];
            }
        }
        p2++;
    }
    return maxValue;
}



let arr1 = [2, 1, 5, 10, 16, 8];
let arr2 = [7, 6, 4, 3, 2];
let arr3 = [10, 10, 6, 5, 1];
console.log(maxProfit2(arr1));
console.log(maxProfit2(arr2));
console.log(maxProfit2(arr3));