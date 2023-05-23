import { getPath } from '../../utils/getPath';

test('Do I get a path', () => {
  const width = 5;
  const height = 3;
  const matrix = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0]
  ];
  const startCoords = [1, 2];
  const endCoords = [4, 2];
  const path = getPath({ width, height, matrix, startCoords, endCoords });
  const result = [
    [1, 2],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [4, 2]
  ];
  expect(path).toEqual(result);
});
