// 计算出字符串中出现次数最多的字符是什么，出现了多少次？
const clacMaxStr = (value: string) => {
  let str = "";
  let count = 0;
  let map: Record<string, number> = {};
  let temp = value.split("");
  temp.forEach((v: string) => {
    if (map[v]) {
      map[v]++;
    } else {
      map[v] = 1;
    }
  });
  for (let key in map) {
    if (map[key] > count) {
      count = map[key];
      str = key;
    }
  }
  return { str, count };
};

// test
console.log(clacMaxStr("adccccdb"));
