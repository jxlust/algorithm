/**
 * N*N的矩阵旋转90度
 * @param {number[][]} arr 
 * a[i][j] = a[j][N-1-i]
 */
const rotateArray = function (arr) {
    let N = arr.length;
    let temp = new Array(N);
    for (let i = 0; i < N; i++) {
        temp[i] = new Array(N);
    }
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            temp[j][N - 1 - i] = arr[i][j];
        }
    }
    return temp;
}
let arr = [
    [
        5, 1, 9, 11
    ],
    [
        2, 4, 8, 10
    ],
    [
        13, 3, 6, 7
    ],
    [
        15, 14, 12, 16
    ]
]

// console.log(rotateArray(arr));
// console.log(rotateArray([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]));

/**
 * 解法2,以对角线翻转，然后每一行倒着排一次
 * 矩阵翻转90度，空间复杂度O(1)
 * @param {number[][]} matrix 
 */
const rotate = function (matrix) {
    let N = matrix.length;
    let temp = null;
    //以对角线交换了双方位置
    for (let i = 0; i < N; i++) {
        for (let j = i; j < N; j++) {
            temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;

        }
    }
    //每一行倒着排过来
    let t = null;
    for (let i = 0; i < N; i++) {
        //    matrix[i].reverse();
        for (let j = 0; j <= (N - 1) >> 1; j++) {
            t = matrix[i][j];
            matrix[i][j] = matrix[i][N - 1 - j];
            matrix[i][N - 1 - j] = t;
        }
    }
    console.log(matrix);
}
const rotate2 = function (matrix) {
    let N = matrix.length;
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            //解构赋值
            [matrix[j][i],matrix[i][j]] = [matrix[i][j],matrix[j][i]];
        }
    }
    matrix.forEach(a => {
        a.reverse();
    });
    console.log(matrix);
}

rotate2([
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [7, 8, 9, 13],
    [21, 22, 23, 24]
])
/**
 * 解法三，先以j的中线对翻，在以对角线对翻
 */
