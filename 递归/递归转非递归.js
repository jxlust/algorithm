// 虽然将递归函数转换为迭代函数可以提高程序效率，但是转换后的迭代函数往往可读性差，难以理解，不易维护。
// 所以只有在特殊情况下，比如对栈空间有严格要求的嵌入式系统，才需要转换递归函数。
// 大部分情况下，递归并不会成为系统的性能瓶颈，一个代码简单易读的递归函数常常比迭代函数更易维护。

function Fibonacci2(num, s1 = 0, s2 = 1) {
    if (num == 0) {
        return s1;
    }
    // num--;
    Fibonacci2(num--, s2, s1 + s2);
}

// function Fibonacci(num) {
//     let a0 = 0;
//     let a1 = 1;
//     if (num == 0) {
//         return 0;
//     }
//     if (num == 1) {
//         return 1;
//     }
//     for (let i = 1; i < num; i++) {
//         let t = a0;
//         a0 = a1;
//         a1 = a1 + t;
//     }
//     return a1;
// }

/**
 * 优化
 * @param {*} num 
 */
function Fibonacci(num) {
    let a0 = 0;
    let a1 = 1;
    for (let i = 0; i < num; i++) {
        let t = a0;
        a0 = a1;
        a1 = a1 + t;
    }
    return a0;
}
for (let i = 0; i < 10; i++) {
    console.log(Fibonacci(i));
}