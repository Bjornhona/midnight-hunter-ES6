
'use strict';

class Game {
  constructor () {

    this.gameIsOver = false;
    this.youWonGame = false;
    this.isPause = false;
    this.intervalId = 0;
    this.rateEnemies;
    this.rateLives;
    this.speedFriends;
    this.speedEnemies;
    this.speedLives;
    this.numOfFriends = 1;
    this.numOfEnemies = 4;
  }

  start () {

    this.gameMain = buildDom(`
      <main class="game">
        <header class="game-header">
          <div class="lives-and-loves">
            <div class="lives">
              <h3>Lives</h3>
              <div class='lives-images'>
                <span class="one-life">★</span>
                <span class="two-lives">★</span>
                <span class="three-lives">★</span>
                <span class="four-lives">★</span>
                <span class="five-lives">★</span>
              </div>
            </div>
            <div class="loves">
              <h3>Loves</h3>
              <div class='loves-images'>
                <span class="one-love hidden">♥</span>
                <span class="two-loves hidden">♥</span>
                <span class="three-loves hidden">♥</span>
                <span class="four-loves hidden">♥</span>
                <span class="five-loves hidden">♥</span>
              </div>
            </div>
          </div>
          <div class="pause-button">
            <button class="pause esc">||</button>
            <button class="pause-play esc hidden">▶︎</button>
          </div>
        </header>
        <div class="canvas">
          <canvas></canvas>
        </div>
        <div class="mobile">
          <div class="up-and-down">
            <img class="button-up hidden arrows" src="images/up-arrow.png"/>
            <img class="button-down hidden arrows" src="images/down-arrow.png"/>
          </div>
          <div class="left-and-right">
            <img class="button-left hidden arrows" src="images/left-arrow.png"/>
            <img class="button-right hidden arrows" src="images/right-arrow.png"/>
          </div>
        </div>
        <audio class="soundtrack"><source type="audio/mpeg" /></audio>     
      </main>
    `);

    document.body.appendChild(this.gameMain);

    // function timeOutTest() {
    //   let timerId = window.setTimeout(function() {
    //     this.onGameOverCallback();
    //   }, 2000);
    // }

    // timeOutTest();

    this.canvasParentElement = this.gameMain.querySelector('.canvas');
    this.canvasElement = this.canvasParentElement.querySelector('canvas');
    this.audioElement = this.gameMain.querySelector('.soundtrack');
    this.audioElement.src = 'sounds/John_Paul_Young_-_Love_Is_In_The_Air_1978[ListenVid.com].mp3';

    this.friendsSound = new Audio("./sounds/Kiss-sound.mp3");
    this.enemiesSound = new Audio("./sounds/Wilhelm-Scream.mp3");
    
    this.width = this.canvasParentElement.offsetWidth;
    this.height = this.canvasParentElement.offsetHeight;

    this.canvasElement.setAttribute('width', this.width);
    this.canvasElement.setAttribute('height', this.height);

    this.player = new Player(this.canvasElement, 5, 5);

    this.mobileArrowUp = document.querySelector('.button-up');
    this.mobileArrowDown = document.querySelector('.button-down');
    this.mobileArrowLeft = document.querySelector('.button-left');
    this.mobileArrowRight = document.querySelector('.button-right');

    this.handleKeyDown = event => {
        if (event.key === 'ArrowLeft' || event.target.classList.contains('left')) {
          this.player.setDirection(-1, 0);
        } else if (event.key === 'ArrowRight' || event.target.classList.contains('right')) {
          this.player.setDirection(1, 0);
        } else if (event.key === 'ArrowUp' || event.target.classList.contains('up')) {
          this.player.setDirection(0, -1);
        } else if (event.key === 'ArrowDown' || event.target.classList.contains('down')) {
          this.player.setDirection(0, 1);
        }
    }

    document.body.addEventListener('keydown', this.handleKeyDown);

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

      this.numOfFriends = 1;
      this.numOfEnemies = 1;

      this.mobileArrowUp.classList.remove('hidden');
      this.mobileArrowDown.classList.remove('hidden');
      this.mobileArrowLeft.classList.remove('hidden');
      this.mobileArrowRight.classList.remove('hidden');
    
      this.mobileArrowUp.addEventListener('touchstart', function() {
        this.player.setDirection(0, -1);
      });
      this.mobileArrowDown.addEventListener('touchstart', function() {
        this.player.setDirection(0, 1);
      });
      this.mobileArrowLeft.addEventListener('touchstart', function() {
        this.player.setDirection(-1, 0);
      });
      this.mobileArrowRight.addEventListener('touchstart', function() {
        this.player.setDirection(1, 0);
      });
    }
    

