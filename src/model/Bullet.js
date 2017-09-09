function Bullet() {
    this.alive = false;
    this.width = 10;
    this.height = 10;
}

Bullet.prototype.init = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
};

Bullet.prototype.paint = function () {
    if (this.alive) {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
};

Bullet.prototype.update = function () {
    if (this.x + this.width > canvas.width || this.y + this.height > canvas.height) {
        this.alive = false;
    } else if (this.alive) {
        this.x += this.speed;
    }
};

