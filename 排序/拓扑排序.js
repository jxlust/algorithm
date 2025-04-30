class Graph {
    constructor() {
        this.nodes = new Map();
    }
    addEdge(from, to) {
        if (!this.nodes.has(from)) {
            this.nodes.set(from, []);
        }
        if (to) {
            this.nodes.get(from).push(to);
        }

    }
    getNodes() {
        return this.nodes
    }
}
/**
 * 节点
 */
class Node {
    value
    next
    constructor(value) {
        this.value = value;
    }
}
/**
 * 链表实现队列，FIFO
 */
class LinkQueue {
    #head
    #tail
    #size
    constructor() {
        this.clear();
    }
    clear() {
        this.#head = undefined;
        this.#tail = undefined;
        this.#size = 0
    }

    get size() {
        return this.#size
    }
    /**
     * 入队列
     * @param {*} value 
     */
    enqueue(value) {
        const node = new Node(value)
        if (this.#head) {
            this.#tail.next = node;
            this.#tail = node;
        } else {
            this.#head = node;
            this.#tail = node;
        }
        this.#size++;
    }
    /**
     * 出队列
     */
    dequeue() {
        const cur = this.#head;
        if (!cur) {
            return
        }
        this.#head = this.#head.next;
        this.#size--;
        return cur.value;
    }
    /**
     * 获取队列头
     */
    peek() {
        // node.js 18
        return this.#head?.value;
    }
    getHead() {
        return this.#head;
    }

    /**
     * 遍历 支持iterator 可以用for in 遍历
     */
    *[Symbol.iterator]() {
        let cur = this.#head;
        while (cur) {
            yield cur.value;
            cur = cur.next;
        }
    }
}



/**
 * Kahn 算法
 */
function TopoSort(graph) {
    const degreeMap = new Map();

    // 统计所有节点的入度
    const nodes = graph.getNodes();
    for (let [key, value] of nodes) {
        if (!degreeMap.has(key)) {
            degreeMap.set(key, 0)
        }
        if (value) {
            for (let v of value) {
                if (degreeMap.has(v)) {
                    degreeMap.set(v, degreeMap.get(v) + 1)
                } else {
                    degreeMap.set(v, 1)
                }
            }
        }
    }
    // console.log(degreeMap)
    const queue = new LinkQueue();
    for (let [key, value] of degreeMap) {
        if (value === 0) {
            queue.enqueue(key)
        }
    }
    console.log(queue.getHead())
    const result = []
    // while(queue.peek()){
    // }
    while (queue.size) {
        const cur = queue.dequeue();
        result.push(cur)

        // 依赖处理了一个，对应下的其他模块需要-1
        for (let v of nodes.get(cur)) {
            degreeMap.set(v, degreeMap.get(v) - 1)
            if (degreeMap.get(v) === 0) {
                queue.enqueue(v)
            }
        }
    }
    console.log(result)
    if (result.length !== degreeMap.size) {
        // 出现环了，result长度就会比实际节点数小
        // 出现环就一定会有依赖永远不为0的节点
        return []
    } else {
        return result;
    }

}


// map对象存储图数据
const graph = new Graph();
// 邻接矩阵
// const graph = []
graph.addEdge('A', 'C')
graph.addEdge('B', 'C')
graph.addEdge('B', 'D')
graph.addEdge('C', 'A')
graph.addEdge('C', 'E')
graph.addEdge('D', 'F')
graph.addEdge('E', 'H')
graph.addEdge('E', 'F')
graph.addEdge('F', 'G')
// 空的也需要添加
graph.addEdge('G')
graph.addEdge('H')

console.log(graph.getNodes())

const result = TopoSort(graph)
console.log(result)




