function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}
/**
 * 显式栈实现全排列输出
 * @param {*} list
 * @returns
 */
function getAllStack(list) {
  const result = [];
  const stack = [];
  stack.push({
    first: list,
    index: 0,
  });
  const nums = list.length;

  while (stack.length) {
    // 栈不为空
    let cur = stack.pop();
    if (cur.index + 1 === nums) {
      // 排列一次结果
      result.push(cur.first.join());
    } else {
      for (let i = cur.index; i < nums; i++) {
        swap(cur.first, i, cur.index);
        stack.push({
          // 注意这里是拷贝出来
          first: [...cur.first],
          index: cur.index + 1,
        });
        swap(cur.first, i, cur.index);
      }
    }
  }

  console.log("stack :", result);
  return result;
}

getAllStack(test);
