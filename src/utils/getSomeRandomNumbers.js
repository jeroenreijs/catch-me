// get x random numbers from a list
export const getSomeRandomNumbers = (list, number) => {
  let indexes = [];
  while (indexes.length < number) {
    var r = Math.floor(Math.random() * (list.length - 1)) + 1;
    if (indexes.indexOf(r) === -1) indexes.push(r);
  }
  return indexes;
};
