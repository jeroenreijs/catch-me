import { columns, entities } from '../config/constants';

export class Column {
  constructor({ colConfig, config, index, rowIndex, grid, state }) {
    this.type = colConfig.type;
    this.state = state;
    this.borders = colConfig.borders;
    this.index = index;
    this.grid = grid;
    this.rowIndex = rowIndex;
    this.trapsInterval = null;
    this.trapsIntervalTime = state.trapsIntervalTime;
    this.trapsDelay = 100;
    this.element = document.createElement('div');
    this.element.classList.add('column');
    this.setExtraClasses();
    // For now we won't use the borders
    // if (this.borders) {
    //   this.borders.forEach(border => {
    //     this.element.classList.add('border-' + border);
    //   });
    // }
  }

  setExtraClasses() {
    this.element.classList.add(this.type);
    if (this.type === columns.TRAP) {
      this.element.classList.add('close', 'closed');
      setTimeout(() => {
        this.startTogglingTraps();
      }, this.trapDelay);
    }
  }

  setType(type) {
    if (this.type === type) {
      return;
    }
    const currentType = this.type;
    this.type = type;
    this.switchClassesByType(currentType);
  }

  switchClassesByType(previousType) {
    this.element.classList.remove(previousType);
    this.element.classList.add(this.type);
  }

  isStart() {
    return this.type === columns.START;
  }

  isSelected() {
    return this.type === columns.SELECTED;
  }

  isEmpty() {
    return this.type === columns.EMPTY;
  }

  isDead() {
    return this.type === columns.DEAD;
  }

  isTrap() {
    return this.type === columns.TRAP;
  }

  isClosedTrap() {
    return this.isTrap() && this.element.classList.contains('closed');
  }

  isSelected() {
    return this.type === columns.SELECTED;
  }

  isBlocked() {
    // Do something smart here for checking the borders
    return this.isDead();
  }

  hasEnemy() {
    return this.element.querySelector(`.${entities.ENEMY}`) !== null;
  }

  hasPlayer() {
    return this.element.querySelector(`.${entities.PLAYER}`) !== null;
  }

  checkTrapClosed(e) {
    if (e.target.classList.contains('close')) {
      e.target.classList.add('closed');
    } else {
      e.target.classList.remove('closed');
    }
  }

  checkTrapOpened(e) {
    e.target.classList.add('closed');
  }

  startTogglingTraps() {
    this.element.addEventListener('transitionend', this.checkTrapClosed);
    this.element.addEventListener('transitionstart', this.checkTrapOpened);
    const trap = this.element;
    this.trapsInterval = setInterval(() => {
      if (trap.children.length === 0) {
        trap.classList.toggle('close');
      }
    }, this.trapsIntervalTime);
  }

  clearTogglingTraps() {
    this.element.removeEventListener('transitionend', this.checkTrapClosed);
    this.element.removeEventListener('transitionstart', this.checkTrapOpened);
    window.clearInterval(this.trapsInterval);
  }

  finishLevel() {
    this.clearTogglingTraps();
  }
}
