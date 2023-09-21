const result = {
  name: "1",
  status: 2,
  A: {
    name: "a1",
    status: 3,
    list: [{ id: 88 }, "number"],
  },
  B: {
    name: "B1",
    status: 93,
    list: [],
  },
};

const updateData = {
  name: "uu1",
  status: 99,
  A: {
    name: "uua1",
    status: 999,
    list: [{ id: 88 }, { id: 77 }, { id: 66 }],
  },
  B: {
    name: "uub1",
    status: 88,
    list: [{ t: "x" }, { t: "xx" }],
    zz: "uuuzz",
  },
  C: 100,
};

const objectPath = (obj) => {
  let stack = [];
  stack.push({
    node: obj,
    path: "root",
  });
  const pathList = [];

  while (stack.length) {
    const { node, path } = stack.pop();
    console.log("n:", node);
    // check is leaf
    // || Array.isArray(node)
    if (typeof node !== "object") {
      // 满足结束的条件了
      pathList.push(path);
    } else {
      // 还有节点
      const childrenKeys = Object.keys(node);
      for (let k of childrenKeys) {
        stack.push({
          node: node[k],
          path: `${path}.${k}`,
        });
      }
    }
  }
  console.log("p:", pathList);
};

objectPath(result);