    this.startLoop();

    this.enemies = [];
    this.friends = [];
    this.walls = [];
    this._spawnWall();

  };

  _spawnEnemy ()  {

    while (this.enemies.length < this.numOfEnemies) {
      if (Math.random() > 0.999) {
        const randomX = Math.random() * this.width * 0.99;
        this.enemies.push(new Frienemy(this.canvasElement, randomX, 0, 'Enemy'));
      }
    }
  };

  _spawnFriend ()  {

    while (this.friends.length < this.numOfFriends) {
      if (Math.random() > 0.999) {
        const randomX = Math.random() * this.width * 0.99;
        this.friends.push(new Frienemy(this.canvasElement, randomX, 0, 'Friend'));
      }
    }
  };

  _spawnWall ()  {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.walls.push(new Wall(this.canvasElement, this.width/3, this.height/3, 'vertical'));
      this.walls.push(new Wall(this.canvasElement, this.width/12*6, this.height/12*9, 'horizontal'));


    } else {
      this.walls.push(new Wall(this.canvasElement, this.width/2, this.height/2, 'vertical'));
      this.walls.push(new Wall(this.canvasElement, this.width/12*3, this.height/12*3, 'horizontal'));
      this.walls.push(new Wall(this.canvasElement, this.width/12*3, this.height/3*2, 'square'));
      this.walls.push(new Wall(this.canvasElement, this.width/12*9, this.height/12*4, 'square'));
      this.walls.push(new Wall(this.canvasElement, this.width/12*9, this.height/12*9, 'horizontal'));
    }
  };

  startLoop () {
    this.ctx = this.canvasElement.getContext('2d');

    const pauseButton = document.querySelector('button.pause');
    const playButton = document.querySelector('button.pause-play');
    
    pauseButton.addEventListener('click', () => {
      this.isPause = !this.isPause;
      pauseButton.classList.toggle('hidden');
      playButton.classList.toggle('hidden');
      if(!this.isPause) {
        loop();
        this.audioElement.play();
      }
    });

    playButton.addEventListener('click', () => {
      this.isPause = !this.isPause;
      pauseButton.classList.toggle('hidden');
      playButton.classList.toggle('hidden');
      if(!this.isPause) {
        loop();
        this.audioElement.play();
      }
    });

    this.audioElement.play();

    const loop = () => {

      this._clearAll();
      this._updateAll();
      this._drawAll();

      // if game is not over
      if(!this.gameIsOver && !this.youWonGame && !this.isPause) {
          window.requestAnimationFrame(loop);
        } else {
          this.audioElement.pause();
        }
    }

    window.requestAnimationFrame(loop);
  };

  _drawAll () {

    //draw
    this.player.draw();

    this.friends.forEach(function(item) {
        item.draw();
    });

    this.enemies.forEach(function(item) {
      item.draw();
    });

    this.walls.forEach(function (item) {
      item.draw();
    });
  }

  _clearAll () {
    //erase canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  _updateAll () {
    //update positions
    this.player.update();

    this._spawnEnemy();
    this._spawnFriend();
    

    this.friends.forEach(function(item) {
      item.update();
    });

    this.enemies.forEach(function(item) {
      item.update();
    });

    //check positions
    this.friends.forEach(function(item) {
      item.isInScreen();
    });

    this.enemies.forEach(function(item) {
      item.isInScreen();
    });

    // check if player collide with friends, enemies or walls
    this.checkIfFriendsCollidedPlayer();
    this.checkIfEnemiesCollidedPlayer();
    this.checkIfWallsCollidedPlayer();
    this.checkIfWallsCollidedFriends();
    this.checkIfWallsCollidedEnemies();

    // check if game over
    this.checkIfGameOver();
  }

  checkIfEnemiesCollidedPlayer () {

    this.enemies.forEach((item, index) => {
      const oneLife = this.gameMain.querySelector('span.one-life');
      const twoLives = this.gameMain.querySelector('span.two-lives');
      const threeLives = this.gameMain.querySelector('span.three-lives');
      const fourLives = this.gameMain.querySelector('span.four-lives');
      const fiveLives = this.gameMain.querySelector('span.five-lives');

      if (this.player.collidesWithEnemy(item)) {
        this.player.collidedEnemy();
        this.enemies.splice(index,1);
        this.enemiesSound.play();
        this.enemiesSound.volume = 0.7;

        if (this.player.lives === 4) {
          fiveLives.classList.add('hidden');
        } else if (this.player.lives === 3) {
          fourLives.classList.add('hidden');
        } else if (this.player.lives === 2) {
          threeLives.classList.add('hidden');
        } else if (this.player.lives === 1) {
          twoLives.classList.add('hidden');
        } else if (this.player.lives === 0) {
          oneLife.classList.add('hidden');
        }
      }
    });
  };

  checkIfFriendsCollidedPlayer () {

    this.friends.forEach((item, index) => {
      const oneLove = this.gameMain.querySelector('span.one-love');
      const twoLoves = this.gameMain.querySelector('span.two-loves');
      const threeLoves = this.gameMain.querySelector('span.three-loves');
      const fourLoves = this.gameMain.querySelector('span.four-loves');
      const fiveLoves = this.gameMain.querySelector('span.five-loves');

      if (this.player.collidesWithFriend(item)) {
        this.player.collidedFriend();
        this.friends.splice(index, 1);
        this.friendsSound.play();
        this.friendsSound.volume = 0.7;

        if (this.player.loves === 4) {
          oneLove.classList.remove('hidden');
        } else if (this.player.loves === 3) {
          twoLoves.classList.remove('hidden');
        } else if (this.player.loves === 2) {
          threeLoves.classList.remove('hidden');
        } else if (this.player.loves === 1) {
          fourLoves.classList.remove('hidden');
        } else if (this.player.loves === 0) {
          fiveLoves.classList.remove('hidden');
        }
      }
    });
  };

  checkIfWallsCollidedPlayer () {

    this.walls.forEach(item => {
      if(this.player.collidesWithWall(item)) {
        this.player.invertDirection();
      }
    });
  }

  checkIfWallsCollidedFriends () {

    this.walls.forEach(wallItem => {
      this.friends.forEach(friendItem => {
        if(friendItem.collidesWithWall(wallItem)) {
          friendItem.invertDirection();
        }
      });
    });
  }

  checkIfWallsCollidedEnemies () {

    this.walls.forEach(wallItem => {
      this.enemies.forEach(enemyItem => {
        if(enemyItem.collidesWithWall(wallItem)) {
          enemyItem.invertDirection();
        }
      });
    });
  }

  // Game.checkIfWallCollidedFrienemies

  checkIfGameOver () {

    if (!this.player.lives) {
      this.gameOver();
    } else if (!this.player.loves) {
      this.youWon();
    }
  }

  onOver (callback) {

    this.onGameOverCallback = callback;
  };

  gameOver () {


      this.gameIsOver = true;
      this.onGameOverCallback('lose');
  };

  youWon () {

    this.youWonGame = true;
    this.onGameOverCallback('win');
  };

  destroy () {

    this.gameMain.remove();
  };

}