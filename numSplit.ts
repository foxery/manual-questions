// 写一个函数，实现对一个数字每3位加一个逗号，如输入100000， 输出100,000（不考虑负数，小数）
const numSplit = (value: any) => {
  if (!value) {
    return;
  }
  if (typeof value !== "string") {
    value = value.toString();
  }
  value = value.split("").reverse();
  let result: any[] = [];
  for (let i = 0; i < value.length; i++) {
    if (i > 0 && i % 3 === 0) {
      result.push(",");
    }
    result.push(value[i]);
  }
  return result.reverse().join("");
};

// test
let res = numSplit(100000);
let res2 = numSplit(100000000);
console.log(`output->`, res, res2);
