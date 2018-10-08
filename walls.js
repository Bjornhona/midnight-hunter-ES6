'use strict';

class Wall {
    constructor (canvas, x, y, type) {

        this.canvasElement = canvas;
        this.x = x;
        this.y = y;
        this.type = type;
        this.verticalWallImage = new Image();
        this.horizontalWallImage = new Image();
        this.squareWallImage = new Image();
        this.horizontalWallImage.src = 'images/horizontal.png';
        this.verticalWallImage.src = 'images/vertical.png';
        this.squareWallImage.src = 'images/square.png';
        this.ctx = this.canvasElement.getContext('2d');
        if (this.type === 'square') {
            this.width = 150;
            this.height = 150;
        } else if (this.type === 'horizontal') {
            this.width = 150;
            this.height = 75;
        } else if (this.type === 'vertical') {
            this.width = 75;
            this.height = 150;
        }
    }

    draw () {

        this.xPosition = this.x - (this.width/2);
        this.yPosition = this.y - (this.height/2);
        if (this.type === 'horizontal') {
            this.ctx.drawImage(this.horizontalWallImage, this.xPosition, this.yPosition, this.width, this.height);
        } else if (this.type === 'vertical') {
            this.ctx.drawImage(this.verticalWallImage, this.xPosition, this.yPosition, this.width, this.height);
        } else if (this.type === 'square') {
            this.ctx.drawImage(this.squareWallImage, this.xPosition, this.yPosition, this.width, this.height);
        }
    };

}