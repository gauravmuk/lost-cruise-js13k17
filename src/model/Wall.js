var colors = ['black', '#18FF6D'];

function Wall(options) {
    options = options || {};
    this.isMovementHappening = options.isMovementHappening || false;
    this.shiftDelta = options.isMovementHappening ? 0 : 250;
    this.x = options.x || WallsController.decideWallXPosition(this.shiftDelta);
    this.y = options.y || randomNumber(0, GameFactory.viewPortHeight);
    this.width = options.width || 25;
    this.height = options.height || 25;
    this.showPortal = false;
    this.portalColor = colors[randomNumber(0, colors.length - 1)];
    this.color = '#ffffff';
    this.alive = true;
    this.chanceOfRecovery = Math.random();
    this.isLost = GameFactory.isLost || false;
    this.scored = false;
}

Wall.prototype.paint = function () {
    var currentColor;
    var $el;
    if (!this.hide) {
        if (GameFactory.isLost) {
            if (this.showPortal && this.chanceOfRecovery > 0.5) {
                currentColor = 'white';
                $el = $('#pw');
            } else {
                currentColor = 'black';
                $el = $('#pb');
            }
        } else if (this.showPortal) {
            currentColor = this.portalColor;
            if (this.portalColor === 'black') {
                $el = $('#pb');
            } else {
                $el = $('#po');
            }
        } else {
            currentColor = this.color;
        }

        if (GameFactory.ship.x > canvas.width / 2) {
            this.x = this.x - 10;
        }

        if (!this.showPortal) {
            ctx.beginPath();
            ctx.fillStyle = currentColor;
            ctx.fillRect(this.x, this.y, this.width / 2, this.height / 4);
            ctx.fillRect(this.x + this.width / 2, this.y, this.width / 2, this.height / 4);

            ctx.fillRect(this.x, this.y + this.height / 4, this.width / 3, this.height / 4);
            ctx.fillRect(this.x + this.width / 3, this.y + this.height / 4, this.width / 3, this.height / 4);
            ctx.fillRect(this.x + 2 * this.width / 3, this.y + this.height / 4, this.width / 3, this.height / 4);

            ctx.fillRect(this.x, this.y + this.height / 2, this.width / 2, this.height / 4);
            ctx.fillRect(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, this.height / 4);

            ctx.fillRect(this.x, this.y + 3 * this.height / 4, this.width / 3, this.height / 4);
            ctx.fillRect(this.x + this.width / 3, this.y + 3 * this.height / 4, this.width / 3, this.height / 4);
            ctx.fillRect(this.x + 2 * this.width / 3, this.y + 3 * this.height / 4, this.width / 3, this.height / 4);
            ctx.fill();
            ctx.closePath();
        } else {
            ctx.drawImage($el, this.x, this.y, 25, 40);
        }
    }
};