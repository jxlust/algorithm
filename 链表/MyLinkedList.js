class Node {
    val;
    next;
    constructor(val) {
        this.val = val;
    }
}

class LinkList {
    // 私有属性
    #head;
    #tail;
    #size;
    constructor() {
        this.clear();
    }

    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }
    addAtTail(val) {
        const node = new Node(val)
        if (this.#head) {
            this.#tail.next = node;
            this.#tail = node;
        } else {
            this.#head = node;
            this.#tail = node;
        }
        this.#size++;
    }
    addAtHead(val) {
        const node = new Node(val)
        if (this.#head) {
            node.next = this.#head;
            this.#head = node;
        } else {
            this.#head = node;
            this.#tail = node;
        }
        this.#size++;
    }
    addAtIndex(index, val) {
        if (index > this.#size) {
            index = this.#size
        }
        if (index < 0) {
            index = 0;
        }
        if (index === 0) {
            this.addAtHead(val)
        } else if (index === this.#size) {
            this.addAtTail(val)
        } else {
            const node = new Node(val)
            if (this.#head) {
                let cur = this.#head;
                for (let i = 0; i < index - 1; ++i) {
                    cur = cur.next;
                }
                node.next = cur.next;
                cur.next = node;
            } else {
                this.#head = node;
                this.#tail = node;
            }
            this.#size++;
        }

    }
    head() {
        if (!this.#head) {
            return
        }
        return this.#head.val;
    }
    tail() {
        if (!this.#tail) {
            return
        }
        return this.#tail.val;
    }
    pop() {
        // 不是双向链表，这里就得遍历找出倒数第二个设置为tail
        if (!this.#head) {
            return;
        }
        const endIndex = this.#size - 1;
        let cur = this.#head;
        if (endIndex > 0) {
            for (let i = 0; i < endIndex - 1; ++i) {
                cur = cur.next;
            }
            const v = cur.next.val;
            cur.next = null;
            this.#tail = cur;
            this.#size--;
            return v;
        } else {
            const v = cur.val;
            this.clear();
            this.#size--;
            return v;
        }
    }
    shift() {
        const cur = this.#head;
        if (!cur) {
            return;
        }
        this.#head = this.#head.next;
        this.#size--;
        return cur.val;
    }
    get size() {
        return this.#size
    }

    [Symbol.iterator]() {
        let cur = this.#head;
        function next() {
            if (cur) {
                const v = cur.val;
                cur = cur.next;
                return {
                    done: false, value: v
                }
            }
            return {
                done: true
            }
        }
        return {
            next
        }
    }
}

function test() {
    const linklist = new LinkList();

    linklist.addAtTail(1)
    linklist.addAtTail(2)
    linklist.addAtTail(3)
    linklist.addAtHead(99)
    linklist.addAtHead(98)

    linklist.addAtIndex(3, 'add in 3');
    for (let item of linklist) {
        console.log('item:', item)
    }
}

test();
