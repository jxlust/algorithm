/**
 * 第一行: 0
 * 第二行: 01
 * 第三行: 01 10
 * 第四行: 01 10 10 01
 * 第五行：01 10 10 01 10 01 01 10
 * 
 * 第K个的值跟父位有关，K的父位 是 (K+1)/2
 * 如果父位是1，那么K位的值就是 k%2,如果父位是0，K位的值就是(k+1) % 2
 * @param {number} N
 * @param {number} K  K <= 2^N
 * @return {number}
 */
var kthGrammar = function (N, K) {
    if(N === 1){
        return 0;
    }
    let s = kthGrammar(N - 1, (K + 1) >> 1);
    
    return K & 1 ^ ( s ^ 1);
    // ~K & 1 ^ s;
    // if (s === 1) {
    //     //奇偶的判断还可以用位运算 x & 1 来判断
    //     K & 1 
    //     // return K % 2;
    // } else {
    //     K & 1 ^ 1;
    //     // return (K + 1) % 2;
    // }
};

console.log(kthGrammar(5,10));