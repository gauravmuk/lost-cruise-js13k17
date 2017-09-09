function Background() {
    this.width = GameFactory.viewPortWidth;
    this.height = GameFactory.viewPortHeight;
    this.color = '#40a4df';
}

Background.prototype.paint = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.fill();
};