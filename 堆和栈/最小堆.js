class MinHeap {
    constructor() {
        this.heap = [];
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
            if (this.heap[parentIndex] <= this.heap[index]) break;
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
            if (minIndex + 1 < this.size() && this.heap[minIndex + 1] < this.heap[minIndex]) {
                minIndex = minIndex + 1;
            }
            // 和当前节点比较，如果子节点都更大，则结束循环，比当前节点小，则交换            
            // 因为之前最小堆都维护了，所以如果子节点都比当前节点大的话，下面的节点也都会比当前节点大，所以结束循环
            if (this.heap[minIndex] >= this.heap[index]) break;
            this.swap(index, minIndex);
            // 继续下沉，维持最小堆
            index = minIndex;
        }
    }


}

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


const minHeap = new MinHeapCompare();
const test = [99, 88, 2, 49, 2, 99, 49, 1, 5, 3];
for (let v of test) {
    minHeap.insert(v);
}
console.log(minHeap.getData());
//               1
//       2              49
//   2       3      99      88
//99   5  49

// console.log('pop1:', minHeap.pop())
// console.log(minHeap.getData())
//      2
// 2     49
//5 3  99 88
//99 49

const sortList = []
for (let i = 0, len = test.length; i < len; i++) {
    sortList.push(minHeap.pop())
}
console.log('sortList:', sortList)

/**
 *  优先队列实现
 *  就是在最小堆的基础上，封装了一层
 */
class PriorityQueue {
    constructor(compareFn) {
        this.heap = new Heap(compareFn);
    }
    // 插入新元素
    enqueue(val) {
        this.heap.push(val);
    }

    // 删除并返回优先级最高的元素
    dequeue() {
        return this.heap.pop();
    }

    // 返回优先级最高的元素
    peek() {
        return this.heap.peek();
    }

    // 返回优先队列的大小
    size() {
        return this.heap.size();
    }

    // 检查优先队列是否为空
    isEmpty() {
        return this.heap.isEmpty();
    }
}