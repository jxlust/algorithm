## 引子
如果你在网上搜索过关于 sort 源码的文章，可能会告诉你数组长度小于22用插入排序，否则用快速排序。

开始我也是这么认为的，可当我带着答案去 GitHub 验证的时候发现并非如此。

首先我并没有找到对应的 js 源码（文章说实现逻辑是用js写的），因为但新版本的V8源码已经修改，改用V8 Torque。V8 Torque是专门用来开发V8而创造的语言，语法类似TypeScript（再一次证明TypeScript的价值），它的编译器使用CodeStubAssembler转换成高效的汇编代码。
简单理解起来就是创造了一个类似TypeScript的高效的高级语言，这个语言的文件后缀是tq。


其次当我开始阅读源码的时候，并没有找到使用快速排序的代码，也没有找到判断数组长度的常数值10。

所有的证据表明，之前的源码解读文章很可能已经过时。

那么最新版本的 V8 用的是什么排序算法呢？

## 解读
V8引擎在xx版本之后就舍弃了快速排序，因为它不是稳定的排序算法，在最坏情况下，时间复杂度会降级到O(n^2)。
而是采用了一种混合排序的算法：TimSort。
这种功能算法最初用于Python语言中，严格地说它t不属于以上10种排序算法中的任何一种，属于一种混合排序算法：
在数据量小的子数组中使用插入排序，然后再使用归并排序将有序的子数组进行合并排序，时间复杂度为 O(nlogn) 。

结合V8源码，具体实现步骤如下：

1. 判断数组长度，小于2直接返回，不排序。
2. 开始循环。
3. 找出一个有序子数组，我们称之为“run”，长度为 currentRunLength 。
4. 计算最小合并序列长度 minRunLength （这个值会根据数组长度动态变化，在32~64之间）。
5. 比较 currentRunLength 和 minRunLength ，如果 currentRunLength >= minRunLength ，否则采用插入排序补足数组长度至 minRunLength ，将 run 压入栈 pendingRuns 中。
6. 每次有新的 run 被压入 pendingRuns 时保证栈内任意3个连续的 run（run0, run1, run2）从下至上满足run0>run1+run2 && run1>run2 ，不满足的话进行调整直至满足。
7. 如果剩余子数组为0，结束循环。
8. 合并栈中所有 run，排序结束。

## 源码
源码路径
> /thrid_party/v8/builtins/array-sort.tq

核心源码
> [对于timsort算法可以参考本人git排序算法文件理解](https://github.com/jxlust/algorithm/)

```
// 在while循环之前调用，每次排序只调用一次，用来计算 minRunLength
macro ComputeMinRunLength(nArg: Smi): Smi {
  let n: Smi = nArg;
  let r: Smi = 0;

  assert(n >= 0);
  // 不断除以2，得到结果在 32~64 之间
  while (n >= 64) {
    r = r | (n & 1);
    n = n >> 1;
  }

  const minRunLength: Smi = n + r;
  assert(nArg < 64 || (32 <= minRunLength && minRunLength <= 64));
  return minRunLength;
}
```


```
// 计算第一个 run 的长度
macro CountAndMakeRun(implicit context: Context, sortState: SortState)(
    lowArg: Smi, high: Smi): Smi {
  assert(lowArg < high);
  // 这里保存的才是我们传入的数组数据
  const workArray = sortState.workArray;

  const low: Smi = lowArg + 1;
  if (low == high) return 1;

  let runLength: Smi = 2;

  const elementLow = UnsafeCast<JSAny>(workArray.objects[low]);
  const elementLowPred = UnsafeCast<JSAny>(workArray.objects[low - 1]);
  // 调用比对函数来比对数据
  let order = sortState.Compare(elementLow, elementLowPred);

  const isDescending: bool = order < 0 ? true : false;

  let previousElement: JSAny = elementLow;
  // 遍历子数组并计算 run 的长度
  for (let idx: Smi = low + 1; idx < high; ++idx) {
    const currentElement = UnsafeCast<JSAny>(workArray.objects[idx]);
    order = sortState.Compare(currentElement, previousElement);

    if (isDescending) {
      if (order >= 0) break;
    } else {
      if (order < 0) break;
    }

    previousElement = currentElement;
    ++runLength;
  }

  if (isDescending) {
    ReverseRange(workArray, lowArg, lowArg + runLength);
  }

  return runLength;
}
```


```
// 调整 pendingRuns ，使栈长度大于3时，所有 run 都满足 run[n]>run[n+1]+run[n+2] 且 run[n+1]>run2[n+2]
transitioning macro MergeCollapse(context: Context, sortState: SortState) {
    const pendingRuns: FixedArray = sortState.pendingRuns;

    while (GetPendingRunsSize(sortState) > 1) {
      let n: Smi = GetPendingRunsSize(sortState) - 2;

      if (!RunInvariantEstablished(pendingRuns, n + 1) ||
          !RunInvariantEstablished(pendingRuns, n)) {
        if (GetPendingRunLength(pendingRuns, n - 1) <
            GetPendingRunLength(pendingRuns, n + 1)) {
          --n;
        }
        MergeAt(n); // 将第 n 个 run 和第 n+1 个 run 进行合并
      } else if (
          GetPendingRunLength(pendingRuns, n) <=
          GetPendingRunLength(pendingRuns, n + 1)) {
        MergeAt(n); // 将第 n 个 run 和第 n+1 个 run 进行合并
      } else {
        break;
      }
    }
  }
```

## 引用
+ [V8源码](https://github.com/v8/v8)
+ [《V8引擎中的排序》](https://juejin.im/post/5c472940e51d455249762bef)
 
