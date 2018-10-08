'use strict';

class Player {
    constructor (canvas, loves, lives) {

        this.canvasElement = canvas;
        this.x = this.canvasElement.width / 2;
        this.y = this.canvasElement.height - 30;
        this.dx = 0;
        this.dy = 0;
        this.size = 50;
        this.speed = 5;
        this.loves = loves;
        this.lives = lives;
        this.ctx = this.canvasElement.getContext('2d');
        this.character = new Image();
        this.character.src = 'images/1513313790emoji-love-cute-png.png';
    }

    // Set the player's direction based on a string
    setDirection (dx, dy) {

        this.dx = dx;
        this.dy = dy;

    };

    collidesWithFriend (friend) {
    
        const collidesRight = this.x + this.size / 2 > friend.x - friend.size / 2;
        const collidesLeft = this.x - this.size / 2 < friend.x + friend.size / 2;
        const collidesTop = this.y - this.size / 2 < friend.y + friend.size / 2;
        const collidesBottom = this.y + this.size / 2 > friend.y - friend.size / 2;

        if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
            return true;
    }
    
    return false;
    };

    collidesWithEnemy (enemy) {
        
        const collidesRight = this.x + this.size / 2 > enemy.x - enemy.size / 2;
        const collidesLeft = this.x - this.size / 2 < enemy.x + enemy.size / 2;
        const collidesTop = this.y - this.size / 2 < enemy.y + enemy.size / 2;
        const collidesBottom = this.y + this.size / 2 > enemy.y - enemy.size / 2;

        if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
            return true;
        }
        
        return false;
    };

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

    invertDirection () {

        this.dx = this.dx * -1;
        this.dy = this.dy * -1;
    }

    collidedFriend () {
    
        this.loves--;
    };

    collidedEnemy () {
        
        this.lives--;
    };

    update () {

        this.x = this.x + this.dx * this.speed;
        this.y = this.y + this.dy * this.speed;

        this.checkLimits();
    };

    checkLimits () {

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
    }

    draw () {
        
        // center the center
        this.xPosition = this.x - (this.size/2);
        this.yPosition = this.y - (this.size/2);
        this.ctx.drawImage(this.character, this.xPosition, this.yPosition, this.size, this.size);
    };

}