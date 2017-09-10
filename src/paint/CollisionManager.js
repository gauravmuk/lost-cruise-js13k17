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
        if (!GameFactory.walls[j].showPortal && !GameFactory.walls[j].hide) {
            for (var i = 0; i < GameFactory.ship.bullets.length; i++) {
                var currentBullet = GameFactory.ship.bullets[i];
                if (currentBullet.alive) {
                    var currentWall = GameFactory.walls[j];
                    if (this.rectanglesCollide(currentBullet, currentWall)) {
                        currentWall.showPortal = true;
                        if (!GameFactory.walls[j].scored) {
                            GameFactory.walls[j].scored = true;
                            GameFactory.score++;
                        }
                    }
                }
            }
        }
    }
};

CollisionManager.prototype.shipWallCollision = function () {
    for (var j = 0; j < GameFactory.walls.length; j++) {
        if (!GameFactory.walls[j].hide) {
            if (!GameFactory.walls[j].showPortal) {
                if (this.rectanglesCollide(GameFactory.ship, GameFactory.walls[j])) {
                    GameFactory.state = 'GAME_OVER';
                    alert('Game Over! Your score is: ' + GameFactory.score);
                    window.location.reload(true);
                }
            } else {
                if (this.rectanglesCollide(GameFactory.ship, GameFactory.walls[j])) {
                    if (GameFactory.isLost && GameFactory.walls[j].chanceOfRecovery > 0.5) {
                        GameFactory.undoPortalMode();
                        GameFactory.walls[j].hide = true;
                    } else {
                        if (GameFactory.walls[j].portalColor === 'black') {
                            GameFactory.setLostMode();
                            GameFactory.walls[j].hide = true;
                        } else {
                            GameFactory.activateReverseMode();
                            GameFactory.walls[j].hide = true;
                        }
                    }
                }
            }
        }
    }
};