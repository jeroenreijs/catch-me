import PF from 'pathfinding';

export const getPath = ({ width, height, matrix, startCoords, endCoords }) => {
  const grid = new PF.Grid(width, height, matrix);
  const finder = new PF.AStarFinder();
  const path = finder.findPath(
    startCoords[0],
    startCoords[1],
    endCoords[0],
    endCoords[1],
    grid
  );
  return path;
};
