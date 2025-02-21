// P:       A  B  C  A  B  Y  Z
// i:       0  1  2  3  4  5  6
// next:    0  0  0  0  1  2  0
function buildNext(p) {
    const m = p.length;
    const next = Array(m).fill(0);
    let j = 0;
    for (let i = 2; i < m; i++) {
        // ***重点***
        while (j > 0 && p[i - 1] !== p[j]) {
            // 如果字符不匹配，j回溯到上一个位置的next，即C,Y不匹配，j回溯到AB串最大公共子串的位置，这里是0
            j = next[j];
        }
        if (p[j] === p[i - 1]) {
            j++;
        }
        next[i] = j;
    }
    return next;
}

function kmpSearch(p, s) {
    const n = s.length;
    const m = p.length;
    const next = buildNext(p);
    let j = 0;
    for (let i = 0; i < n; i++) {
        while (j > 0 && p[j] !== s[i]) {
            j = next[j];
        }
        if (p[j] === s[i]) {
            j++;
        }
        if (j === m) {
            // 上面j++了，这里需要+1
            return i - j + 1
        }
    }
    return -1;
}


const test = ['abcabz', 'abcabyz', 'abcabaz']
for (let item of test) {
    console.log(buildNext(item))
}

console.log(kmpSearch('byz', 'abcabyz'))
console.log(kmpSearch('abcabz', 'abcabuabcabz'))
console.log(kmpSearch('ttt', 'abcabuabcabz'))
