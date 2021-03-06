// Timsort是一种数据排序算法。它实现了这样一个想法，即现实世界中的数据集几乎总是包含已排序的子序列，因此排序策略是识别它们并使用merge和insert方法对它们进行进一步排序。
// 就复杂性和稳定性而言，Timsort是最好的排序算法之一。

// 该算法基于以下想法：在现实世界中，排序后的数据数组包含有序（无论如何：非降序或降序）子数组。通常情况确实如此。有了这样的数据，Timsort在软件工程中领先于所有其他算法。

//算法定义
// + N：输入数组的长度
// + run：输入数组中的有序子数组。同时，顺序是不降序或严格降序，即“ a0≤a1≤a2≤…»或«a0> a1> a2>…”(为了保证稳定性)
// + minrun：如上所述，在算法的第一步中，将输入数组拆分为run。minrun是这种运行的最小长度。该数字是由某些逻辑从N数计算得出的。
// + 调整, 新的 run 被压入 pendingRuns 时保证栈内任意3个连续的 run（run0, run1, run2）从下至上满足run0>run1+run2 && run1>run2 ，不满足的话进行调整直至满足。

//参考网址：https://www.infopulse.com/blog/timsort-sorting-algorithm/
// Step 1. Splitting into Runs and Their Sorting.

// ``` int GetMinrun(int n)
// {
//     int r = 0;  /* becomes 1 if the least significant bits contain at least one off bit */
//     while (n >= 64) {
//         r |= n & 1;
//         n >>= 1;
//     }
//     return n + r;
// } ```
// Step 2. Merge
// Runs Merging
// Modifications to the Merging Sort

