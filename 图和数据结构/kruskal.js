// function find2(parent, index) {
// 	while (parent[index] !== index) {
// 		parent[index] = find2(parent,index);
// 	}
// 	return parent[index];
// }


// 并查集查看是否连通了
function find(parent, index) {
	while (parent[index] !== index) {
		index = parent[index];
	}
	return index;
}
//抽象 边 对象
function Edge(b, e, w) {
	this.begin = b; //边的起点
	this.end = e; //边的终点
	this.wight = w; //边的权值
}

//生成边集
function createGraph(G, n) {
	let array = [];
	for (let i = 0; i < n; i++) {
		for (let j = i + 1; j < n; j++) {
			if (G[i][j] < Infinity) {
				let e = new Edge(i, j, G[i][j])
				array.push(e);
			}
		}
	}
	return array;
}


function Kruskal(G) {
	let n = G.length;
	let lists = createGraph(G, n);
	//排序
	lists.sort((v1, v2) => v1.wight - v2.wight);

	let path = [];

	let parent = []; //存放最小生成树的顶点，利用图的并查集判断是否出现环了
	for (let i = 0; i < n; i++) {
		parent[i] = i;
	}
	let result = 0;
	for (let j = 0; j < lists.length; j++) {
		let {
			begin,
			end,
			wight
		} = lists[j];
		let p1 = find(parent, begin);
		let p2 = find(parent, end);
		//如果是两颗不同的树，则合并
		if (p1 !== p2) {
			//合并，这里都是并查集思路
			parent[p2] = p1;
			result += wight;
			console.log('打印：', begin, end, wight);
			path.push(begin + '-' + end)
		}
	}
	console.log(parent);

	console.log(result);
	return path;
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

console.log(Kruskal(G));