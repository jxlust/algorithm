/**
 * 深度优先搜索遍历到陆地1修改成0
 * @param {character[][]} grid 
 * @param {number} x 
 * @param {number} y 
 */
var dfs = function (grid, x, y) {
    let row = grid.length;
    let col = grid[0].length;

    if (x < 0 || y < 0 || x >= row || y >= col || grid[x][y] === '0') {
        return;
    }
    grid[x][y] = '0';
    //周围的都遍历一遍
    dfs(grid,x-1,y);
    dfs(grid,x+1,y);
    dfs(grid,x,y-1);
    dfs(grid,x,y+1);
}
/**
 * 深度优先搜索
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (grid.length === 0 || grid[0].length === 0) {
        return 0;
    }
    let islands = 0;
    let row = grid.length;
    let col = grid[0].length;
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === '1') {
                islands++;
                dfs(grid, i, j);
            }
        }
    }
    return islands;

};

var testData = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '1', '0']
]
console.log(numIslands(testData));