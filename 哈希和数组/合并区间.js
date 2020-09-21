/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  // [1,3] [2,6] [8,10] [12,20]
  // [1,6] [8,10] [12,20]

  // [1,5] [2,3] [4,9] [10,20]
  // [1,9] [10,20]

  // [1,4] [4,7] [12,20]
  // [1,7] [12,20]



  // [[]]
  // [【]】
  // [][]
  if (!intervals || intervals.length === 0) {
    return []
  }
  let res = [];
  //排序，按数组的左值排序
  intervals.sort((v1, v2) => {
    return v1[0] - v2[0]
  })
  res.push(intervals[0])
  for (let i = 1; i < intervals.length; i++){
    let arr = intervals[i];
    let top = res[res.length - 1];
    if(arr[0] > top[1]){
      res.push(arr);
    }else{
      top[1]= Math.max(top[1],arr[1])
    }
  }
  console.log('res:',res);
  return res;

};
let test = [
  [1, 3],
  [2, 6],
  [8, 10],
  [12, 20]
]
merge(test)
