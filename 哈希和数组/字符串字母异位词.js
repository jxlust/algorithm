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
console.log(isAnagram('1+a%of00<','%of00<a1+'));
