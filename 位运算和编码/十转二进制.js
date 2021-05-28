/**
 * 十进制转二进制
 * @param {number} number
 */
function decimalToBinary(number) {
  let binary = "";
  let r = undefined;
  let sign = "";
  if (number < 0) {
    sign = "-";
    number = -number;
  }
  while (number != 0) {
    r = number % 2;
    binary = r + binary;
    number = (number / 2) | 0;
  }
  binary = sign + binary;
  return binary.length ? binary : "0";
}
console.log(decimalToBinary(-10));

//小数怎么处理，分割，小数部分*2，达到一定长度则停止
// 0 <= number < 1
function decimalNumber(number) {
    const MaxLength = 52;
    let result = '';
    while(result.length < MaxLength){
        let r = number * 2;
        let f = r | 0;
        result += f;
        number = r - f;
    }
    return result;
}
console.log(decimalNumber(0.123));
