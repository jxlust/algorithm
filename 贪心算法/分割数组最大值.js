/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
var splitArray = function(nums, m) {
    let left = 0,right = 0;
    for(let v of nums){
        left = v > left ? v: left;
        right += v;
    }
    while(left < right){
        let mid = (left + right) >>> 1;
        
        let count = 1;
        let subSum = 0;
        for(let v of nums){
            if(subSum + v > mid){
                count++;
                subSum = v;
             }else{
                subSum += v; 
             }
        }
        if(count <= m){
            right = mid;
        }else{
            left = mid + 1;
        }
    }
    return left
};
