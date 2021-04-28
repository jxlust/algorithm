/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
 var sortedListToBST = function(head) {
	if(head === null){
		return null;
	}
	if(head.next === null){
		return new TreeNode(head.val)
	}

	let p1 = head,
	p2 = head.next.next;
	while(p2 && p2.next){
		p1 = p1.next;
		p2 = p2.next.next;
	}
	//a -> b -> c - d
						//p1		
	//a -> b -> c -> d -> e
	//          p1        p2
	//p1是mid的前一个点
	let mid = p1.next;
	p1.next = null;
	let left = head;
	let right = mid.next;
	// console.log('left,right:',JSON.stringify(left),JSON.stringify(right));
	let root = new TreeNode(mid.val);
	root.left = sortedListToBST(left);
	root.right = sortedListToBST(right);

	return root;
};