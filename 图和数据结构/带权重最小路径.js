function dijkstra(graph, start) {
    const distances = {};
    const previous = {};
    const priorityQueue = [];

    // 初始化距离和前驱节点
    for (const node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    priorityQueue.push({ node: start, distance: 0 });

    while (priorityQueue.length > 0) {
        // 从队列中取出当前距离最小的节点
        const { node: current, distance: currentDistance } = dequeueMin(priorityQueue);

        // 如果当前距离大于已记录的最短距离，跳过处理
        if (currentDistance > distances[current]) continue;

        // 遍历当前节点的所有邻居
        for (const neighbor of graph[current]) {
            const alt = currentDistance + neighbor.weight;
            if (alt < distances[neighbor.node]) {
                // 更新距离和前驱节点
                distances[neighbor.node] = alt;
                previous[neighbor.node] = current;
                // 将邻居节点加入队列
                enqueue(priorityQueue, { node: neighbor.node, distance: alt });
            }
        }
    }

    return { distances, previous };
}

// 从队列中取出距离最小的节点
function dequeueMin(queue) {
    let minIndex = 0;
    for (let i = 1; i < queue.length; i++) {
        if (queue[i].distance < queue[minIndex].distance) {
            minIndex = i;
        }
    }
    return queue.splice(minIndex, 1)[0];
}

// 将节点加入队列（此处未排序，由dequeueMin查找最小）
function enqueue(queue, node) {
    // TODO 可以利用最小堆栈优化dequeueMin取值
    queue.push(node);
}

// 示例用法
const graph = {
    'A': [{ node: 'B', weight: 4 }, { node: 'C', weight: 2 }],
    'B': [{ node: 'E', weight: 3 }],
    'C': [{ node: 'D', weight: 2 }, { node: 'F', weight: 4 }],
    'D': [{ node: 'E', weight: 3 }, { node: 'F', weight: 1 }],
    'E': [{ node: 'F', weight: 1 }],
    'F': []
};

const { distances, previous } = dijkstra(graph, 'A');
console.log('Distances:', distances);
console.log('Previous nodes:', previous);

// 可选：根据previous对象构建路径
function getPath(previous, start, end) {
    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    return path[0] === start ? path : [];
}

console.log('Path from A to E:', getPath(previous, 'A', 'E')); // 输出: ['A', ‘B’,'E']