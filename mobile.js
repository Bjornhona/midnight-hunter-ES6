class Mobile {
    constructor (canvas, x, y, arrow) {

        this.canvasElement = canvas;
        this.arrow = arrow;
        this.x = x;
        this.x = y;
        this.size = 50;
        this.ctx = this.canvasElement.getContext('2d');
        this.arrowUp = new Image();
        this.arrowUp.src = 'images/1513313790emoji-love-cute-png.png';
        this.arrowDown = new Image();
        this.arrowDown.src = 'images/1513313790emoji-love-cute-png.png';
        this.arrowLeft = new Image();
        this.arrowLeft.src = 'images/1513313790emoji-love-cute-png.png';
        this.arrowRight = new Image();
        this.arrowRight.src = 'images/1513313790emoji-love-cute-png.png';
    }

    draw () {

        this.xPosition = this.x - this.size;
        this.yPosition = this.y - this.size;
        if (this.arrow === 'arrowUp') {
            this.ctx.drawImage(this.arrowUp, this.x, (this.yPosition-this.size), this.size, this.size);
        } else if (this.arrow === 'arrowDown') {
            this.ctx.drawImage(this.arrowDown, this.x, this.yPosition, this.size, this.size);
        } else if (this.arrow === 'arrowLeft') {
            this.ctx.drawImage(this.arrowLeft, this.xPosition, (this.yPosition-this.size), this.size, this.size);
        } else if (this.arrow === 'arrowRight') {
            this.ctx.drawImage(this.arrowRight, this.xPosition, this.yPosition, this.size, this.size);
        }
    };

}