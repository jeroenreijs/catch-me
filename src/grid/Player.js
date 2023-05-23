import { entities } from '../config/constants';
import { Entity } from './Entity';
import playerGoodGuySVG from '../assets/good_guy.svg';
import playerGoodGirlSVG from '../assets/good_girl.svg';
import {
  handleTouchStart,
  handleTouchMove,
  handleKeyPress,
} from '../utils/events';

export class Player extends Entity {
  constructor({ grid, state }) {
    super({ grid, state });
    const { playerSexe } = state;
    this.type = entities.PLAYER;
    this.element.classList.add(entities.PLAYER);
    // this.element.innerHTML = '&#x1f600;';
    const playerSVG = playerSexe === 0 ? playerGoodGuySVG : playerGoodGirlSVG;
    this.element.innerHTML = `<img alt='player' src=${playerSVG} />`;
    grid.setPlayer(this);

    // assign bind functions to variable to properly remove these
    this.touchMove = this.onTouchMove.bind(this);
    this.keyPress = this.onKeyPress.bind(this);

    this.addEvents();
  }

  position() {
    const columnPlayer = this.grid.columns.find((column) =>
      column.element.querySelector('.' + entities.PLAYER)
    );
    if (!columnPlayer) {
      console.log('Player::position => This should not happen');
      return [-1, -1];
    }
    return [columnPlayer.index, columnPlayer.rowIndex];
  }

  move(dir) {
    const currentPosition = this.position();
    const currentColumnIndex = currentPosition[0];
    const currentRowIndex = currentPosition[1];

    let newColumnIndex = currentColumnIndex;
    let newRowIndex = currentRowIndex;

    switch (dir) {
      case 'up':
        if (newRowIndex > -1) {
          newRowIndex -= 1;
        }
        break;
      case 'down':
        if (newRowIndex < this.grid.noOfRows - 1) {
          newRowIndex += 1;
        }
        break;
      case 'left':
        if (newColumnIndex > -1) {
          newColumnIndex -= 1;
        }
        break;
      case 'right':
        if (newColumnIndex < this.grid.noOfColumns - 1) {
          newColumnIndex += 1;
        }
        break;
    }

    if (newColumnIndex > -1 && newRowIndex > -1) {
      const newColumn = this.grid.columns.find(
        (column) =>
          column.index === newColumnIndex && column.rowIndex === newRowIndex
      );
      if (newColumn.isBlocked() || newColumn.isClosedTrap()) {
        this.angry();
      } else {
        this.moveTo([newColumnIndex, newRowIndex]);
      }
    }
  }

  onTouchMove(e) {
    const move = handleTouchMove(e);
    move && this.move(move);
  }

  onKeyPress(e) {
    const move = handleKeyPress(e);
    move && this.move(move);
  }

  onDoubleClick(e) {
    e.preventDefault();
    return false;
  }

  finishLevel() {
    this.removeEvents();
  }

  addEvents() {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', this.touchMove, false);
    document.addEventListener('keyup', this.keyPress, false);
    document.addEventListener('dblclick', this.onDoubleClick, false);
  }

  // Before Player is set to undefined, remove the events
  removeEvents() {
    document.removeEventListener('touchstart', handleTouchStart, false);
    document.removeEventListener('touchmove', this.touchMove, false);
    document.removeEventListener('keyup', this.keyPress, false);
    document.addEventListener('dblclick', this.onDoubleClick, false);
  }
}
