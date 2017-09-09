function CollisionManager() {

}

CollisionManager.prototype.rectanglesCollide = function (rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y;
};

CollisionManager.prototype.wallBulletCollision = function () {
    for (var j = 0; j < GameFactory.walls.length; j++) {
        if (!GameFactory.walls[j].showPortal) {
            for (var i = 0; i < GameFactory.ship.bullets.length; i++) {
                var currentBullet = GameFactory.ship.bullets[i];
                if (currentBullet.alive) {
                    var currentWall = GameFactory.walls[j];
                    if (this.rectanglesCollide(currentBullet, currentWall)) {
                        currentWall.showPortal = true;
                    }
                }
            }
        }
    }
};

CollisionManager.prototype.shipWallCollision = function () {
    for (var j = 0; j < GameFactory.walls.length; j++) {
        if (!GameFactory.walls[j].showPortal) {
            if (this.rectanglesCollide(GameFactory.ship, GameFactory.walls[j])) {
                console.info('Game Over');
            }
        } else {
            if (this.rectanglesCollide(GameFactory.ship, GameFactory.walls[j])) {
                if (GameFactory.isLost && GameFactory.walls[j].chanceOfRecovery > 0.5) {
                    GameFactory.undoPortalMode();
                } else {
                    GameFactory.setPortalMode();
                }
            }
        }
    }
};