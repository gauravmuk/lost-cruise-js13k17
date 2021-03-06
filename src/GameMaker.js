var ctx;
var canvas;

function bootstrap() {
    if (GameFactory.state !== 'INTRO') {
        GameFactory.addShip();
        GameFactory.addWalls();
        GameFactory.background.paint();
        GameFactory.ship.paint();
        GameFactory.paintWalls();
        GameFactory.validateWalls();
        GameFactory.initCollisionManager();
    }
}

function initEngine() {
    canvas = D.createElement('canvas');
    canvas.width = GameFactory.viewPortWidth;
    canvas.height = GameFactory.viewPortHeight;

    D.body.appendChild(canvas);

    GameFactory.addCanvas($('canvas'));
    GameFactory.addBackground();

    GameFactory.introScreen();

    bootstrap();

    runFPS();
}

D.body.onload = initEngine;
