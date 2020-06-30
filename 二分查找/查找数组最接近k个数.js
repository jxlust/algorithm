/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
    //1. x<=arr[0]
    //2. x >= arr[n-1]
    //3. other
    let n = arr.length;
    if (n === 0) {
        return [];
    }
    if (x <= arr[0]) {
        return arr.slice(0, k)
    } else if (x >= arr[n - 1]) {
        return arr.slice(n - k, n)
    } else {
        
    }
}