function findRepeatChar(str) {
  // 双指针滑动
  let start = 0,
    end = 0;

  let maxL = 0,
    maxChar;

  while (end < str.length) {
    if (str[start] === str[end]) {
      // 连续同一个字符
      const diff = end - start + 1;
      if (diff > maxL) {
        maxChar = str[start];
        maxL = diff;
      }
    } else {
      start = end;
    }
    end++;
  }

  return [maxL, maxChar];
}

const test1 = "abbbcccddddddcdeffffdd";
console.log(findRepeatChar(test1));
