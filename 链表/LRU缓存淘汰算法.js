//说明 双向链表交互的逻辑
//插入到中间节点：
// a = b 
// c
// c.next = a.next  c.pre = a  a.next.pre = c  a.next = c
// 插入到头节点：
// a c
// a.pre = c
// c.next = a

/**
 * 双向链表结构
 * @param {number} val 
 */
function Node(key, val) {
    this.key = key;
    this.val = val;
    this.pre = this.next = null;
}

class DoubleList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;

    }
    addAtFirst(node) {
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.pre = node;
            node.next = this.head;
            this.head = node;

        }
        this.size++;
    }
    remove(node) {
        // 判断节点是否为头节点或尾节点
        if (node === this.head && node === this.tail) {
            this.head = null;
            this.tail = null;
        } else if (node === this.head) {
            this.head = this.head.next;
            this.head.pre = null;
            //等价于：
            // node.next.pre = null;
            // this.head = node.next;
        } else if (node === this.tail) {
            this.tail = this.tail.pre;
            this.tail.next = null;
        } else {
            //node为中间的节点，删除掉
            // a c b
            node.pre.next = node.next;
            node.next.pre = node.pre;
        }

        this.size--;
    }
    removeLast() {
        let node = this.tail;
        this.remove(node);
        return node;
    }
    get totalSize() {
        return this.size;
    }

}
//最近最少使用
const Cache_Update = Symbol('cache_update');
class LRUCache {
    constructor(capacity) {
        //容量
        this.cap = capacity;
        //hash表 key:int value: node
        this.map = new Map();
        //双向链表实例
        this.dbList = new DoubleList();

    }
    [Cache_Update](key,val){
        let node = new Node(key,val);
        this.dbList.remove(node);
        this.dbList.addAtFirst(node);
        this.map.set(key,node)
    }
    put(key, val) {
        let node = new Node(key, val);
        if (this.map.has(key)) {
            //更新新node
            let oldNode = this.map.get(key);
            this.dbList.remove(oldNode);
            this.dbList.addAtFirst(node);
            this.map.set(key,node);
        } else {
            //新增
            //判断容量
            if (this.dbList.size === this.cap) {
                let node = this.dbList.removeLast();
                //注意：这里不要漏了，链表节点存key val的意义，方便在map中进行删除
                this.map.delete(node.key);
            }
            this.dbList.addAtFirst(node);
            this.map.set(key, node);
        }
    }
    get(key) {
        if (this.map.has(key)) {
            let node = this.map.get(key);
            this.dbList.remove(node);
            this.dbList.addAtFirst(node);
            // this[Cache_Update](key)
            return node.val
        } else {
            return -1;
        }
    }
    remove(key) {
        if (this.map.has(key)) {
            let node = this.map.get(key);
            this.dbList.remove(node);
            this.map.delete(node.key);
        } else {
            return false;
        }
    }
}

let cache = new LRUCache(3);
console.log(cache.get(1));
cache.put(4, 'a');
cache.put(2, 'b');
cache.put(1, 'ccc');
cache.put(3, 'rr');
console.log(cache.get(4));


console.log(cache.dbList);