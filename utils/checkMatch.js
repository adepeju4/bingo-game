const wordList = [];
const findArrayInArray = (arr, item) => {
  let item_as_string = JSON.stringify(item);

  let contains = arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
};

const matchCheck = (num, playerName) => {
  const messages = [];
  const match = [];
  const positions = [
    [0, 6, 18, 24],
    [4, 8, 16, 20],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
  ];

  if (!wordList.includes(num)) {
    wordList.push(num);
    wordList.sort((a, b) => a - b);
  }

  let copyArr = positions;

  for (let i = 0; i < copyArr.length; i++) {
    let tempArr = wordList.filter(function (item) {
      return copyArr[i].includes(item);
    });

    if (tempArr.join(",") === copyArr[i].join(",")) {
      let findExisting = findArrayInArray(match, copyArr[i]);
      if (findExisting) {
        continue;
      }
      match.push(copyArr[i]);
      if (messages.length === 0) {
        messages.push(`${playerName} has one bingo`);
      } else {
        messages.push(`${playerName} has ${match.length} bingos`);
      }
    }
  }
  return messages.reverse();
};

export default matchCheck;
