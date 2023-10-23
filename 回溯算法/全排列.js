/**
 * 不重复数字的全排列
 * @param {Number[]} nums
 */
const permute = function (nums) {
  /**
   *
   * @param {Number[]} nums 选择列表
   * @param {Number[]} track 路径
   */
  const backtrack = function (nums, track) {
    if (nums.length === track.length) {
      //结束条件，到底了
      res.push([...track]);
      return;
    }

    for (let v of nums) {
      if (track.includes(v)) {
        //跳过
        continue;
      }
      //做选择
      track.push(v);
      backtrack(nums, track);
      //撤销选择,这里移除最后一个数，回溯
      //路径移除改选择，这里移除掉v
      track.pop();
    }
  };

  let res = [];
  let track = [];

  backtrack(nums, track);

  return res;
};
let test = [1, 2, 3];
// console.log(permute(test));

function getAll(list) {
  const ret = [];
  const dfs = (n, nums) => {
    if (n === list.length) {
      ret.push([...nums]);
    }
    for (let v of list) {
      if (nums.includes(v)) {
        continue;
      }
      nums.push(v);
      dfs(n + 1, nums);
      nums.pop();
    }
  };

  dfs(0, []);

  console.log("r:", ret);
}

getAll(test);
