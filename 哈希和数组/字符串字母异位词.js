/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  // 输入: s = "anagram", t = "nagaram"
  // 输出： true

  //输入：s="abc", t= "abc"
  //输出： true

  //输入：s="",t=""
  //输出： true

  //输入：s="ad", t= "df"
  //输出： false

  //输入长度不一致：false

  if (s.length != t.length) {
    return false;
  }
  let need = {},
    window = {};
  for (let v of t) {
    if (need[v]) {
      need[v]++
    } else {
      need[v] = 1;
    }
  }

  let match = 0;
  let needSize = Object.keys(need).length;

  for (let v of s) {
    if (need[v]) {
      if (window[v]) {
        window[v]++;
      } else {
        window[v] = 1;
      }
      if (window[v] === need[v]) {
        match++;
      }
    } else {
      break;
    }
  }
  return match === needSize

};
console.log(isAnagram('1+a%of00<', '%of00<a1+'));



/**
 * 改题可以利用数组优化HashMap
 *给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。
 *字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  // 输入: s: "cbaebabacd" p: "abc"
  // 输出: [0, 6]
  // 解释: 起始索引等于 0 的子串是 "cba", 它是 "abc"  的字母异位词。
  // 起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
  let left = 0,
    right = 0;
  let window = {},
    need = {};
  let ret = [];
  for (let v of p) {
    need[v] ? need[v]++ : (need[v] = 1)
  }
  let match = 0,
    needSize = Object.keys(need).length;

  while (right < s.length) {
    //扩大窗口
    let char1 = s[right];
    if (need[char1]) {
      window[char1] ? window[char1]++ : (window[char1] = 1)
      if (window[char1] === need[char1]) {
        match++;
      }
    }
    right++
    while (match === needSize) {
      if (right - left === p.length) {
        ret.push(left)
      }
      let char2 = s[left];
      if (need[char2]) {
        window[char2]--;
        if (window[char2] < need[char2]) {
          match--;
        }
      }
      left++;
    }

  }
  return ret;

};
let s = 'abab',
  p = 'ab'

console.log(findAnagrams(s, p));
