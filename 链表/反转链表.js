var reverseList = function (head) {
    let cur = null,nexted = head;
    while (nexted) {
        let nx = nexted.next;
        nexted.next = cur;
        cur = nexted;
        nexted = nx;

    }
    return cur;
};


var reverseList = function (head) {
     if(head === null || head.next === null){
        return head;
     }
    let cur =  reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return cur;
};