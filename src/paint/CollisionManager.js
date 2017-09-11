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
                    playAudio([3,,0.3742,0.7757,0.3575,0.1445,,-0.0568,,,,,,,,0.3485,0.0426,-0.134,1,,,,,0.61]);
                    setTimeout(function () {
                        alert('Game Over! Your score is: ' + GameFactory.score);
                        location.reload(true);
                    }, 250);
                }
            } else {
                if (this.rectanglesCollide(GameFactory.ship, GameFactory.walls[j])) {
                    if (GameFactory.isLost && GameFactory.walls[j].chanceOfRecovery > 0.5) {
                        playAudio([0,,0.0712,,0.4461,0.2341,,0.4116,,,,,,0.5762,,0.4397,,,1,,,,,0.5]);
                        GameFactory.undoPortalMode();
                        GameFactory.walls[j].hide = true;
                    } else {
                        if (GameFactory.walls[j].portalColor === 'black') {
                            playAudio([1,,0.3881,,0.4212,0.2738,,0.3543,,,,,,,,0.6422,,,1,,,,,0.5]);
                            GameFactory.setLostMode();
                            GameFactory.walls[j].hide = true;
                        } else {
                            playAudio([0,,0.0389,0.5667,0.3495,0.4261,,,,,,0.5479,0.5348,,,,,,1,,,,,0.5]);
                            GameFactory.activateReverseMode();
                            GameFactory.walls[j].hide = true;
                        }
                    }
                }
            }
        }
    }
};