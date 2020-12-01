/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    const arr = [];
    let cur = head;
    while (cur) {
        arr.push(cur.val);
        cur = cur.next;
    }
    let i = 0,
        j = arr.length - 1;
    while (i < j) {
        if (arr[i] === arr[j]) {
            i++;
            j--;
        } else {
            return false;
        }
    }
    return true;

};

var isPalindrome = function (head) {
    // if(head === null) return ;
    // isPalindrome(head.next);
    // console.log(head.val);//递归的特性是反着打印的结果

    let leftNode = head;
    const helper = function (node) {
        if (node) {
            if (!helper(node.next)) return false; //如果false 直接返回false
            if (node.val !== leftNode.val) {
                return false;
            }
            leftNode = leftNode.next;
        }
        return true;
    }
    return helper(head)
}

var isPalindrome = function (head) {
    const reverse = function (node) {
        // if (node === null || node.next === null) return node;
        // let cur = reverse(node.next);
        // node.next.next = node;
        // node.next = null;
        // return cur;
        let cur = null,
            nextNode = node;
        while (nextNode) {
            let nx = nextNode.next;
            nextNode.next = cur;
            cur = nextNode;
            nextNode = nx;
        }
        return cur;
    }
    //我们可以将链表的后半部分反转（修改链表结构），然后将前半部分和后半部分进行比较。
    //比较完成后我们应该将链表恢复原样。虽然不需要恢复也能通过测试用例，但是使用该函数的人通常不希望链表结构被更改。
    //该方法虽然可以将空间复杂度降到O(1)，但是在并发环境下，该方法也有缺点。在并发环境下，函数运行时需要锁定其他线程或进程对链表的访问，因为在函数执行过程中链表会被修改。
    if (head === null || head.next === null) return true;
    //快慢指针找到中间节点
    let slow = head;
    let fast = head.next.next;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }
    //fast到尾节点了
    //slow即为半节点
    //反转slow.next
    let halfNode = slow;
    let revNode = reverse(slow.next);
    let p1 = head;
    let p2 = revNode;
    while (p2) {
        if (p2.val !== p1.val) {
            return false;
        }
        p2 = p2.next;
        p1 = p1.next;
    }

    //把链表反转回去
    halfNode.next = reverse(revNode)

    return true;

}