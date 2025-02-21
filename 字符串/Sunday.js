function sundaySearch(p, s) {
    const n = s.length;
    const m = p.length;
    // 存储模式串中每个字符最后出现的位置
    const map = new Map();
    for (let i = 0; i < m; i++) {
        // 位置是倒着数过来的，所以是m-i-1，最后一个为0
        map.set(p[i], m - i - 1);
    }
    // 定义两个指针，i指向文本串，j指向模式串
    let i = 0, j = 0;
    while (i < n && j < m) {
        if (s[i] === p[j]) {
            // 匹配成功，移动两个指针
            i++;
            j++;
        } else {
            // 匹配失败，移动模式串指针
            const next = i - j + m;
            const char = s[next];
            if (map.has(char)) {
                // 模式串中存在
                // 理解1：当前位置的结尾位置下一个位置 next 减去最末字符模式串距离开头的位置 在+1就是对齐位置的起始位置
                // i = next - (m - map.get(char)) + 1;
                // 理解2： i-j表示文本匹配起始位置，map.get(char)表示字符距离末尾的距离，也就是能移动到末尾的距离，
                // 所以对齐位置就是i-j+map.get(char)+1
                i = i - j + map.get(char) + 1;
            } else {
                // 模式串中不存在
                i = next + 1;
            }
            // j从头开始匹配
            j = 0;
        }
    }
    if (j === m) {
        return i - j;
    } else {
        return -1;
    }

}

function sundaySearchV2(p, s) {
    const n = s.length;
    const m = p.length;
    // 存储模式串中每个字符最后出现的位置
    const map = new Map();
    for (let i = 0; i < m; i++) {
        map.set(p[i], i);
    }
    // 定义两个指针，i指向文本串，j指向模式串
    let i = 0, j = 0;
    while (i < n && j < m) {
        if (s[i] === p[j]) {
            // 匹配成功，移动两个指针
            i++;
            j++;
        } else {
            // 匹配失败，移动模式串指针
            const next = i - j + m;
            const char = s[next];
            if (map.has(char)) {
                // 模式串中存在
                // 理解1：当前位置的结尾位置下一个位置 next 减去最末字符模式串距离开头的位置
                i = next - map.get(char);
            } else {
                // 模式串中不存在
                i = next + 1;
            }
            // j从头开始匹配
            j = 0;
        }
    }
    if (j === m) {
        return i - j;
    } else {
        return -1;
    }

}

console.log(sundaySearch('byz', 'abcabyz'))
console.log(sundaySearch('abcabz', 'abcabuabcabz'))
console.log(sundaySearch('ttt', 'abcabuabcabz'))


console.log(sundaySearchV2('byz', 'abcabyz'))
console.log(sundaySearchV2('abcabz', 'abcabuabcabz'))
console.log(sundaySearchV2('ttt', 'abcabuabcabz'))
/**
 * sunday算法要求我们预处理的信息：每一种字符在模式串中最后出现的位置。
 * 如果文本串中，出现了模式串中根本没出现过的字符，那么模式串应该向后移动整个模式串的长度。
 * i:  0  1  2  3  4  5  6  7  8  9  10  11
 * S:  A  B  C  A  B  U  A  B  C  A  B   Z
 * P:  A  B  C  A  B  Z
 *
 * P:           A  B  C  A  B  Z
 *
 * P:                    A  B  C  A  B  Z  -> ok
 *
 */



// const parts = text.split(/\s*/u); // 使用Unicode标志`u`来正确处理Unicode字符

// const text = "这是一个测试文本 😀 另一个测试 😃𠮷";
// const parts = text.split(/\S*/u); // 使用Unicode标志`u`来正确处理Unicode字符
// console.log(parts);