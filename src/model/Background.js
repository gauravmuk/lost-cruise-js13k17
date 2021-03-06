function Background() {
    this.width = GameFactory.viewPortWidth;
    this.height = GameFactory.viewPortHeight;
    this.color = '#2d72da';
    this.isLost = false;
}

Background.prototype.paint = function () {
    if (GameFactory.isLost) {
        ctx.fillStyle = 'black';
    } else {
        ctx.fillStyle = this.color;
    }
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fill();
};