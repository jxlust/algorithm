var quickSort = function (arr, left = 0, right = arr.length - 1) {
    if (right <= left) {
        return;
    }
    let i = left;
    let j = right;
    let key = arr[i];

    while (i < j) {
        while (i < j && arr[j] >= key) {
            j--;
        }
        arr[i] = arr[j];
        while (i < j && arr[i] <= key) {
            i++
        }
        arr[j] = arr[i];
    }
    arr[i] = key;
    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right);

}
quickSort([23, 45, 2, 34, 45, 99, 32, 2])
var merge = function (nums1, m, nums2, n) {
    // for (let i = m, j = 0; j < n; j++, i++) {
    //     nums1[i] = nums2[j];
    // }
    // quickSort(nums1)

    nums1.splice(m,n,...nums2);
    nums1.sort( (v1,v2) => v1 - v2 );
};

/**
 * 标准归并思路
 * 归并的思想，倒着来，需要辅助数组，空间复杂度O(n),时间复杂度O(m+n)
 * @param {*} nums1 
 * @param {*} m 
 * @param {*} nums2 
 * @param {*} n 
 */
var merge = function (nums1, m, nums2, n) {
    let temp = [];
    for (let i = 0; i < m; i++) {
        temp[i] = nums1[i];
    }
    //temp,nums2归并到nums1中
    let i = 0,
        j = 0;
    // let k = 0;
    // while(i < m && j < n){
    //     if(temp[i] < nums2[j]){
    //         nums1[k++] = temp[i++];
    //     }else{
    //         nums1[k++] = nums2[j++]
    //     }
    // }
    // while(i < m){
    //     nums1[k++] = temp[i++];
    // }
    // while(j < n){
    //     nums1[k++] = nums2[j++];
    // }
    //归并写法二
    for (let k = 0; k < n + m; k++) {
        if (i >= m) {
            nums1[k] = nums2[j++];
        } else if (j >= n) {
            nums1[k] = temp[i++];
        } else if (temp[i] < nums2[j]) {
            nums1[k] = temp[i++];
        } else {
            nums1[k] = nums2[j++];
        }
    }

};

/**
 * 双指针,倒着来，空间复杂度O(1)
 * @param {*} nums1 
 * @param {*} m 
 * @param {*} nums2 
 * @param {*} n 
 */
var merge = function (nums1, m, nums2, n) {
    let i = m - 1;
    let j = n - 1;
    //哨兵p指着存放的位置
    let p = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            // i--;
            nums1[p--] = nums1[i--];
        } else {
            nums1[p--] = nums2[j--];
        }
    }
    // 关键点，指针j可能没有遍历完，所以nums2可能还剩余元素
    while(j >= 0 ){
        nums1[p--] = nums2[j--];
    }
    console.log(nums1);
    //i或者j遍历完
};
merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
merge([2,0], 1, [1], 1);