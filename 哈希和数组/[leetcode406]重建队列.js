/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
    // 按身高从大到小排序 [h,k]
    //[7,0] [7,1] [6,1] [5,0] [5,2] [4,4]
    //再根据k进行插入即可
    //[7,0]
    //[7,0] [7,1]
    //[7,0] [6,1] [7,1]
    //[5,0] [7,0] [6,1] [7,1] ...
    //按照身高先 高到底 排序
    people.sort((v1, v2) => {
        return v2[0] === v1[0] ? v1[1] - v2[1] : v2[0] - v1[0]
    })
    let result = []
    for (let i = 0; i < people.length; i++) {
        let index = people[i][1]
        //求得这个既是插入位置index，类似插入排序
        for (let pos = i; pos > index; pos--) {
            result[pos] = result[pos - 1]
        }
        result[index] = people[i]
        //  let pos = i;
        //  while (pos > index) {
        //    result[pos] = result[pos - 1]
        //    pos--
        //  }
        //  result[index] = people[i]
    }
    return result;
};
