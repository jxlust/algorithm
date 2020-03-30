/**
 * 对象的深度拷贝
 * @param {*} obj 
 */
function deepCopy(obj) {
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
            newObj[key] = deepCopy(obj[key]);
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
let obj1 = {
    name: 'zz',
    car: {
        name: 'cz'
    },
    lists: [{
        age: 99
    }, 'pp']
}
let obj2 = deepCopy(obj1);
console.log(obj2);
obj1.car.name = 'uu';
console.log(obj1);
console.log(obj2);