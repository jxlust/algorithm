function swap(arr, i, j) {
  if (i === j) return;
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
    const { index, first } = cur;
    if (index + 1 === nums) {
      // 排列一次结果
      result.push(first.join());
    } else {
      for (let i = index; i < nums; i++) {
        // 交换
        // swap(first, i, index);
        // stack.push({
        //   // 注意这里是拷贝出来
        //   first: [...first],
        //   index: index + 1,
        // });
        // 撤回 上面都是对象的拷贝，这里不用撤回也可以，因为first已经不用了,但是对原数组会产生改变
        // swap(first, i, index);

        const newList = [...first];
        swap(newList, i, index);
        stack.push({
          first: newList,
          index: index + 1,
        });
      }
    }
  }

  console.log("stack :", result);
  console.log("list:", list);
  return result;
}

const test = [1, 2, 3];

getAllStack(test);
