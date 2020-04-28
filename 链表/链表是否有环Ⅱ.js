var detectCycle = function(head) {
    let fast = head,slow = head;
    while(fast && fast.next){
        fast = fast.next.next;
        slow = slow.next;
        if(fast === slow){
            //存在环
            // fast = fast.next;
            slow = head;
            while(fast !== slow){
                slow = slow.next;
                fast = fast.next;
            }
            // fast == slow在环的开始节点相遇
            return fast;
        }
    }
    return null;
}
//Floyd 算法
// 非环部分的长度与相遇点到环起点那部分环之间为何是相等的这个数学关系。这里我就补充下为何他们是相等的。
// 假设非环部分的长度是x，从环起点到相遇点的长度是y。环的长度是c。
// 现在走的慢的那个指针走过的长度肯定是x+n1*c+y，走的快的那个指针的速度是走的慢的那个指针速度的两倍。这意味着走的快的那个指针走的长度是2(x+n1*c+y)。
// 还有一个约束就是走的快的那个指针比走的慢的那个指针多走的路程一定是环长度的整数倍。根据上面那个式子可以知道2(x+n1*c+y)-x+n1*c+y=x+n1*c+y=n2*c。