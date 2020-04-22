const Node = function (val, node) {
    this.val = val;
    this.node = node;
}

let testNode = {
    val: 'A',
    node: [{
        val: 'B',
        node: [{
            val: 'E',
            node: null
        }]
    }, {
        val: 'C',
        node: [{
            val: 'F',
            node: [{
                val: 'G',
                node: null
            }]
        }]
    }, {
        val: 'D',
        node: [{
            val: 'G',
            node: null
        }]
    }]
}

const BFS = function (node, target) {
    let queue = [];
    let step = 0;
    let size = 0;
    queue.push(node);
    while (queue.length) {
        //不为空
        step += 1;
        size = queue.length;
        for (let i = 0; i < size; i++) {
            if (queue[i].val === target) {
                // console.log(queue);
                return step;
            }
            let nextNodes = queue[i].node;
            if (nextNodes) {
                for (let v of nextNodes) {
                    queue.push(v);
                }
            }
            queue.shift(); //第一个弹出，先进先出
        }

    }
    return -1;
}
console.log(BFS(testNode, 'G'));

const BFS_SET = function (node, target) {
    let queue = [];
    let used = {};
    let step = 0;
    let size = 0;
    queue.push(node);
    used[node.val] = true;
    while (queue.length) {
        //不为空
        step += 1;
        size = queue.length;
        for (let i = 0; i < size; i++) {
            if (queue[i].val === target) {
                console.log(queue);
                return step;
            }
            let nextNodes = queue[i].node;
            if (nextNodes) {
                for (let v of nextNodes) {
                    if (!used[v.val]) {
                        queue.push(v);
                        used[v.val] = true;
                    }

                }
            }
            queue.shift(); //第一个弹出，先进先出
        }

    }
    return -1;
}

console.log(BFS_SET(testNode, 'G'));