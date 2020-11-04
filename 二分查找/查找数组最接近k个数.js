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
        let left = 0;
        let right = n ;
        while (left < right) {
            let mid = (left + right) >>> 1;
            if (arr[mid] - x >= 0) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        console.log(left);

        let i = left - 1;
        let j = left;
        let res = [];
        while(k > 0){
            if(i < 0){
                res.push(arr[j]);
                j++;
                k--;
                continue;
            }
            if(j >= n){
                res.unshift(arr[i]);
                i--;
                k--
                continue;
            }
            if(x - arr[i] <= arr[j] - x){
                res.unshift(arr[i]);
                i--;
            }else{
                res.push(arr[j]);
                j++;
            }
            k--;
        }
        return res;
        // console.log('i:',res);
    }
}
let test = [0,3,3,6,6],
    k = 4,
    x = 4;
findClosestElements(test,k,x)