//思路：
//1. 每一步利用path存一下节点的深度
//2. bfs后，通过path递归获取路径，或者利用栈，出栈，同一深度的第一个值即为路径上的点
function bfsFindPath(node, target) {
    let visited = new Set();
    let queue = [];
    node.step = 1;
    queue.push(node);
    let path = [];
    let currentNode = null;
    while (queue.length) {
        // let size = queue
        let current = queue.shift();
        visited.add(current.val);
        path.push({
            val: current.val,
            step: current.step
        })
        if (current.val === target) {
            //跳出循环
            currentNode = current;
            break;
        }
        if (current && current.node) {
            for (let c of current.node) {
                if (!visited.has(c.val)) {
                    c.step = current.step + 1;
                    c.pre = current;
                    queue.push(c);
                    visited.add(c.val)
                }
            }
        }

    }
    console.log('path:',path);
    console.log('currentNode:',currentNode);
    let myPath = [];
    while(currentNode){
        myPath.unshift(currentNode.val);
        currentNode = currentNode.pre;
    }
    console.log('myPath:',myPath);
   
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
            val: 'G',
            node: [{
                val: 'H',
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

bfsFindPath(testNode, 'G')