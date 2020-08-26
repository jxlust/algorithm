/**
 * 暴力匹配
 * @param {*} s 匹配串 
 * @param {*} str 文本字符串
 */
const BF = function (s, str) {
  let m = str.length,
    n = s.length;
  let i = 0,
    j = 0;
  while (i < m && j < n) {
    if (str[i] === s[j]) {
      i++;
      j++
    } else {
      //i回溯到开始比较的位置+1
      //j回溯到0重新开始
      i = i - j + 1;
      j = 0;
    }
  }
  // console.log(i, j);
  if (j === n) {
    return i - j;
  } else {
    return -1;
  }
}
// console.log(BF('ababcabcac', 'abca'));
// console.log(BF('aaabaaad', 'aab'));


const sunday = function (pattern, text) {
  let pLen = pattern.length,
    tLen = text.length;
  if (pattern === null || text === null) {
    return -1;
  }
  //文本串指针和模式串指针
  let i = 0,
    j = 0;
  //其实可以建立一个模式串hash map表，类似于BM算法的坏字符规则表
  let map = new Map();
  for (let i = 0; i < pLen; ++i) {
    map.set(pattern.charAt(i), pLen - 1 - i);
  }

  while (i < tLen && j < pLen) {
    if (pattern.charAt(j) === text.charAt(i)) {
      i++;
      j++;
    } else {
      //1. 取文本串匹配的后一个字符，来判断是否存在于模式串中
      //1.1 如果存在 则移动到与模式串中对应字符对其，移动的步数： map.get(C),c为改字符
      //1.2 如果不存在 移动 plen + 1;
      let nextPos = i - j + pLen;
      let nextChar = text.charAt(nextPos);
      if (!map.has(nextChar)) {
        i = i - j + pLen + 1;
      } else {
        i = i - j + map.get(nextChar) + 1;
      }
      j = 0;
    }

  }
  if (j === pLen) {
    return i - pLen;
  } else {
    return -1;
  }
}
let test1_ = 'a',
  test1 = ''
let test2_ = 'aa',
  test2 = 'abacdaa'
let test3_ = 'cbba',
  test3 = 'cbabdcbacbbad'
console.log(999, BF(test1_, test1), sunday(test1_, test1));
console.log(999, BF(test2_, test2), sunday(test2_, test2));
console.log(999, BF(test3_, test3), sunday(test3_, test3));
