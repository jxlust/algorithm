

class MinHeapCompare {
    constructor(compare) {
        this.heap = [];
        this.compare = (typeof compare === 'function') ? compare : this.defaultCompare
    }

    defaultCompare(a, b) {
        return a < b;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    size() {
        return this.heap.length;
    }
    getParentIndex(index) {
        // index > 0
        return Math.floor((index - 1) / 2);
    }
    getLeftIndex(index) {
        return index * 2 + 1;
    }
    getRightIndex(index) {
        return index * 2 + 2;
    }
    // 新增元素
    insert(v) {
        this.heap.push(v);
        // 上浮维持最小堆
        this.heapifyUp();
    }

    // 获取堆顶元素
    peek() {
        return this.heap[0];
    }
    // 删除堆顶元素
    pop() {
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const res = this.heap[0];
        // 将最后一个元素放到堆顶
        this.heap[0] = this.heap.pop();
        // 下沉维持最小堆
        this.heapifyDown(0);
        return res;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    // 上浮维持最小堆
    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.compare(this.heap[parentIndex], this.heap[index])) break;
            // 交换父子节点
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }
    // 下沉维持最小堆
    heapifyDown(index) {
        while (this.getLeftIndex(index) < this.size()) {
            let minIndex = this.getLeftIndex(index);
            // 取到子节点的最小值来和当前节点比较
            if (minIndex + 1 < this.size() && this.compare(this.heap[minIndex + 1], this.heap[minIndex])) {
                minIndex = minIndex + 1;
            }
            // 和当前节点比较，如果子节点都更大，则结束循环，比当前节点小，则交换            
            // 因为之前最小堆都维护了，所以如果子节点都比当前节点大的话，下面的节点也都会比当前节点大，所以结束循环
            if (!this.compare(this.heap[minIndex], this.heap[index])) break;
            this.swap(index, minIndex);
            // 继续下沉，维持最小堆
            index = minIndex;
        }
    }
    getData() {
        return this.heap
    }
}

/**
 * 
 * @param {*} graph 邻接矩阵
 * @param {*} start 
 */
function dijkstraV1(graph, start) {

    const distance = new Array(graph.length).fill(Infinity);
    const visited = new Set();
    const priorityQueue = new MinHeapCompare((a, b) => a[1] < b[1]);
    console.log(priorityQueue)
    // 起点距离为0
    distance[start] = 0;
    priorityQueue.insert([start, 0]);
    // visited.add(start);

    // 记录最短路径的上一次节点，方便后续计算路径
    const prevPath = new Map();
    prevPath.set(start, null);

    while (!priorityQueue.isEmpty()) {
        // 最小值
        const [node, weight] = priorityQueue.pop();
        if (visited.has(node)) continue;
        visited.add(node);

        const neighbors = graph[node];
        for (let i = 0, len = neighbors.length; i < len; i++) {
            let cur = neighbors[i];
            if (cur === Infinity) continue;

            if (distance[i] > distance[node] + cur) {
                // 更新距离
                distance[i] = distance[node] + cur;
                priorityQueue.insert([i, distance[i]])
                // node -> i 是最短
                prevPath.set(i, node)
            }

        }
    }
    console.log('d:', distance)
    console.log('prevPath:', prevPath)
    return {
        distance,
        prevPath,
    }

}
/**
 * 根据prevMap计算路径
 * @param {*} prevMap 
 * @param {*} start 
 * @param {*} end 
 */
function buildPath(prevMap, start, end) {
    let path = [];
    let cur = end;
    while (cur !== null && cur !== undefined) {
        if (cur === start) {
            path.push(cur);
            break;
        }
        path.push(cur);
        cur = prevMap.get(cur)
    }
    path.reverse()
    //   判断一下第一个是否是开始位置点，如果不是，则没找到路径，返回空数组
    return path[0] !== start ? [] : path;
}

// const MAX = Number.MAX_SAFE_INTEGER;
function test1() {
    // 或者使用邻接矩阵
    // n
    const n = 8;
    const graph = []
    for (let i = 0; i < n; i++) {
        const item = new Array(n).fill(Infinity);
        item[i] = 0;
        graph.push(item);
    }
    console.log(graph);
    graph[0][1] = 2;
    graph[0][2] = 4;
    graph[1][2] = 3;
    graph[1][3] = 5;
    graph[2][4] = 1;
    graph[3][4] = 2;
    graph[3][7] = 6;
    graph[4][7] = 3;
    graph[3][5] = 1;

    const { distance, prevPath } = dijkstraV1(graph, 0)
    const path = buildPath(prevPath, 1, 6)
    console.log('path:', path)

}

test1();
