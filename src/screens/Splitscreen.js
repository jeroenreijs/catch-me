export class Splitscreen {
  constructor({ grid, squareCount = 10, state }) {
    this.grid = grid;
    this.squareCount = squareCount;
    this.element = document.createElement('div');
    this.element.classList.add('splitscreen');
    this.element.classList.add('hidden');
    this.score = 0;
    this.enemyScore = 0;

    const { playerSexe } = state;

    this.stopGame = this.onStopGame.bind(this);
    this.nextLevel = this.onNextLevel.bind(this);
    this.addItems();
    this.addTitles();
    this.addPlayers(playerSexe);
    this.addScores();
    this.addButtons();
  }

  getPositiveLine() {
    const arr = ['Way to go!', 'Well done!', 'Really good!'];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  getNegativeLine() {
    const arr = ['Keep it up!', 'Better luck next time!', 'Too bad!'];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  addItems() {
    const list = document.createElement('ul');
    list.style.setProperty('--square-count', this.squareCount);
    for (let i = 0; i < this.squareCount; i++) {
      for (let j = 0; j < this.squareCount; j++) {
        const listItem = document.createElement('li');
        const oddEven = (j + i) % 2;
        listItem.style.setProperty('--animation-order', j + i);
        if (oddEven === 0) {
          listItem.classList.add('alt');
        }
        list.appendChild(listItem);
      }
    }
    this.element.appendChild(list);
  }

  addTitles() {
    const playerTitle = document.createElement('div');
    playerTitle.classList.add('label', 'type-player', 'hidden');
    playerTitle.innerHTML =
      'You won!<br><span class="subtitle">' +
      this.getPositiveLine() +
      '</span>';
    this.element.appendChild(playerTitle);
    const enemyTitle = document.createElement('div');
    enemyTitle.classList.add('label', 'type-enemy', 'hidden');
    enemyTitle.innerHTML =
      'You lost!<br><span class="subtitle">' +
      this.getNegativeLine() +
      '</span>';
    this.element.appendChild(enemyTitle);
  }

  addPlayers(playerSexe) {
    const playerContainer = document.createElement('div');
    const playerClass = playerSexe === 0 ? 'good-guy' : 'good-girl';
    playerContainer.classList.add(
      'winning-player',
      playerClass,
      'type-player',
      'hidden'
    );
    this.element.appendChild(playerContainer);
    const enemyContainer = document.createElement('div');
    enemyContainer.classList.add('winning-player', 'type-enemy', 'hidden');
    this.element.appendChild(enemyContainer);
  }

  addScores() {
    const scoreBox = document.createElement('div');
    scoreBox.classList.add('scores', 'hidden');
    const playerScore = document.createElement('div');
    playerScore.classList.add('player-score');
    playerScore.innerHTML =
      'You: <span id="player_score">' + this.score + '</span>';

    const enemyScore = document.createElement('div');
    enemyScore.classList.add('enemy-score');
    enemyScore.innerHTML =
      'Me: <span id="enemy_score">' + this.enemyScore + '</span>';

    scoreBox.appendChild(playerScore);
    scoreBox.appendChild(enemyScore);
    this.element.appendChild(scoreBox);
  }

  showContent({ type, variant }) {
    const element = this.element;
    let variantClass = 'red-blue';
    if (variant === 1) {
      variantClass = 'yellow-green';
    }
    if (variant === 2) {
      variantClass = 'blue-orange';
    }
    if (variant === 3) {
      variantClass = 'yellow-red';
    }
    element.classList.remove('hidden', 'animate-out');
    element.classList.add(variantClass, 'show');
    setTimeout(() => {
      const title = element.querySelector('.label.type-' + type);
      title.classList.remove('hidden');
      title.classList.add('show');
      const buttons = element.querySelector('.buttons');
      buttons.classList.remove('hidden');
      buttons.classList.add('show');
      const winningPlayer = element.querySelector(
        '.winning-player.type-' + type
      );
      winningPlayer.classList.remove('hidden');
      winningPlayer.classList.add('show');
      const scoreBox = element.querySelector('.scores');
      scoreBox.classList.remove('hidden');
      scoreBox.classList.add('show');
    }, 1000);
  }

  hideContent() {
    const element = this.element;
    const title = element.querySelector('.label.show');
    title.classList.add('hidden');
    title.classList.remove('show');
    const buttons = element.querySelector('.buttons');
    buttons.classList.add('hidden');
    buttons.classList.remove('show');
    const winningPlayer = element.querySelector('.winning-player.show');
    winningPlayer.classList.add('hidden');
    winningPlayer.classList.remove('show');
    const scoreBox = element.querySelector('.scores');
    scoreBox.classList.add('hidden');
    scoreBox.classList.remove('show');
    element.classList.add('animate-out');
    setTimeout(() => {
      element.classList.add('hidden');
      element.classList.remove('yellow-green', 'blue-orange', 'yellow-red');
    });
  }

  onStopGame() {
    this.grid.stopGame();
  }

  onNextLevel() {
    this.grid.newLevel();
  }

  addButtons() {
    const buttons = document.createElement('div');
    buttons.classList.add('buttons', 'hidden');
    const buttonStop = document.createElement('button');
    buttonStop.classList.add('stop', 'blue');
    buttonStop.textContent = 'Stop';
    buttonStop.addEventListener('click', this.stopGame, false);
    const buttonNext = document.createElement('button');
    buttonNext.classList.add('next-level');
    buttonNext.textContent = 'Next';
    buttonNext.addEventListener('click', this.nextLevel, false);
    buttons.appendChild(buttonStop);
    buttons.appendChild(buttonNext);
    this.element.appendChild(buttons);
  }

  setScores({ score, enemyScore }) {
    const playerElem = this.element.querySelector('#player_score');
    const enemyElem = this.element.querySelector('#enemy_score');
    this.score = score;
    this.enemyScore = enemyScore;
    playerElem.textContent = this.score;
    enemyElem.textContent = this.enemyScore;
  }

  removeEvents() {
    const buttonStop = this.element.querySelector('button.stop');
    const buttonNext = this.element.querySelector('button.next-level');
    buttonStop.removeEventListener('click', this.stopGame, false);
    buttonNext.removeEventListener('click', this.nextLevel, false);
  }

  removeElement() {
    this.element.parentNode.removeChild(this.element);
  }
}
