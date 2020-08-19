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
