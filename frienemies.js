'use strict';

class Frienemy {
    constructor (canvas, x, y, role) {

        this.canvasElement = canvas;
        this.size = 40;
        this.y = y;
        this.x = x;
        this.dx = 1;
        this.dy = 0;
        this.speed = 5;
        this.role = role;
        this.enemyImage = new Image();
        this.friendImage = new Image();
        this.enemyImage.src = 'images/angry-512.png';
        this.friendImage.src = 'images/Growing_Pink_Heart_Emoji.png';
        this.ctx = this.canvasElement.getContext('2d');

        this.possibleDirection = [
            [1,0],
            [-1,0],
            [0,1],
            [0, -1]
        ]
    }

    update () {

        if (Math.random() > 0.99) {
            this._getRandomDirection();
        }

        this.x = this.x + this.dx * this.speed;
        this.y = this.y + this.dy * this.speed;
        this.isInScreen();
    };

    _getRandomDirection () {

        const randomIndex = Math.floor(Math.random() * this.possibleDirection.length);

        this.dx = this.possibleDirection[randomIndex][0];
        this.dy = this.possibleDirection[randomIndex][1];
    }

    invertDirection () {

        this.dx = this.dx * -1;
        this.dy = this.dy * -1;
    }

    collidesWithWall (wall) {

        const collidesRight = this.x + this.size / 2 > wall.x - wall.width / 2;
        const collidesLeft = this.x - this.size / 2 < wall.x + wall.width / 2;
        const collidesTop = this.y - this.size / 2 < wall.y + wall.height / 2;
        const collidesBottom = this.y + this.size / 2 > wall.y - wall.height / 2;

        if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
            return true;
        }
        
        return false;
    }

    draw () {

        this.xPosition = this.x - (this.size/2);
        this.yPosition = this.y - (this.size/2);
        if (this.role === 'Enemy') {
            this.ctx.drawImage(this.enemyImage, this.xPosition, this.yPosition, this.size, this.size);
        } else {
            this.ctx.drawImage(this.friendImage, this.xPosition, this.yPosition, this.size, this.size);
        }

    };

    isInScreen () {

        // checks outer walls
        if (this.x < 0) {
            this.dx = 1;
        }
        if (this.x > this.canvasElement.width) {
            this.dx = -1;
        }
        if (this.y < 0) {
            this.dy = 1;
        }
        if (this.y > this.canvasElement.height) {
            this.dy = -1;
        }
    };

}