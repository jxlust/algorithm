const quickSort = function (compare) {
  const _quickSort = function (nums, left, right) {
    if (left >= right) {
      return;
    }

    let i = left,
      j = right;
    let key = nums[left];

    while (i < j) {
      while (i < j && compare(nums[j], key) >= 0) {
        j--;
      }
      nums[i] = nums[j];
      while (i < j && compare(nums[i], key) < 0) {
        i++;
      }
      nums[j] = nums[i]
    }
    //i == j
    nums[i] = key;

    _quickSort(nums, left, i - 1)
    _quickSort(nums, i + 1, right)
  }

  _quickSort(this, 0, this.length - 1)
}

const treeQuickSort = function (compare) {
  const swap = function (nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
  const _quickSort = function (nums, left, right) {
    if (left >= right) {
      return;
    }
    let cur = left,
      i = left + 1,
      j = right;
    let key = nums[cur];
    while (i <= j) {
      let ret = compare(key, nums[i]);
      if (ret > 0) {
        // key 大，把i值交换
        swap(nums, cur++, i++);
      } else if (ret < 0) {
        swap(nums, i, j--);
      } else {
        //等于0
        i++;
      }
    }
    // console.log(nums, i, j, left);
    _quickSort(nums, left, j - 1)
    _quickSort(nums, i + 1, right)
  }

  _quickSort(this, 0, this.length - 1)
}

function test1() {
  let test = [{
    a: 12,
    name: '栗子'
  }, {
    a: 2,
    name: '逻辑'
  }, {
    a: 12,
    name: '罗拉'
  }, {
    a: 3,
    name: '精灵'
  }, {
    a: 2,
    name: '中山'
  }, {
    a: 10,
    name: '固态'
  }, {
    a: 2,
    name: '黑马'
  }]

  Array.prototype.qSort = quickSort;
  test.qSort((v1, v2) => v1.a - v2.a)
  console.log(test);
}

function test2() {
  let test = [{
    a: 8,
    name: '栗子'
  }, {
    a: 2,
    name: '逻辑'
  }, {
    a: 12,
    name: '罗拉'
  }, {
    a: 3,
    name: '精灵'
  }, {
    a: 2,
    name: '中山'
  }, {
    a: 12,
    name: '固态'
  }, {
    a: 2,
    name: '黑马'
  }]

  Array.prototype.qSort = treeQuickSort;
  test.qSort((v1, v2) => v1.a - v2.a)
  console.log(test);
}
test2();
