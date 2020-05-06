var swapPairs = function(head) {
    if(head === null || head.next === null){
        return head;
    }
    let n = head.next;
    head.next = n.next;
    n.next = head;
    let c = swapPairs(n.next.next);
    n.next.next = c;
    return n;
};


var swapPairs = function(head) {
    if(head === null || head.next === null){
        return head;
    }
    let n = head.next;
    head.next = swapPairs(n.next);
    n.next = head;
    return n;
};