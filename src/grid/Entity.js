import { entities } from '../config/constants';
import { getPath } from '../utils/getPath';

export class Entity {
  constructor({ grid, state }) {
    this.grid = grid;
    this.state = state;
    this.type = entities.ENTITY;
    this.noOfAngry = 0;
    this.element = document.createElement('div');
  }

  angry() {
    const element = this.element;
    element.classList.add(entities.ANGRY);
    element.classList.add('show');
    setTimeout(() => {
      element.classList.remove(entities.ANGRY, 'show');
    }, 500);
    if (this.type === entities.PLAYER) {
      this.noOfAngry += 1;
      if (this.noOfAngry === 3) {
        this.noOfAngry = 0;
        const { matrix, startCoords, endCoords } = this.createMatrix();
        const width = this.grid.noOfColumns;
        const height = this.grid.noOfRows;
        const path = getPath({ width, height, matrix, startCoords, endCoords });
        if (!path || path.length === 0) {
          this.grid.checkDeadStops();
        }
      }
    }
  }

  moveTo(coords) {
    const columnIndex = coords[0];
    const rowIndex = coords[1];
    const { columns } = this.grid;
    const newColumn = columns.find(
      (column) => column.index === columnIndex && column.rowIndex === rowIndex
    );
    newColumn.element.appendChild(this.element);
    if (newColumn.isSelected()) {
      this.grid.finishLevel(this.type);
    } else if (this.type === entities.PLAYER) {
      this.grid.checkDeadStops();
    }
  }

  createMatrix() {
    let matrix = [];
    let startCoords = [0, 0];
    let endCoords = [0, 0];
    const { rows } = this.grid;
    rows.forEach((row, rowIndex) => {
      let rowImage = [];
      const { columns } = row;
      columns.forEach((column, columnIndex) => {
        if (column.hasEnemy()) {
          startCoords = [columnIndex, rowIndex];
        }
        if (column.type === 'selected') {
          endCoords = [columnIndex, rowIndex];
        }
        if (column.isBlocked()) {
          rowImage.push(1);
        } else {
          rowImage.push(0);
        }
      });
      matrix.push(rowImage);
    });
    return { matrix, startCoords, endCoords };
  }
}
