import { entities } from '../config/constants';
import { Entity } from './Entity';
import { getPath } from '../utils/getPath';
import enemySVG from '../assets/bad_guy.svg';

export class Enemy extends Entity {
  constructor({ grid, state }) {
    super({ grid, state });
    this.type = entities.ENEMY;
    this.state = state;
    this.element.classList.add(entities.ENEMY);
    // this.element.innerHTML = '&#x1f608;';
    this.element.innerHTML = `<img alt='player' src=${enemySVG} />`;
    this.stepInterval;
    this.intervalSpeed = 500;
    this.walkDelay = 2000;
    grid.setEnemy(this);
    if (!state.debug) {
      this.start();
    }
  }

  start() {
    setTimeout(() => {
      this.startWalking();
    }, this.walkDelay);
  }

  startWalking() {
    this.step();
    this.stepInterval = setInterval(() => {
      this.step();
    }, this.intervalSpeed);
  }

  step() {
    const { matrix, startCoords, endCoords } = this.createMatrix();
    const width = this.grid.noOfColumns;
    const height = this.grid.noOfRows;
    const path = getPath({ width, height, matrix, startCoords, endCoords });

    if (path && path.length > 1) {
      const newColumnIndex = path[1][0];
      const newRowIndex = path[1][1];
      const newColumn = this.grid.columns.find(
        (column) =>
          column.index === newColumnIndex && column.rowIndex === newRowIndex
      );
      if (newColumn.isBlocked() || newColumn.isClosedTrap()) {
        this.angry();
      } else {
        this.moveTo(path[1]);
      }
    }
  }

  finishLevel() {
    this.stopWalking();
  }

  stopWalking() {
    clearInterval(this.stepInterval);
  }
}
