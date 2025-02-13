function buildNext(pattern) {
    const m = pattern.length;
    const next = new Array(m + 1).fill(0);
    next[0] = -1;
    let i = 0, j = -1;
    while (i < m) {
        if (j === -1 || pattern[i] === pattern[j]) {
            i++;
            j++;
            next[i] = j;
        } else {
            j = next[j];
        }
    }
    return next;
}

function kmpSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    if (m === 0) return [];
    const next = buildNext(pattern);
    const result = [];
    let i = 0, j = 0;
    while (i < n) {
        if (j === -1 || text[i] === pattern[j]) {
            i++;
            j++;
        } else {
            j = next[j];
        }
        if (j === m) {
            result.push(i - m);
            j = next[j];
        }
    }
    return result;
}

function kmpSearchV2(text, pattern) {
    const n = text.length;
    const m = pattern.length;
    if (m === 0) return [];
    const next = buildNext(pattern);
    const result = [];
    let i = 0, j = 0;
    while (i < n) {
        if (j === -1 || text[i] === pattern[j]) {
            i++;
            j++;
        } else {
            j = next[j];
        }
        if (j === m) {
            const sIndex = i - m;
            if (result.length > 0) {
                const top = result[result.length - 1];
                // 处理一下，匹配的位置结果集，区间不产生重叠
                if ((sIndex - top) >= pattern.length) {
                    result.push(sIndex);
                }
            } else {
                result.push(sIndex);
            }

            j = next[j];
        }
    }
    return result;
}

// 示例使用
const text = "ababababcababc";
const pattern = "aba";
console.log(kmpSearch(text, pattern)); // 输出匹配位置
console.log(kmpSearchV2(text, pattern)); // 输出匹配位置