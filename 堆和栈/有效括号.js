var isValid = function (s) {
    //题目是因为只包括字符串，所以可以优化计算复杂度
    if (s.length % 2) return false;
    let arr = [];
    const matchChart = new Map([[')', '('], ['}', '{'], [']', '[']]);
    let chartKeys = [...matchChart.keys()];
    //let chartValues =matchChart.values();
    for (let i = 0; i < s.length; i++) {
        let key = s.charAt(i);
        if(chartKeys.indexOf(key) !== -1){
            let v = matchChart.get(key);
            if(arr.pop() !== v){
                return false;
            }
        }else{
            arr.push(key);
        }
    }
    return !arr.length;

};

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid2= function (s) {
    //题目是因为只包括字符串，所以可以优化计算复杂度
    if (s.length % 2) return false;
    let arr = [];
    const matchChart = new Map([[')', '('], ['}', '{'], [']', '[']]);
    for (let i = 0; i < s.length; i++) {
        let key = s.charAt(i);
        let v = matchChart.get(key);
        if(v){
            // let temp = (arr.length == 0)?'#':arr.pop();
            if(arr.pop() !== v){
                return false;
            }
        }else{
            arr.push(key);
        }
    }
    return !arr.length;

};
console.log(isValid2('{}{([])}')); 