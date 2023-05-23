import { Grid } from '../grid/grid';
import { setRandomStyle } from './randomStyle';
import * as levels from '../config/levels';
import { Player } from '../grid/Player';
import { Enemy } from '../grid/Enemy';

export const clearLevel = ({ container }) => {
  var child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
};

export const setLevel = ({ state, level, container }) => {
  setRandomStyle();
  const config = levels[`level${level}`];
  const newGrid = new Grid({ config, state });
  container.appendChild(newGrid.element);

  const startColumn = newGrid.getStartColumn();
  const player = new Player({ grid: newGrid, state });
  const enemy = new Enemy({ grid: newGrid, state });
  startColumn.element.appendChild(player.element);
  startColumn.element.appendChild(enemy.element);
  return { grid: newGrid, player, enemy };
};
