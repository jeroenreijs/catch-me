import { Column } from './column';

export class Row {
  constructor({ noOfColumns, rowConfig, config, index, grid, state }) {
    this.rowConfig = rowConfig;
    this.config = config;
    this.state = state;
    this.grid = grid;
    this.index = index;
    this.columns = [];
    this.noOfColumns = noOfColumns;
    this.element = document.createElement('div');
    this.element.classList.add('row');
    this.addColumns();
  }

  addColumns() {
    for (let i = 0; i < this.noOfColumns; i++) {
      const newColumn = new Column({
        colConfig: this.rowConfig[i],
        index: i,
        rowIndex: this.index,
        grid: this.grid,
        config: this.config,
        state: this.state,
      });
      this.columns.push(newColumn);
      this.element.appendChild(newColumn.element);
    }
  }
}
