/**
 * 当我们递归地实现 DFS 时，似乎不需要使用任何栈。
 * 但实际上，我们使用的是由系统提供的隐式栈，也称为调用栈（Call Stack）。
 * @param {node} cur 
 * @param {string} target 
 * @param {string[]} visited 
 */
const DFS = function (cur, target, visited) {
    if (cur.val === target) {
        return true;
    }
    if (cur.node) {
        for (let o of cur.node) {
            if (!visited[o.val]) {
                visited[o.val] = true;
                if (DFS(o, target, visited)) {
                    return true;
                }
            }
        }
    }
    return false;
}
/**
 * 显式栈实现
 * @param {*} data 
 * @param {*} target 
 */
const DFS2 = function (data,target) {
    let visited = [];
    let stack = [];
    stack.push(data);
    while(stack.length){
        //不为空
        let cur = stack[0];//
        if(cur.val === target){
            return true;
        }
        for(let n of cur.node){
            if(!visited[n.val]){
                visited[n.val] = true;
                stack.push(n);
            }
        }
        stack.pop();
    }
    return false;
}


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
console.log(DFS(testNode, 'O', []));