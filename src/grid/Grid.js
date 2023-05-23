import { columns } from '../config/constants';
import { getSomeRandomNumbers } from '../utils/getSomeRandomNumbers';
import { Row } from './Row';

export class Grid {
  constructor({ config, state }) {
    this.config = config;
    this.state = state;
    this.columns = [];
    this.rows = [];
    this.rowConfig = config.rows;
    this.noOfRows = config.rows.length;
    this.noOfColumns = config.rows[0].length;
    this.element = document.createElement('div');
    this.element.classList.add('grid');
    this.addRows();
    this.finished = false;
    this.player = null;
    this.enemy = null;
  }

  addRows() {
    for (let i = 0; i < this.noOfRows; i++) {
      const newRow = new Row({
        noOfColumns: this.noOfColumns,
        rowConfig: this.rowConfig[i],
        index: i,
        grid: this.element,
        config: this.config,
        state: this.state,
      });
      this.rows.push(newRow);
      newRow.columns.forEach((column) => {
        this.columns.push(column);
      });
      this.element.appendChild(newRow.element);
    }
  }

  setPlayer(entity) {
    this.player = entity;
  }

  setEnemy(entity) {
    this.enemy = entity;
  }

  getStartColumn() {
    return this.columns.find((column) => column.type === columns.START);
  }

  finishLevel(type) {
    //only finish for the first entity that reaches the finish
    if (!this.finished) {
      this.finished = true;
      this.columns.forEach((column) => {
        column.finishLevel();
      });
      this.player.finishLevel();
      this.enemy.finishLevel();
      this.element.dispatchEvent(
        new CustomEvent('cm:finish', { detail: { text: () => type } })
      );
    }
  }

  checkDeadStops() {
    const deadStops = this.config.deadStops;
    if (!deadStops || deadStops === 0) {
      return;
    }
    const cols = this.columns;
    let indexList = [];
    cols.forEach((column, index) => {
      if (
        !column.isSelected() &&
        !column.isTrap() &&
        !column.hasPlayer() &&
        !column.hasEnemy()
      ) {
        indexList.push(index);
        column.setType(columns.EMPTY);
      }
    });
    const indexes = getSomeRandomNumbers(indexList, deadStops);
    for (let i = 0; i < indexes.length; i++) {
      cols[indexList[indexes[i]]].setType(columns.DEAD);
    }
  }

  newLevel() {
    this.element.dispatchEvent(new CustomEvent('cm:new_level'));
  }

  stopGame() {
    this.element.dispatchEvent(new CustomEvent('cm:stop_game'));
  }

  removeElement() {
    this.element.parentNode.removeChild(this.element);
  }
}
