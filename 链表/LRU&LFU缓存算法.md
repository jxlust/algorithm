## 1. LRU(Least Recently Used)
最近最少使用缓存淘汰算法，思路：

1. 双向链表DoubleLink的数据结构实现，实现addAtFirst、remove、removeLast等方法
2. LRU Cache实现，包括Map,DoubleLink实例map、dblink、容量opacity
3. LRU实现的put(key,val),get(key),remove(key)等方法

算法实现：

DoubleLink:

```javascript

function Node(key, val) {
	this.val = val;
	this.key = key;
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

```
LRUCache:

```javascript

class LRUCache{
	constructor(cap){
		this.capacity = cap;
		this.map = new Map();
		this.dbLink = new DoubleLink();

	}
	put(key,val){

		if(this.map.has(key)){
			let lastNode = this.map.get(key);
			this.dbLink.remove(lastNode);
		}

		if(this.capacity === this.dbLink.size){
			//容量满了，需要删最后一条
			let node = this.dbLink.removeLast();
			if(node){
				this.map.delete(node.key);
			}
		}

		let node = new Node(key,val);
		this.dbLink.addNodeAtFirst(node);
		this.map.set(key,node)

	}
	get(key){
		if(this.map.has(key)){
			let node = this.map.get(key);
			this.dbLink.remove(node);
			let newNode = new Node(key,node.val);
			this.dbLink.addNodeAtFirst(newNode);
			this.map.set(key,newNode);
			return node.val
		}else{
			return -1;
		}
	}
	remove(key){
		if(this.map.has(key)){
			let node = this.map.get(key);
			this.dbLink.remove(node);
			this.map.delete(key);
			return node;
		}else{
			return null;
		}
	}
}
```


## 2. LFU(Least frequently used)
（LFU）最不经常使用缓存算法设计并实现数据结构。
