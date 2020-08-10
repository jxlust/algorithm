
/**一开始想到的
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    let sqr = ~~Math.sqrt(n);
    let neighbor = [];
    let queue = [0];
    let visited = new Set(queue);
    for (let i = 1; i <= sqr; i++) {
        neighbor.push(i * i);
    }
    let count = 0;
    let res = 0;
    while (queue.length) {
        for (let i = queue.length - 1; i >= 0; i--) {
            let cur = queue.shift();
            if (cur > n) {
                continue;
            }
            if (cur === n) {
                return count;
            }
            for (let v of neighbor) {
                let ret = cur + v;
                if (!visited.has(ret)) {
                    queue.push(cur + v);
                    visited.add(cur + v);
                }
            }
        }
        count++;
    }
    return count;

};

/**
是用set 优化了效率
* @param {number} n
* @return {number}
*/
var numSquares = function (n) {
    // let sqr = ~~Math.sqrt(n);
    let neighbor = [];
    let queue = new Set([0]) //使用set消除重复，优化效率
    for (let i = 1; i * i <= n; i++) {
        neighbor.push(i * i);//注意这里是从小到大
    }
    let count = 0;
    while (queue.size) {
        let nextSet = new Set();
        count++;
        for (let v of queue) {
            for (let c of neighbor) {
                let add = v + c;
                if (add === n) {
                    return count;
                }
                if (add > n) {
                    //后面都是更大的了
                    break;
                }
                nextSet.add(add);
            }
        }
        queue = nextSet;
    }
    return count;

};
