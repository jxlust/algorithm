/**
 * base64编码规则：
 * 有64个字符集合分别对应0 - 63, 2^6个字符，所以最多6位二进制
 * 普通字符根据ASCII值，是八位二进制表现形式的，需要转成六位操作
 * 不够位数后面补零，剩余一个字节，补齐两个==,剩余两个，补一个=
 * 最后按六位字符转成base64字符集
 * case:
 * ABC =>对应ASCII 65 66 67
 * 65 66 67 =>二进制 01000001 01000010 01000011
 * 从右按六位分割成base64编码：  010000   010100  001001   000011
 * 十进制分别为： 16 20 9 3
 * 映射成base64字符集 Q U J D
 */
//  https://es6.ruanyifeng.com/#docs/string-methods#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95%EF%BC%9AcodePointAt
// ASCII 互转
// 'A'.codePointAt(0)
// String.fromCodePoint(0000) // unicode "\u0000" 字符是空格""
const Base64Table =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const decodeTable = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
  46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
]; //表示的是ASCII码表里面128字符集数字对应base64 字符集的索引位置
//比如 ascii A = 65，对应是 0
// base64Encode("ABC");

function base64Encode(str) {
  //三个三个一组，因为 3个字节 -> 4个字节 刚刚好
  let result = [];
  let len = str.length;
  let cIndex = 0;
  while (cIndex + 3 <= len) {
    let char1 = str.codePointAt(cIndex++);
    let char2 = str.codePointAt(cIndex++);
    let char3 = str.codePointAt(cIndex++);
    //转换成base64字符 0x3f === 00111111
    result.push(
      Base64Table.charAt(char1 >> 2),
      Base64Table.charAt(((char1 << 4) + (char2 >> 4)) & 0x3f)
    );
    result.push(
      Base64Table.charAt(((char2 << 2) + (char3 >> 6)) & 0x3f),
      Base64Table.charAt(char3 & 0x3f)
    );
  }
  //处理小于3的字节个数
  if (cIndex < len) {
    let char = str.codePointAt(cIndex++);
    result.push(Base64Table.charAt(char >> 2));
    if (cIndex < len) {
      //还有一个字节
      let lastChar = str.codePointAt(cIndex);
      result.push(Base64Table.charAt(((char << 4) + (lastChar >> 4)) & 0x3f));
      result.push(Base64Table.charAt((lastChar << 2) & 0x3f), "=");
    } else {
      //最后的剩余2位,后面补齐四个零
      result.push(Base64Table.charAt((char << 4) & 0x3f), "==");
    }
  }
  return result.join("");
}
console.log(base64Encode("ABcD"));

function base64Decode(str) {
  str = str.replace(/[^A-Za-z0-9\+\/]/g, ""); //过滤其他字符
  let result = [];
  //逆向，四个字节 => 三个字节
  let index = 0;
  let len = str.length;
  //base64字符最大63，字节前两位肯定是0，00xxxxxx 00xxxxxx
  while (index + 4 <= len) {
    //四个四个一组,ascii映射的base64 index
    let char1 = decodeTable[str.codePointAt(index++)];
    let char2 = decodeTable[str.codePointAt(index++)];
    let char3 = decodeTable[str.codePointAt(index++)];
    let char4 = decodeTable[str.codePointAt(index++)];
    //注意：左移可能会溢出一个字节，所以需要 & 0xff,只截取字节内的
    let tc1 = ((char1 << 2) & 0xff) + (char2 >> 4);
    let tc2 = ((char2 << 4) & 0xff) + (char3 >> 2);
    let tc3 = ((char3 << 6) & 0xff) + char4;
    result.push(String.fromCodePoint(tc1, tc2, tc3));
  }
  //剩余1不用考虑，因为最多取六个bit位不足1个字节
  if (index + 1 < len) {
    //2 3
    let char1 = decodeTable[str.codePointAt(index++)];
    let char2 = decodeTable[str.codePointAt(index++)];
    //2个字符
    let tc1 = ((char1 << 2) & 0xff) + (char2 >> 4);
    console.log(3,tc1);
    result.push(String.fromCodePoint(tc1));
    //只剩2个字节后面不足一个字节不用管了
    if (index < len) {
      //第3个字符
      let char3 = decodeTable[str.codePointAt(index)];
      let tc2 = ((char2 << 4) & 0xff) + (char3 >> 2);
      result.push(String.fromCodePoint(tc2));
    }
  }

  return result.join("");
}
console.log(base64Decode("QUJjRA=="));

//自定义从右往左编码
function myEncode(str) {
  //补齐0
  let originArray = [];
  for (let s of str) {
    let code = s.codePointAt(0);
    let binary = code.toString(2);
    let fillLength = 8 - (binary.length % 8);
    while (fillLength > 0) {
      binary = "0" + binary;
      fillLength--;
    }
    originArray.push(binary);
  }

  let origString = originArray.join("");
  let fill = 6 - (origString.length % 6);
  if (fill !== 6) {
    while (fill > 0) {
      origString = "0" + origString;
      fill--;
    }
  }
  console.log(origString);
  let base64Str = "";
  for (let i = 0, len = origString.length; i < len; i = i + 6) {
    let base64Code = parseInt(origString.substr(i, 6), 2);
    base64Str += Base64Table.charAt(base64Code);
  }
  //   console.log(baseStr);
  return base64Str;
}
