function Wall(options) {
    options = options || {};
    this.isMovementHappening = options.isMovementHappening || false;
    this.shiftDelta = options.isMovementHappening ? 250 : 0;
    this.x = options.x || WallsController.decideWallXPosition(this.shiftDelta);
    this.y = options.y || randomNumber(0, GameFactory.viewPortHeight);
    this.width = options.width || 25;
    this.height = options.height || 25;
    this.showPortal = false;
    this.portalColor = 'black';
    this.color = '#ffffff';
    this.alive = true;
    this.isLost = GameFactory.isLost || false;
}

Wall.prototype.paint = function () {
    if (GameFactory.isLost) {
        ctx.fillStyle = this.showPortal ? this.portalColor : 'black';
    } else if (this.showPortal) {
        ctx.fillStyle = this.portalColor;
    } else {
        ctx.fillStyle = this.color;
    }

    if (GameFactory.ship.x > canvas.width / 2) {
        this.x = this.x - 10;
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();
};

Wall.prototype.destroy = function () {

};

Wall.prototype.revealPortal = function () {

};

Wall.prototype.onCollision = function () {

};