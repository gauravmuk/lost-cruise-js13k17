function Bullet() {
    this.alive = false;
    this.width = 50;
    this.height = 12;
}

Bullet.prototype.init = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.alive = true;
};

Bullet.prototype.paint = function () {
    var $el;
    if (GameFactory.isLost) {
        $el = document.querySelector('#bullet-lost');
    } else if (this.alive) {
        $el = document.querySelector('#bullet');
    }

    ctx.drawImage($el, this.x, this.y, this.width, this.height);
};

Bullet.prototype.update = function () {
    if (this.x + this.width > canvas.width || this.y + this.height > canvas.height) {
        this.alive = false;
    } else if (this.alive) {
        this.x += this.speed;
    }
};

