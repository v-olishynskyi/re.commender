export const startCase = (str: string) => {
  const newStr = str
    .split(' ')
    .map(str => {
      const word = str.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  console.log('🚀 ~ file: startCase.ts ~ line 9 ~ startCase ~ newStr', newStr);

  return newStr;
};

export const makeAvatarLetters = (str: string) => {
  // const newString = str
  //   .split(' ')
  //   .map(str => str.charAt(0).toUpperCase())
  //   .join('');

  // return newString;
  return `${str.split(' ')[0][0].toUpperCase()}${str
    .split(' ')[1][0]
    .toUpperCase()}`;
};