class TimSort {
  constructor(arr) {
    this.arr = arr;
    this.MIN_MERGE = 32;
    // this.MIN_MERGE = 32;
    this.size = arr.length;
    this.runs = []; //存放所有的有序run区块

    /**
     * 栈中待归并的run的数量。一个run i的范围从runBase[i]开始，一直延续到runLen[i]。
     * 下面这个根据前一个run的结尾总是下一个run的开头。
     * 所以下面的等式总是成立:
     * runBase[i] + runLen[i] == runBase[i+1];
     **/

    this.stackSize = 0; //栈中run的数量
    this.runStack = [];
    // this.runLen = [];

  }
  getMinrun(n) {
    let r = 0;
    while (n >= this.MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }
  /**
   * 二分查找插入位置
   * @return 插入值所在位置
   * @param {Number[]} arr 数组
   * @param {Number} left 左索引
   * @param {Number} right 右索引
   * @param {Number} value  需要插入的值
   */

  binarySearch(arr, left, right, value) {
    while (left < right) {
      // let mid = left + (right - left)>>1
      let mid = (left + right) >>> 1;
      if (arr[mid] > value) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    //left === right
    return left;
    // if (left == right) {
    //   if (arr[left] <= value) {
    //     return left + 1;
    //   } else {
    //     return left;
    //   }
    // } else {
    //   throw new RangeError('索引不合法');
    // }
  }
  /**
   * 归并排序数组
   * @return {Number[]} arr 归并的数组
   * @param {Number[]} arr1 
   * @param {Number[]} arr2 
   */
  merge(arr1, arr2) {
    if (!arr1.length && !arr2.length) {
      return [];
    }
    if (!arr1.length) {
      return arr2;
    }
    if (!arr2.length) {
      return arr1;
    }

    let i = 0,
      j = 0,
      k = 0;
    let temp = [];
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] > arr2[j]) {
        temp[k++] = arr2[j++];
      } else {
        temp[k++] = arr1[i++];
      }
    }
    while (i < arr1.length) {
      temp[k++] = arr1[i++]
    }
    while (j < arr2.length) {
      temp[k++] = arr2[j++]
    }
    return temp;
  }
  /**
   * * 被优化的二分插入排序
   *
   * 使用二分插入排序算法给指定一部分数组排序。这是给小数组排序的最佳方案。最差情况下
   * 它需要 O(n log n) 次比较和 O(n^2)次数据移动。
   *
   * 如果开始的部分数据是有序的那么我们可以利用它们。这个方法默认数组中的位置lo(包括在内)到
   * start(不包括在内)的范围内是已经排好序的。
   * @param {*} arr 被排序的数组
   * @param {*} left  待排序范围内的首个元素的位置
   * @param {*} right 待排序范围内最后一个元素的后一个位置
   * @param {*} start  待排序范围内的第一个没有排好序的位置，确保 (lo <= start <= hi)
   */
  binaryInsertionSort(arr, left, right, start) {
    // let size = arr.length;
    for (let i = start; i < right; i++) {
      let cur = arr[i];
      let pos = this.binarySearch(arr, left, i - 1, cur);

      //这个方法对数据进行拼接性能消耗较多
      //arr = arr.slice(0, pos).concat([cur], arr.slice(pos, i), arr.slice(i + 1))
      //优化
      // let distance = i - pos;
      // switch语句是一条小优化，1-2个元素的移动就不需要了。 
      for (let j = i; j > pos; j--) {
        arr[j] = arr[j - 1]
      }
      arr[pos] = cur;
    }
    //内部排序完成
  }
  /**
   * 普通插入排序
   * @param {Number[]} arr 
   */
  insertionSort(arr) {
    let size = arr.length;
    for (let i = 1; i < size; i++) {
      let pre = i - 1;
      let curV = arr[i];
      while (pre >= 0 && curV < arr[pre]) {
        arr[pre + 1] = arr[pre];
        pre--;
      }
      arr[pre + 1] = curV;
    }
    // return arr
  }
  mergeRuns(arr, left, right) {
    if (left >= right) {
      return arr[left]
    }
    let mid = (left + right) >>> 1;
    return this.merge(this.mergeRuns(arr, left, mid), this.mergeRuns(arr, mid + 1, right))
  }
  reverseRange(arr, left, right) {
    while (left < right) {
      let temp = arr[left];
      arr[left++] = arr[right];
      arr[right--] = temp;
    }
  }
  /*
   * @param left run中首个元素的位置
   * @param right run中最后一个元素的后面一个位置，需要确保lo<hi
   * @return 从首个元素开始的最长升序子序列的结尾位置+1 or 严格的降序子序列的结尾位置+1。
   */
  countAndMakeRun(left, right) {
    let runHi = left + 1;
    if (runHi === right) {
      //只有一个元素
      return 1;
    }
    //思路：两个连续数要不就是按照严格降序，要不就是升序
    if (this.arr[runHi++] < this.arr[left]) {
      //前两个元素是严格降序就按降序统计
      while (runHi < right && this.arr[runHi] < this.arr[runHi - 1]) {
        runHi++;
      }
      //这里把降序区域正序
      console.log(runHi, 9);
      this.reverseRange(this.arr, left, runHi - 1)
    } else {
      //按升序
      while (runHi < right && this.arr[runHi] >= this.arr[runHi - 1]) {
        runHi++;
      }
    }

    return runHi - left;

  }
  sort() {
    if (this.size < 2) {
      return
    }
    // 小于MIN_MERGE长度的数组就不用归并排序了，杀鸡焉用宰牛刀
    if (this.size < this.MIN_MERGE) {
      let initRunLen = this.countAndMakeRun(0, this.size);
      // binarySort(a, lo, hi, lo + initRunLen, c);
      this.binaryInsertionSort(this.arr, 0, this.size, initRunLen);
      return;
    }

    /**
     * March over the array once, left to right, finding natural runs,
     * extending short natural runs to minRun elements, and merging runs
     * to maintain stack invariant.
     *
     * 下面将进入算法流程的主体,首先理解源码注释中run的含义，可以理解为升序序列的意思。
     *
     * 从左到右，遍历一边数组。找出自然排好序的序列(natural run)，把短的自然升序序列通过二叉查找排序
     * 扩展到minRun长度的升序序列。最后合并栈中的所有升序序列，保证规则不变。
     */
    let minRunLength = this.getMinrun(this.size);
    console.log('minRunlength:', minRunLength);
    let remainLength = this.size;
    let low = 0,
      hight = this.size;
    // let runsArray = [];
    do {

      let curRunLength = this.countAndMakeRun(low, hight);
      console.log(curRunLength, 'xxxx');
      // If run is short, extend to min(minRun, nRemaining)
      // 如果 自然升序的长度不够minRun，就把 min(minRun,nRemaining)长度的范围内的数列排好序
      if (curRunLength < minRunLength) {
        let diff = remainLength <= minRunLength ? remainLength : minRunLength;
        this.binaryInsertionSort(this.arr, low, low + diff, low + curRunLength);
        curRunLength = diff;
      }

      // runsArray.push(this.arr.slice(low, low + curRunLength))

      // Push run onto pending-run stack, and maybe merge
      //把已经排好序的数列压入栈中，检查是不是需要合并
      this.pushStack(low, curRunLength);
      this.mergeCollapse();

      low += curRunLength;

      remainLength -= curRunLength;

    } while (remainLength != 0);
    // console.log('分区后', runsArray);
    console.assert(low === hight)
    this.mergeForceCollapse();
    console.assert(this.stackSize === 1, 'stacksize不为1');
  }

  /**
   * 检查栈中待归并的升序序列，如果他们不满足下列条件就把相邻的两个序列合并，
   * 直到他们满足下面的条件
   *
   * 1. runLen[i - 3] > runLen[i - 2] + runLen[i - 1]
   * 2. runLen[i - 2] > runLen[i - 1]
   *
   * 每次添加新序列到栈中的时候都会执行一次这个操作。所以栈中的需要满足的条件
   * 需要靠调用这个方法来维护。
   *
   */
  mergeCollapse() {
    while (this.stackSize > 1) {
      let n = this.stackSize - 2;
      if (n > 0 && this.runStack[n - 1].length <= this.runStack[n].length + this.runStack[n + 1].length) {
        if (this.runStack[n - 1].length < this.runStack[n + 1].length) {
          n--;
        }
        this.mergeAt(n);
      } else if (this.runStack[n].length <= this.runStack[n + 1].length) {
        this.mergeAt(n)
      } else {
        break;
      }
    }
  }
  /**
   * 合并在栈中位于i和i+1的两个相邻的升序序列。 i必须为从栈顶数，第二和第三个元素。
   * 换句话说i == stackSize - 2 || i == stackSize - 3
   *
   * @param n 待合并的第一个序列所在的位置
   */
  mergeAt(n) {

  }
  pushStack(start, length) {
    this.runStack[this.stackSize++] = {
      start,
      length
    }
  }

  /**
   * 简单思路
   */
  simple() {
    //划分run区
    let runs = []; //存放所有runs区块的集合
    let newRuns = [this.arr[0]]; //新的run区块
    //线性遍历划分
    //这里简单处理不降序区块划分
    for (let i = 1; i < this.size; i++) {
      if (this.arr[i] < this.arr[i - 1]) {
        runs.push(newRuns);
        newRuns = [this.arr[i]];
      } else {
        newRuns.push(this.arr[i]);
      }
      if (i === this.size - 1) {
        runs.push(newRuns);
        break;
      }
    }
    // runs.push(newRuns);添加最后一段newRuns,放循环外也可以

    //进行了严格降序和扩充run区块，得使用插入排序，这里插入效率很高了
    for (let r of runs) {
      this.insertionSort(r)
    }
    // console.log('每段run排序后：', runs);
    // 两两合并
    let sortArr = [];
    // for (let run of runs) {
    //   sortArr = this.merge(sortArr, run);
    // }
    sortArr = this.mergeRuns(runs, 0, runs.length - 1)
    return sortArr;
    // console.log('最终排序后：', sortArr);
  }

}
let test = [9, 1, 0, 4, 8, 45, 2, 3, 4, 82, 99, 123, 45, 8, 99, 12, 234, 2, 99]
for (let i = 1; i < 50; i++) {
  test.push(i)
}
let timSort = new TimSort(test)
// console.log('求分run位置：', timSort.countAndMakeRun(0, test.length));
// console.log('新的arr:', test);

console.log('timsort后：', timSort.sort());
console.log('排序后：', JSON.stringify(test));
