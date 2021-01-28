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

const Head_Key = Symbol('head_key');
const Tail_Key = Symbol('tail_key');

/**
 * 利用哨兵节点，优化和方便删除操作处理
 */
class DoubleList {
    constructor() {
        this.size = 0;
        //初始化，设置哨兵节点，方便删除操作
        //头尾节点是不能删除和修改的
        this.head = new Node(Head_Key, -1);
        this.tail = new Node(Tail_Key, -1);
        this.head.next = this.tail;
        this.tail.pre = this.head;

    }
    addAtFirst(node) {
        node.next = this.head.next;
        node.pre = this.head;
        this.head.next.pre = node;
        this.head.next = node;
        this.size++;
    }
    remove(node) {
        //node为中间的节点，删除掉
        // a c b
        node.pre.next = node.next;
        node.next.pre = node.pre;
        this.size--;
    }
    removeLast() {
        let node = this.tail.pre;
        if (node === this.head || node.pre === null) return null;
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

    [Cache_Update](key, val) {
        let node = new Node(key, val);
        this.dbList.remove(node);
        this.dbList.addAtFirst(node);
        this.map.set(key, node)
    }

    put(key, val) {
        let node = new Node(key, val);
        if (this.map.has(key)) {
            //更新新node
            let oldNode = this.map.get(key);
            this.dbList.remove(oldNode);
            this.dbList.addAtFirst(node);
            this.map.set(key, node);
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
            // this.put(key,node.val);
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

const cache = new LRUCache(2);
cache.put(2, 1);
cache.put(2, 2);
// console.log(cache.get(2));
// ["LRUCache","put","put","get","put","put","get"]
// [[2],[2,1],[2,2],[2],[1,1],[4,1],[2]]