function Ship() {
    this.x = 10;
    this.y = 10;
    this.vx = 0;
    this.vy = 0;
    this.defaultSpeed = 4;
    this.speed = 6;
    this.friction = 0.95;
    this.width = 96;
    this.height = 40;
    this.bullets = [];
    this.counter = 0;
    this.fireRate = 15;
    this.isLost = false;
}

Ship.prototype.paintBullets = function () {
    for (var i = 0; i < this.bullets.length; i++) {
        if (!this.bullets[i].alive) {
            this.bullets.splice(i, 1);
        } else {
            this.bullets[i].paint();
        }
    }
};

Ship.prototype.updateBullets = function () {
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].update();
    }
};

Ship.prototype.paint = function () {
    var $el;
    if (GameFactory.isLost) {
        $el = $('#sl');
    } else {
        $el = $('#s');
    }

    ctx.drawImage($el, this.x, this.y, this.width, this.height);

    this.paintBullets();
};

Ship.prototype.fireBullets = function () {
    var bullet = new Bullet();
    playAudio([1,,0.2703,0.2778,0.1181,0.8566,0.2754,-0.272,,,,,,0.1877,0.1543,,,,1,,,,,0.5]);
    bullet.init(this.x + this.width, this.y + (this.height / 2), 20);
    this.bullets.push(bullet);
};

Ship.prototype.update = function () {
    this.counter++;

    if (keys[37] && GameFactory.reverseMode) {
        if (this.vx > -this.speed) {
            this.vx--;
        }
    }

    if (keys[38]) {
        if (this.vy > -this.speed) {
            this.vy--;
        }
    }

    if (keys[39]) {
        if (this.vx < this.speed) {
            this.vx++;
        }
    }

    if (keys[40]) {
        if (this.vy < this.speed) {
            this.vy++;
        }
    }

    if (keys[32] && this.counter >= this.fireRate) {
        this.fireBullets();
        this.counter = 0;
    }

    this.vy *= this.friction;
    this.y += this.vy;

    this.vx *= this.friction;
    this.x += this.vx;

    if (this.x > canvas.width / 2) {

    } else {
        this.x += this.defaultSpeed;
    }

    this.updateBullets();
};