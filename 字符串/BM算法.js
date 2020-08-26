/**
 * 坏字符规则：根据坏字符规则做预处理，建立一张坏字符表 
 * @return {number[]} 坏字符跳表数据
 * @param {string} p 匹配模式串P 
 */
function initBadTable(p) {
  let n = p.length;
  // let bad = new Array(256);
  let bad = new Array(256).fill(n); //坏字符的跳转表
  for (let i = 0; i < n; ++i) {
    bad[p.codePointAt(i)] = n - i - 1; //记录跳表最后一个对应的字符跳转的步数
  }
  return bad;
}
/**
 * 好后缀规则：根据好后缀规则做预处理，建立一张好后缀表 
 * @param {string} p 匹配模式字符串p
 */
function initGoodTable(p) {
  let n = p.length;
  let goods = new Array(n);
  let lastPrefixPosition = n;
  for (let i = n - 1; i >= 0; --i) {
    if (isPrefix(p, i + 1)) {
      lastPrefixPosition = i + 1;
    }
    goods[n - 1 - i] = lastPrefixPosition - i + n - 1;
  }

  for (let i = 0; i < n - 1; ++i) {
    let slen = suffixLength(p, i);
    goods[slen] = n - 1 - i + slen;

  }
  return goods;
}
/**
 * 前缀匹配
 */
function isPrefix(p, lastIndex) {
  let n = p.length;
  for (let i = 0, j = lastIndex; j < n; ++i, ++j) {
    if (p.charAt(i) != p.charAt(j)) {
      return false;
    }
  }
  return true;
}
/**
 * 后缀匹配
 */
function suffixLength(p, index) {
  let n = p.length;
  let len = 0;
  for (let i = index, j = n - 1; i >= 0 && p.charAt(i) === p.charAt(j); --i, --j) {
    len += 1;
  }
  return len;
}
/**
 * 
 * @param {*} pattern 匹配规则字符
 * @param {*} target 匹配的text
 */
function pattern(pattern, target) {
  let tLen = target.length;
  let pLen = pattern.length;

  if (pLen > tLen) {
    return -1;
  }

  let bad_table = initBadTable(pattern); // 1,3,5,6,2,
  let good_table = initGoodTable(pattern); // 1,8,5,10,11,12,13

  for (let i = pLen - 1, j; i < tLen;) {
    console.log("跳跃位置：" + i);
    for (j = pLen - 1; target.charAt(i) == pattern.charAt(j); i--, j--) {
      if (j == 0) {
        console.log("匹配成功，位置：" + i);
        //					i++;   // 多次匹配
        //					break;
        return i;
      }
    }
    i += Math.max(good_table[pLen - j - 1], bad_table[target.codePointAt(i)]);
  }
  return -1;

}
console.log(initGoodTable('atabxab'));
console.log(99,pattern('ba', 'aaaaaaaabaaaaaa'));