/**
 * 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 输入: "abcabcbb"
  // 输出: 3 
  // 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  // 分析得出：对于当前窗口没有重复的就继续扩大，如果出现重复的了就缩小到不重复
  let left = 0,
    right = 0;
  let window = {};
  let start = 0,
    maxLength = 0;
  while (right < s.length) {
    //扩大
    let ch = s[right]
    if (window[ch]) {
      while (window[ch] > 0) {
        let ch2 = s[left];
        window[ch2]--;
        left++;
      }
    } else {
      window[ch] = 1;
      right++;
      if (right - left > maxLength) {
        maxLength = right - left;
        start = left;
      }
    }
  }

  return maxLength
};

var lengthOfLongestSubstring = function (s) {
  // 输入: "abcabcbb"
  // 输出: 3 
  // 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  // 分析得出：对于当前窗口没有重复的就继续扩大，如果出现重复的了就缩小到不重复
  let left = 0,
    right = 0;
  let window = {};
  let maxLength = 0;
  while (right < s.length) {
    //扩大
    let ch = s[right]
    window[ch] ? window[ch]++ : window[ch] = 1;
    right++;
    while (window[ch] > 1) {
      //缩小窗口
      let ch2 = s[left];
      window[ch2]--;
      left++;
    }
    if (right - left > maxLength) {
      maxLength = right - left;
    }
  }

  return maxLength
};
console.log(lengthOfLongestSubstring('aaafcd'));
