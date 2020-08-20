### 最开始思路完成代码
代码1：
```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    //分析：
    //1.对角线不能放置棋子
    //2.每行每列最多放置一个棋子

    let res = [];
    let visited = [];
    for (let i = 0; i < n; i++) {
        visited.push(new Array(n).fill(false))
    }
    const isCant = function (arr, x, y) {
        for (let i = x; i >= 0; i--) {
            if (arr[i][y]) {
                return true;
            }
        }
        for (let j = y; j >= 0; j--) {
            if (arr[x][j]) {
                return true;
            }
        }
        let i = x - 1,
            j = y - 1;
        //斜左上，斜右上
        while (i >= 0 && j >= 0) {
            if (arr[i][j]) {
                return true;
            }
            i--;
            j--;
        }
        let i2 = x - 1,
            j2 = y + 1;
        while (i2 >= 0 && j2 < n) {
            if (arr[i2][j2]) {
                return true;
            }
            i2--;
            j2++;

        }
        return false;
    }
    //路径和选择列表
    const backtrack = function (path, deep, visitedx, visitedy) {
        if (path.length === n) {
            //搜索完成一条路径
            res.push([...path])
            return;
        }
        //遍历选择列表
        for (let i = 0; i < n; i++) {
            //主要是斜的方向上
            if (isCant(visited, deep, i)) continue;
            //做选择
            // let index = (deep + 1) * n + i;
            visited[deep][i] = true;
            let strArray = new Array(n).fill('.');
            strArray[i] = 'Q';
            path.push(strArray.join(''))
            //继续DFS
            backtrack(path, deep + 1, visited);
            //撤销选择
            visited[deep][i] = false;
            path.pop();
        }

    }
    backtrack([], 0, visited);
    return res;
};
```
### 优化1
代码
```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    //分析：
    //1.对角线不能放置棋子
    //2.每行每列最多放置一个棋子

    let res = [];
    let visited = [];
    for (let i = 0; i < n; i++) {
        visited.push(new Array(n).fill(false))
    }
    const isCant = function (arr, x, y) {
        for (let i = x; i >= 0; i--) {
            if (arr[i][y]) {
                return true;
            }
        }
        //斜左上，斜右上
        for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i-- , j--) {
            if (arr[i][j]) {
                return true;
            }
        }
        for (let i = x - 1, j = y + 1; i >= 0 && j < n; i-- , j++) {
            if (arr[i][j]) {
                return true;
            }
        }

        return false;
    }
    //路径和选择列表
    const backtrack = function (path, deep, visitedx, visitedy) {
        if (path.length === n) {
            //搜索完成一条路径
            res.push([...path])
            return;
        }
        //遍历选择列表
        for (let i = 0; i < n; i++) {
            //主要是斜的方向上
            if (isCant(visited, deep, i)) continue;
            //做选择
            visited[deep][i] = true;
            let strArray = new Array(n).fill('.');
            strArray[i] = 'Q';
            path.push(strArray.join(''))
            //继续DFS
            backtrack(path, deep + 1, visited);
            //撤销选择
            visited[deep][i] = false;
            path.pop();
        }

    }
    backtrack([], 0, visited);
    return res;
};

```
### 优化2
代码：
```javascript
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  //分析：
  //1.对角线不能放置棋子
  //2.每行每列最多放置一个棋子
  let res = [];
  // let visited = [];
  let path = new Array(n);
  for (let i = 0; i < n; i++) {
    path[i] = new Array(n).fill('.')
  }
  const isCant = function (arr, x, y) {
    for (let i = x; i >= 0; i--) {
      if (arr[i][y] === 'Q') {
        return true;
      }
    }
    //斜左上
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (arr[i][j] === 'Q') {
        return true;
      }
    }
    //斜右上
    for (let i = x - 1, j = y + 1; i >= 0 && j < n; i--, j++) {
      if (arr[i][j] === 'Q') {
        return true;
      }
    }
    return false;
  }
  //路径和选择列表
  const backtrack = function (path, deep) {
    if (deep === n) {
      //搜索完成一条路径
      path = path.map(item => item.join(''))
      res.push([...path])
      return;
    }
    //遍历选择列表
    for (let i = 0; i < n; i++) {
      //主要是斜的方向上
      if (isCant(path, deep, i)) continue;
      //做选择      
      path[deep][i] = 'Q';
      //继续DFS
      backtrack(path, deep + 1);
      //撤销选择
      path[deep][i] = '.';
    }

  }
  backtrack(path, 0);
  return res;
};
```

### N皇后求解决方案数量
利用对角线的特性
代码：
```javascript
 
/**
 * 根据对角线的特性，可以分析出
 * 主对角线：i+j === 常熟
 * 副对角线：i-j === 常熟，为了好记录这里变成一定是正数, i-j + 2n === 正整数常熟
 * 上面处理+2n,是保证每条对角线常熟唯一（不重复）
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let count = 0;
  let res = []; //记录列
  let dales = []; //上坡，主对角线上存有数据状态标记数组
  let hills = []; //斜坡，副对角线标记数组
  let doubleN = 2 * n;
  const isCant = function (res, dales, hills, x, y) {
    return res[y] || dales[x + y] || hills[x - y + doubleN]
  }

  const backtrack = function (path, dales, hills, deep) {
    if (deep === n) {
      count++;
      return;
    }
    for (let i = 0; i < n; i++) {
      if (isCant(path, dales, hills, deep, i)) continue;
      //记录
      path[i] = 1;
      dales[deep + i] = 1;
      hills[deep - i + doubleN] = 1;
      backtrack(path, dales, hills, deep + 1);
      //撤销记录
      path[i] = 0;
      dales[deep + i] = 0;
      hills[deep - i + doubleN] = 0;
    }
  }

  backtrack(res, dales, hills, 0)
  return count;
};
```
