function listToTree(lists) {
  let map = new Map();
  let rootList = [];
  for (let item of lists) {
    // item.parentId??rootList.push(item);
    if (item.parentId === undefined) {
      rootList.push(item);
    }
    map.set(item.id, item);
  }
  for (let value of map.values()) {
    let pid = value.parentId;
    if (pid) {
      let pnode = map.get(pid);
      if (pnode.children) {
        pnode.children.push(value);
      } else {
        pnode.children = [value];
      }
      //   pnode['children'] = value;
    }
  }
  return rootList;
}
const nums = [
  { id: 1, val: "root1" },
  { id: 2, val: "test2", parentId: 1 },
  { id: 3, val: "test2", parentId: 1 },
  { id: 4, val: "test2", parentId: 2 },
  { id: 5, val: "test2", parentId: 3 },
  { id: 6, val: "test2", parentId: 4 },
  { id: 7, val: "test2", parentId: 6 },
];

listToTree(nums);
//输出：
let result = [
  {
    id: 1,
    val: "root1",
    children: [
      {
        id: 2,
        val: "test2",
        parentId: 1,
        children: [
          {
            id: 4,
            val: "test2",
            parentId: 2,
            children: [
              {
                id: 6,
                val: "test2",
                parentId: 4,
                children: [{ id: 7, val: "test2", parentId: 6 }],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        val: "test2",
        parentId: 1,
        children: [{ id: 5, val: "test2", parentId: 3 }],
      },
    ],
  },
];
