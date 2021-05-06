/**
 * 最小生成树，加点法prim算法
 * @param {number[][]} matrix 邻接矩阵 
 * @param {number} n 
 */
function prim(matrix, n) {
	let min;
	let adjvex = []; //保存相关顶点下标
	let lowcost = new Array(n); //保存相关顶点间边的权值
	let result = 0; //权重

	//默认选择第一个点开始
	adjvex[0] = [0];
	lowcost[0] = 0;

	for (let i = 1; i < n; i++) {
		lowcost[i] = matrix[0][i];
	}
	console.log(lowcost);


	for (let i = 1; i < n; i++) {

		min = Infinity;
		//查找lowcost里面的最小值，除了0之外的，因为0这里标记为已选了的点
		let j = 1,
			minIndex = 0;
		while (j < n) {
			if (lowcost[j] !== 0 && lowcost[j] < min) {
				min = lowcost[j];
				minIndex = j;
			}
			j++;
		}

		//找到了minIndex最小，加入到树里面
		lowcost[minIndex] = 0;

		if (minIndex !== 0) {
			adjvex.push(minIndex);
			result += min;
		}

		//加入新的点后，更新lowcost对应的边最小权重值
		for (let i = 1; i < n; i++) {
			if (lowcost[i] !== 0 && matrix[minIndex][i] < lowcost[i]) {
				lowcost[i] = matrix[minIndex][i]; //更新为最小值
			}
		}

	}

	console.log(result, adjvex);


	return result;
}

const Max = Infinity;
const G = [
	[0, 1, 5, 2, Max, Max],
	[1, 0, 3, Max, 7, Max],
	[5, 3, 0, Max, Max, 6],
	[2, Max, Max, 0, Max, 8],
	[Max, 7, Max, Max, 0, 4],
	[Max, Max, 6, 8, 4, 0]
]


prim(G, G.length)