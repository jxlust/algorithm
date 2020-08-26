const BF = function (str, s) {
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
  console.log(i, j);
  if (j === n) {
    return i - j;
  } else {
    return -1;
  }
}
console.log(BF('ababcabcac', 'abca'));
console.log(BF('aaabaaad', 'aab'));