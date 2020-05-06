var generate = function (numRows) {
    // f(i,j) = f(i-1,j-1) + f(i-1,j)
    // j=0 || i=j  => f(i,j) = 1
    let arr = new Array(numRows);
    // for (let i = 0; i < numRows; i++) {
    //     arr[i] = new Array(i + 1);
    //     // arr[i] = [];
    //     arr[i][0] = 1;
    //     arr[i][i] = 1;
    // }
    arr[0] = [1];
    for (let i = 1; i < numRows; i++) {
        arr[i] = new Array(i + 1);
        arr[i][0] = 1;
        for (let j = 1; j < arr[i].length; j++) {
            if (i === j) {
                arr[i][j] = 1;
            } else {
                arr[i][j] = arr[i - 1][j - 1] + arr[i - 1][j];
            }
        }
    }
    console.log(arr);
    return arr;

};
generate(5)




/**
 * 杨辉三角2
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRowx = function (rowIndex) {
    let arr = [1];
    for (let i = 1; i <= rowIndex; i++) {
        let newArr = [];
        for (let j = 0; j <= i; j++) {
            let left = j - 1 < 0 ? 0 : arr[j - 1];
            let right = j >= i ? 0 : arr[j];
            newArr[j] = left + right;
        }
        arr = newArr;
        // arr[]
    }
    return arr;
};

var getRow = function (rowIndex) {
    let arr = [1];
    for (let i = 1; i <= rowIndex; i++) {
        //倒着进行就不会覆盖掉
        for (let j = i - 1; j > 0; j--) {
            arr[j] = arr[j - 1] + arr[j];
        }
        arr.push(1);
    }
    return arr;
};
console.log(getRow(3));
// var fill0 = function (rowIndex) {
//     const res = new Array(rowIndex + 1).fill(0);
//     // 每一行的最后一个数是1，从倒数第二个元素开始，它等于上一行在这个 位置的元素  + 上一行在这个 位置的全一个元素
//     for (let i = 0; i <= rowIndex; i++) {
//         res[i] = 1;
//         for (let j = i - 1; j > 0; j--) {
//             res[j] += res[j - 1];
//         }
//     }
//     return res;
// }
