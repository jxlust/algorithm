/**
 * @return string
 * @param {number} val
 * @param {Node[]} children
 */
function Node(val, children) {
    this.val = val;
    this.children = children;
}

function serialize(root) {
    if (!root) return '';
    let str = '';
    let s = new String();

    str += root.val;
    if (!root.children || root.children.length === 0) {
        return str;
    }
    str += '['
    for (let child of root.children) {
        str += serialize(child);
        str += ','
    }
    str = str.substr(0, str.length - 1);
    str += ']';

    return str;
}

function splitStringData(str) {
    // str.split(',')
    if (str[str.length - 1] === ']') {
        str = str.substr(0, str.length - 1);
    }
    let arr = str.split(',')
    console.log(arr);
    return arr;
}

function deserialize(string) {
    if (!string.length) {
        return null;
    }
    let nIndex = string.indexOf('[');
    if (nIndex === -1) {
        return new Node(+string, null)
        // return new Node(+string,[])
    }
    //8[9,10[88]]
    let val = string.substring(0, nIndex);
    let root = new Node(+val, []);
    let remainStr = string.substring(nIndex + 1, string.length)
    let splitData = splitStringData(remainStr); //继续划分成一块一块

    for (let str of splitData) {
        root.children.push(deserialize(str))
    }

    return root;
}


const node = {
    val: 8,
    children: [{
            val: 9,
            children: []
        }, {
            val: 10,
            children: [{
                val: 88,
                children: [{
                    val: 77,
                    children: []
                }]
            }]
        },
        {
            val: 91,
            children: []
        }
    ]
}
console.log(serialize(node));
let nodestr = serialize(node)
console.dir(JSON.stringify(deserialize(nodestr)));