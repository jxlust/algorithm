/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function (k) {
    this.arr = new Array(k);
    this.head = -1;//队头指针初始化
    this.tail = -1;//队尾指针初始化
    this.size = k;
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
    if (this.isFull()) {
        return false;
    }
    if (this.isEmpty()) {
        this.head = 0;
    }
    this.tail = (this.tail + 1) % this.size;
    this.arr[this.tail] = value;
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
    //先进先出
    if (this.isEmpty()) {
        return false
    }
    if (this.head === this.tail) {
        //就一个有效数据
        this.head = -1;
        this.tail = -1;
        return true;
    }
    this.head = (this.head + 1) % this.size;
    return true;
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
    if (this.isEmpty()) {
        return -1;
    }
    return this.arr[this.head]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
    if (this.isEmpty()) {
        return -1;
    }
    return this.arr[this.tail]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
    return this.head === -1;
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
    return (this.tail + 1) % this.size === this.head
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
