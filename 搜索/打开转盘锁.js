 /**
  * 转动一次的结果集,也就是邻接节点数据存入ret
  */
 const getNexts = (ret, str, usedSet) => {
   //每个数字都可能+1 或者-1
   for (let i = 0; i < str.length; i++) {
     //+1 -1
     let s1 = [...str];
     if (str[i] === '0') {
       s1[i] = '9';
     } else {
       s1[i] = String(parseInt(str[i]) - 1);
     }
     let string = s1.join('');
     if (!usedSet.has(string)) {
       ret.push(string)
       usedSet.add(string);
     }
     s1 = [...str];
     if (str[i] === '9') {
       s1[i] = '0';
     } else {
       s1[i] = String(parseInt(str[i]) + 1);
     }
     string = s1.join('');
     if (!usedSet.has(string)) {
       ret.push(string)
       usedSet.add(string);
     }
   }
 }
 /**
  * @param {string[]} deadends
  * @param {string} target
  * @return {number}
  */
 var openLock = function (deadends, target) {

   let queue = ['0000'];
   let visited = new Set(queue);
   let deadSet = new Set(deadends);
   if (deadSet.has(target) || deadSet.has('0000')) {
     return -1;
   }
   let step = 0;
   while (queue.length) {
     for (let i = queue.length - 1; i >= 0; i--) {
       let cur = queue.shift();
       if (deadSet.has(cur)) {
         continue;
       }
       if (cur === target) {
         return step
       }
       //将邻接节点入队列
       getNexts(queue, cur, visited)
     }
     step++;
   }

   return -1;
 };


 const getDownString = (str, i) => {
   let arr = [...str];
   if (str[i] === '0') {
     arr[i] = '9';
   } else {
     arr[i] = String(parseInt(str[i]) - 1);
   }
   return arr.join('');
 }
 const getUpString = (str, i) => {
   let arr = [...str];
   if (str[i] === '9') {
     arr[i] = '0';
   } else {
     arr[i] = String(parseInt(str[i]) + 1);
   }
   return arr.join('');
 }
 /**
  * 双向BFS
  * @param {string[]} deadends
  * @param {string} target
  * @return {number}
  */
 var openLock = function (deadends, target) {

   let set1 = new Set(['0000']);
   let set2 = new Set([target]);

   let visited = new Set(['0000']);
   let deadSet = new Set(deadends);
   if (deadSet.has(target) || deadSet.has('0000')) {
     return -1;
   }
   let step = 0;
   while (set1.size && set2.size) {
     let neighbors = new Set();
     if (set1.size > set2.size) {
       //交换，用数量小的存的求邻接节点数量小
       let t = set1;
       set1 = set2;
       set2 = t;
     }
     for (let cur of set1) {
       if (deadSet.has(cur)) {
         continue;
       }
       if (set2.has(cur)) {
         return step;
       }
       visited.add(cur);
       for (let i = 0; i < 4; i++) {
         let down = getDownString(cur, i);
         if (!visited.has(down)) {
           neighbors.add(down);
         }
         let up = getUpString(cur, i);
         if (!visited.has(up)) {
           neighbors.add(up);
         }
       }

     }
     set1 = set2;
     set2 = neighbors;
     step++;
   }
   return -1;
 };



 let d = ["0201", "0101", "0102", "1212", "2002"],
   t = "0202"

 //  let d = ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"]
 //  t = "8888"

 console.log(1, openLock(d, t));
