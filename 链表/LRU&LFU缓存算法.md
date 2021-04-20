## 1. LRU(Least Recently Used)

最近最少使用缓存淘汰算法，思路：

1. 双向链表 DoubleLink 的数据结构实现，实现 addAtFirst、remove、removeLast 等方法
2. LRU Cache 实现，包括 Map,DoubleLink 实例 map、dblink、容量 opacity
3. LRU 实现的 put(key,val),get(key),remove(key)等方法

算法实现：

DoubleLink:

```javascript
function Node(key, val) {
  this.val = val
  this.key = key
  this.pre = this.next = null
}

const HEAD_KEY = Symbol('head_key')
const TAIL_KEY = Symbol('tail_key')

class DoubleLink {
  constructor() {
    this.size = 0
    this.head = new Node(HEAD_KEY, -1)
    this.tail = new Node(TAIL_KEY, -1)
    this.head.next = this.tail
    this.tail.pre = this.head
  }

  remove(node) {
    node.pre.next = node.next
    node.next.pre = node.pre
    this.size--
  }

  removeLast() {
    let lastNode = this.tail.pre
    if (lastNode === this.head || lastNode === null) return null
    this.remove(lastNode)
    return lastNode
  }

  addNodeAtFirst(node) {
    //Tips: 顺序不要搞错了
    node.next = this.head.next
    node.pre = this.head
    this.head.next.pre = node
    this.head.next = node
    this.size++
  }
}
```

LRUCache:

```javascript
class LRUCache {
  constructor(cap) {
    this.capacity = cap
    this.map = new Map()
    this.dbLink = new DoubleLink()
  }
  put(key, val) {
    if (this.map.has(key)) {
      let lastNode = this.map.get(key)
      this.dbLink.remove(lastNode)
    }

    if (this.capacity === this.dbLink.size) {
      //容量满了，需要删最后一条
      let node = this.dbLink.removeLast()
      if (node) {
        this.map.delete(node.key)
      }
    }

    let node = new Node(key, val)
    this.dbLink.addNodeAtFirst(node)
    this.map.set(key, node)
  }
  get(key) {
    if (this.map.has(key)) {
      let node = this.map.get(key)
      this.dbLink.remove(node)
      let newNode = new Node(key, node.val)
      this.dbLink.addNodeAtFirst(newNode)
      this.map.set(key, newNode)
      return node.val
    } else {
      return -1
    }
  }
  remove(key) {
    if (this.map.has(key)) {
      let node = this.map.get(key)
      this.dbLink.remove(node)
      this.map.delete(key)
      return node
    } else {
      return null
    }
  }
}
```

## 2. LFU(Least frequently used)

（LFU）最不经常使用缓存算法设计并实现数据结构。


```javascript

function Node(key, val) {
	this.val = val;
	this.key = key;
	this.freq = 1; //默认频率1
	this.pre = this.next = null;
}

const HEAD_KEY = Symbol('head_key');
const TAIL_KEY = Symbol('tail_key');

class DoubleLink {
	constructor() {
		this.size = 0;
		this.head = new Node(HEAD_KEY, -1);
		this.tail = new Node(TAIL_KEY, -1);
		this.head.next = this.tail;
		this.tail.pre = this.head;
	}

	remove(node) {
		node.pre.next = node.next;
		node.next.pre = node.pre;
		this.size--;
	}

	removeLast() {
		let lastNode = this.tail.pre;
		if (lastNode === this.head || lastNode === null) return null;
		this.remove(lastNode)
		return lastNode;
	}

	addNodeAtFirst(node) {
		//Tips: 顺序不要搞错了
		node.next = this.head.next;
		node.pre = this.head;
		this.head.next.pre = node;
		this.head.next = node;
		this.size++;
	}

}

//最近最不经常使用
class LFUCache {
	constructor(cap) {
		this.capacity = cap;
		this.keyMap = new Map(); //key(关键字) - Node(节点)
		this.freqMap = new Map(); //freq(频率) - DoubleLink(链表)
		this.minFreq = 0;

	}

	get(key) {
		if (this.keyMap.has(key)) {
			let node = this.keyMap.get(key);
			//更新对应map
			this.updated(node);
			return node.val
		} else {
			return -1;
		}

	}

	updated(node) {
		let key = node.key;
		let freq = node.freq;
		let dblink = this.freqMap.get(freq);
		dblink.remove(node);

		//Tips: 这里如果是存最小频率的链表map清空了，最小minFreq就要 + 1
		if (this.minFreq === freq && dblink.head.next === dblink.tail) {
			this.minFreq++;
		}
		node.freq++;
		this.keyMap.set(key, node);

		let link = this.freqMap.get(freq + 1);
		if (!link) {
			link = new DoubleLink();
			//link为引用，存入map
			this.freqMap.set(freq + 1, link);
		}
		link.addNodeAtFirst(node);
		// this.freqMap.set(freq + 1, link);
	}

	put(key, val) {
		if (this.capacity === 0) return;

		if (this.keyMap.has(key)) {
			//TODO key已存在 删除 更新
			let node = this.keyMap.get(key);
			node.val = val;
			this.updated(node);

		} else {
			if (this.capacity === this.keyMap.size) {
				//满容量了
				//TODO: 删除minFreq对应的node,同步更新两个map里的数据
				let link = this.freqMap.get(this.minFreq);
				let node = link.tail.pre;
				let key = node.key;

				link.remove(node);
				this.keyMap.delete(key);
				// if(link.head.next === link.tail){
				// 	this.minFreq++;
				// }

			}

			//新的
			let newNode = new Node(key, val);
			this.minFreq = 1;

			this.keyMap.set(key, newNode);

			let link = this.freqMap.get(1);
			if (!link) {
				link = new DoubleLink();
				this.freqMap.set(1, link);
			}
			link.addNodeAtFirst(newNode)

		}


	}


	remove(key) {
		if (this.keyMap.has(key)) {
			let node = this.keyMap.get(key);
			this.keyMap.delete(key);

			let freq = node.freq;
			let link = this.freqMap.get(freq);
			link.remove(node);

			//Tips: 这里如果是存最小频率的链表map清空了，最小minFreq就要 + 1
			if (this.minFreq === freq && link.head.next === link.tail) {
				this.minFreq++;
			}
			
			return node
		} else {
			return null;
		}

	}
}


let cache = new LFUCache(2);
cache.put(3, 1)
cache.put(2, 1)
cache.put(2, 2)
console.log(cache.get(2));
// ["LFUCache","put","put","put","put","get"]
// [[2],[3,1],[2,1],[2,2],[4,4],[2]]

```

