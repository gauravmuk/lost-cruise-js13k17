function Ship() {
    this.x = 10;
    this.y = 10;
    this.vx = 0;
    this.vy = 0;
    this.defaultSpeed = 4;
    this.speed = 6;
    this.friction = 0.95;
    this.width = 25;
    this.height = 25;
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
    if (GameFactory.isLost) {
        ctx.fillStyle = 'white';
    } else {
        ctx.fillStyle = 'red';
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fill();

    this.paintBullets();
};

Ship.prototype.fireBullets = function () {
    var bullet = new Bullet();
    bullet.init(this.x + this.width, this.y + (this.height / 2), 20);
    this.bullets.push(bullet);
};

Ship.prototype.update = function () {
    this.counter++;

    if (keys[37]) {
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