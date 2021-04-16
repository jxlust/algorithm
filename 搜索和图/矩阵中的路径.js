

/**
 * 矩阵中的路径
 * @param board 
 * @param word 
 * @returns boolean
 */
const isHavePath = function (board, word) {
	if (word.length === 0) return true;
	if (board.length === 0) return false;

	let m = board.length;
	let n = board[0].length;

	let visited = [];

	const dfs = function (i, j, k) {
		let pos = i * n + j;
		if (visited[pos]) return false;
		if (i >= m || i < 0 || j >= n || j < 0 || word[k] !== board[i][j]) return false;
		if (k === word.length - 1) return true;

		visited[pos] = true;
		let ret = dfs(i + 1, j, k + 1) || dfs(i, j + 1, k + 1) || dfs(i - 1, j, k + 1) || dfs(i, j - 1, k + 1);
		visited[pos] = false;
		return ret;

	}


	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			//定义起点i,j
			let ret = dfs(i, j, 0);
			if (ret) return true;
		}
	}

	return false;
}


/**
 * 矩阵中的路径
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
	if (word.length === 0) return true;
	if (board.length === 0) return false;

	let m = board.length;
	let n = board[0].length;


	const dfs = function (i, j, k) {
		if (i >= m || i < 0 || j >= n || j < 0 || word[k] !== board[i][j]) return false;
		if (k === word.length - 1) return true;

		board[i][j] = '#';//访问过的记录为特殊字符
		// 回溯
		let ret = dfs(i + 1, j, k + 1) || dfs(i, j + 1, k + 1) || dfs(i - 1, j, k + 1) || dfs(i, j - 1, k + 1);
		board[i][j] = word[k];//回溯的，撤销选择
		return ret;

	}

	for (let i = 0; i < m; i++) {
		for (let j = 0; j < n; j++) {
			//定义起点i,j
			let ret = dfs(i, j, 0);
			if (ret) return true;
		}
	}

	return false;
};
