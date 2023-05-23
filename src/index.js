import { setLevel } from './utils/setLevel';
import { entities } from './config/constants';
import { Splitscreen } from './screens/Splitscreen';
import { state as defaultState } from './config/defaultState';
import './scss/styles.scss';

let state = {
  ...defaultState,
  playing: false,
  levelsFinished: 0,
};

const body = document.body;
const homeContainer = document.querySelector('.home');
const homeStepOne = homeContainer.querySelector('.step1');
const homeStepTwo = homeContainer.querySelector('.step2');
const infoButton = homeContainer.querySelector('button.button-uitleg');
const startButton = homeContainer.querySelector('button.button-start');
const playerMaleButton = homeContainer.querySelector(
  'input.player-selector.good-guy'
);
const playerFemaleButton = homeContainer.querySelector(
  'input.player-selector.good-girl'
);
const levelContainer = document.querySelector('.container');
let splitScreen;
let grid;
let enemy;
let player;

const showInfo = () => {
  homeStepOne.classList.add('hidden');
  homeStepOne.classList.remove('show');
  homeStepTwo.classList.add('show');
  homeStepTwo.classList.remove('hidden');
};

const hideInfo = () => {
  homeStepOne.classList.remove('hidden');
  homeStepOne.classList.add('show');
  homeStepTwo.classList.remove('show');
  homeStepTwo.classList.add('hidden');
};

const setPlayerSexe = (e) => {
  state = {
    ...state,
    playerSexe: e.target.value,
  };
};

const startGame = () => {
  state = {
    ...state,
    playing: true,
  };

  startLevel();
  hideInfo();
};

const setScore = (type) => {
  const { score, enemyScore } = state;
  let newScore = score;
  let newEnemyScore = enemyScore;
  if (type === entities.PLAYER) {
    newScore += 1;
  } else {
    newEnemyScore += 1;
  }
  state = {
    ...state,
    score: newScore,
    enemyScore: newEnemyScore,
  };
};

infoButton.addEventListener('click', showInfo);
startButton.addEventListener('click', startGame);
playerMaleButton.addEventListener('change', setPlayerSexe);
playerFemaleButton.addEventListener('change', setPlayerSexe);

const showSplitScreen = (e) => {
  const type = e.detail.text();
  setScore(type);
  const { score, enemyScore } = state;
  splitScreen.setScores({ score, enemyScore });
  const { element } = splitScreen;
  const splitScreenVariant = Math.floor(Math.random() * 4);
  setTimeout(() => {
    if (!element.classList.contains('show')) {
      levelContainer.classList.remove('show');
      levelContainer.classList.add('hidden');
      splitScreen.showContent({ type, variant: splitScreenVariant });
    }
  }, 300);
};

const hideSplitScreen = () => {
  splitScreen.hideContent();
};

const newLevel = () => {
  const { level, levelsFinished, maxLevel } = state;
  const newLevel = level + 1;
  const newLevelsFinished = levelsFinished + 1;
  hideSplitScreen();

  if (newLevelsFinished === maxLevel) {
    state = {
      ...defaultState,
      playing: false,
      levelsFinished: 0,
    };
  } else {
    state = {
      ...state,
      level: newLevel,
      levelsFinished: newLevelsFinished,
    };
  }

  cleanUp();
  startLevel();
};

const stopGame = () => {
  state = {
    ...defaultState,
    playing: false,
    levelsFinished: 0,
  };
  cleanUp();
  startLevel();
};

const addGridEvents = (currentGrid) => {
  currentGrid.element.addEventListener('cm:finish', showSplitScreen);
  currentGrid.element.addEventListener('cm:new_level', newLevel);
  currentGrid.element.addEventListener('cm:stop_game', stopGame);
};

const removeGridEvents = (currentGrid) => {
  currentGrid.element.removeEventListener('cm:finish', showSplitScreen);
  currentGrid.element.removeEventListener('cm:new_level', newLevel);
  currentGrid.element.removeEventListener('cm:stop_game', stopGame);
};

const cleanUp = () => {
  player.removeEvents();
  splitScreen.removeEvents();
  removeGridEvents(grid);
  grid.removeElement();
  splitScreen.removeElement();
  grid = undefined;
  player = undefined;
  enemy = undefined;
  splitScreen = undefined;
};

const startLevel = () => {
  const { playing, level } = state;

  if (!playing) {
    homeContainer.classList.remove('hidden');
    homeContainer.classList.add('show');
    levelContainer.classList.remove('show');
    levelContainer.classList.add('hidden');
  } else {
    homeContainer.classList.remove('show');
    homeContainer.classList.add('hidden');
    levelContainer.classList.remove('hidden');
    levelContainer.classList.add('show');

    const levelInfo = setLevel({
      state,
      level,
      container: levelContainer,
    });
    grid = levelInfo.grid;
    player = levelInfo.player;
    enemy = levelInfo.enemy;

    splitScreen = new Splitscreen({
      grid,
      squareCount: 10,
      state,
    });
    body.appendChild(splitScreen.element);

    addGridEvents(grid);
  }
};
