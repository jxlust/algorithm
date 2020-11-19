/**
 * 广度优先搜索
 * 为了求出岛屿的数量，我们可以扫描整个二维网格。如果一个位置为 111，则将其加入队列，开始进行广度优先搜索。
 * 在广度优先搜索的过程中，每个搜索到的 111 都会被重新标记为 000。直到队列为空，搜索结束。
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands2 = function(grid) {
    if (grid.length === 0 || grid[0].length === 0) {
       return 0;
   }
   let col = grid[0].length; //列
   let row = grid.length; //行
   var lands = 0;
   for (let i = 0; i < row; i++) {
       for (let j = 0; j < col; j++) {
           if (grid[i][j] === '1') {
               lands++;
               let queues = [];
               grid[i][j] = '0';
               queues.push({
                   i:i,
                   j:j
               });
               while (queues.length) {
                   let f = queues.shift();
                   //然后从上下左右存在1的值修改为0
                   // let x = parseInt(f / col);
                   // let y = f % col;
                   let x = f.i;
                   let y = f.j;

                   if (x - 1 >= 0 && grid[x - 1][y] === '1') {
                       queues.push({
                           i: x-1,
                           j: y
                       })
                       grid[x - 1][y] = '0';
                   }

                   if (x + 1 < row && grid[x + 1][y] === '1') {
                       queues.push({
                           i: x+1,
                           j: y
                       });
                       grid[x + 1][y] = '0';
                   }
                   if (y - 1 >= 0 && grid[x][y - 1] === '1') {
                       queues.push({
                           i: x,
                           j: y-1
                       });
                       grid[x][y - 1] = '0';
                   }
                   if (y + 1 < col && grid[x][y + 1] === '1') {
                       queues.push({
                           i:x,
                           j: y+1
                       });
                       grid[x][y + 1] = '0';
                   }


               }
           }
       }
   
   }
   return lands;
};

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (grid.length === 0 || grid[0].length === 0) {
        return 0;
    }
    let col = grid[0].length; //列
    let row = grid.length; //行
    var lands = 0;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1') {
                lands++;
                let queues = [];
                grid[i][j] = '0';
                queues.push(col * i + j);
                while (queues.length) {
                    let f = queues.shift();
                    //然后从上下左右存在1的值修改为0
                    let x = parseInt(f / col);
                    let y = f % col;

                    if (x - 1 >= 0 && grid[x - 1][y] === '1') {
                        queues.push((x - 1) * col + y);
                        grid[x - 1][y] = '0';
                    }

                    if (x + 1 < row && grid[x + 1][y] === '1') {
                        queues.push((x + 1) * col + y);
                        grid[x + 1][y] = '0';
                    }
                    if (y - 1 >= 0 && grid[x][y - 1] === '1') {
                        queues.push(x * col + y - 1);
                        grid[x][y - 1] = '0';
                    }
                    if (y + 1 < col && grid[x][y + 1] === '1') {
                        queues.push(x * col + y + 1);
                        grid[x][y + 1] = '0';
                    }


                }
            }
        }
    
    }
    return lands;
};
var testData = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
]
console.log(numIslands(testData));


