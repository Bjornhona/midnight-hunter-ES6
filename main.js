'use strict';

console.log('Midnight Hunter - game starts');

const buildDom = html => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

const main = () => {
  
  let splashMain;
  let rulesMain;
  let gameOverMain;
  let youWinMain;

  let game;
  
  /* ---- Splash ---- */

  const buildSplash = () => {
    destroyGameOver();
    destroyYouWin();
    destroyRulesScreen();

    splashMain = buildDom(`
      <main class="start-main">
        <section class="start-section">
          <h1>Midnight Hunter</h1>
          <button class="start-button button">Start game</button>
          <button class="rules button">Rules</button>
          <img class="start-heart" src="images/heart.png"/>
        </section>
      </main>
    `);

    document.body.appendChild(splashMain);

    const button = splashMain.querySelector('.start-button');
    button.addEventListener('click', buildGame);

    const buttonRules = splashMain.querySelector('.rules');
    buttonRules.addEventListener('click', buildRulesScreen);
  }

  const destroySplash = () => {
    splashMain.remove();
  }

  const buildRulesScreen = () => {
    destroySplash();

    rulesMain = buildDom(`
      <main class="rules-screen">
        <div class="description container">
          <div class="button-esc">
            <button class="esc">x</button>
          </div>
          <h1>Endless love is in the air</h1>
          <div class="text-and-rules">
            <div class="text">
              <p class="game-intro">Find the love of your life!</p>
              <p>Hunt and catch your true love.</p>
              <p>Only, love don't come easy!!!</p> 
            </div>
            <div class="rules">
              <ul>
                <li><p>You win the game when you've hit on the singles.</p></li>
                <li><p>You lose a life each time you get caught by your crazy ex.</p></li>
              </ul>
            </div>
          </div>
          <div class="images">
            <div class="enemies">
              <h2>Stay away of jealous ex boyfriends or crazy ex wives!</h2>
              <div class="ex-images">
                <img class="image-border" src="./images/angry-ex.jpg">
                <img class="image-border" src="./images/scary-ex.jpg">
                <img class="image-border" src="./images/desperate-ex.jpg">
              </div>
              <p>Move around with <strong>UP</strong>, <strong>DOWN</strong>, <strong>RIGHT</strong> and <strong>LEFT</strong> keys.</p>
            </div>
          </div>
        </div>
      </main>
    `);

    document.body.appendChild(rulesMain);

    const returnSplash = rulesMain.querySelector('.esc');
    returnSplash.addEventListener('click', buildSplash);
  }

  const destroyRulesScreen = () => {
    if (rulesMain) {
      rulesMain.remove();
    }
  }

  /* ---- Game ---- */

  const buildGame = () => {
    destroySplash();
    
    game = new Game();
    game.onOver(destroyGame);
    game.start();
    
  }

  const destroyGame = status => {
    game.destroy();

    if (status === 'lose') {
      buildGameOver();
    } else if (status === 'win') {
      buildYouWin();
    }

  }

  /* ---- Game Over ---- */

  const buildGameOver = () => {

    gameOverMain = buildDom(`
      <main class="game-over-screen">
        <div class="game-over">
          <div class="inner-container">
            <h1>Game over</h1>
            <p>Oh noooo, toxic people can ruin your life.</p>
            <p>Better luck next time!</p>
            <button class="restart-button button">Play Again</button>
            <img class="image-game-over" src="./images/toxic-gas-mask-clipart-at-picture-26.png"/>
          </div>
        </div>
      </main>
    `);
    document.body.appendChild(gameOverMain);

    const button = gameOverMain.querySelector('button');
    button.addEventListener('click', buildSplash);
  }

  const destroyGameOver = () => {
    if(gameOverMain) {
      gameOverMain.remove();
    }
  }

  /* --- You Win ---- */

  const buildYouWin = () => {

    youWinMain = buildDom(`
      <main class="you-win-screen">
        <div class="you-win">
          <h1>You win</h1>
          <p>Congratulations! You found true love at midnight.</p>
          <p>Make it last!</p>
          <button class="restart-button button">Play Again</button>
          <img class="love-doves" src="./images/png-love.png"/>
        </div>
      </main>
    `);
    document.body.appendChild(youWinMain);

    const button = youWinMain.querySelector('button');
    button.addEventListener('click', buildSplash);

  }

  const destroyYouWin = () => {
    if(youWinMain) {
      youWinMain.remove();
    }
  }

  buildSplash();

}

window.addEventListener('load', main);