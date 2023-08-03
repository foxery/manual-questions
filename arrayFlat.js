// 已知如下数组：var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

const arrayFlat = (value) => {
  value = value.flat(Infinity);
  value = Array.from(new Set(value));
  value = value.sort((a, b) => {
    return a - b;
  });
  return value;
};

// test
let arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
console.log(`output->`, arrayFlat(arr));
