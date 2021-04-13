const az = `
Apple
Banana
Cake

Sweet
Acid

require(' - ');

=== 6 combinations ===
Apple - Sweet
Apple - Acid
Banana - Sweet
Banana - Acid
Cake - Sweet
Cake - Acid
=== END ===
`;

const combinator = text => {
  const itemsArr = text.split("\n");

  const arrs = [];
  let a = [];
  let separator = null; // ?

  itemsArr.forEach(el => {
    if (/^separator:/.test(el)) {
      if (el.match(/"(.*)"/) && el.match(/"(.*)"/).pop()) {
        separator = el.match(/"(.*)"/).pop();
      }
      if (el.match(/'(.*)'/) && el.match(/'(.*)'/).pop()) {
        separator = el.match(/'(.*)'/).pop();
      }
    } else {
      if (el.length) {
        a.push(el);
      }
      if (!el.length) {
        if (a.length) {
          arrs.push(a);
        }
        a = [];
      }
    }
  });

  const recursiveFunc = (...lists) => {
    const combinations = [];
    const max = lists.length - 1;
    const helper = (arr, i) => {
      for (let j = 0, l = lists[i].length; j < l; j++) {
        const a = arr.slice(0);
        a.push(lists[i][j]);
        if (i === max) combinations.push(a);
        else helper(a, i + 1);
      }
    };
    helper([], 0);
    return combinations;
  };

  const resultArr = recursiveFunc(...arrs).map(el => el.join(separator || " "));
  return [
    `=== Result: ${resultArr.length} combinations ===`,
    ...resultArr,
    "=== END ==="
  ].join("\n");
};

combinator(az); // ?
