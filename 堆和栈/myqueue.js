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
}
