var ctx;
var canvas;

function bootstrap() {
    if (GameFactory.state !== 'INTRO') {
        GameFactory.addShip();
        GameFactory.addWalls();
        GameFactory.initCamera();


        GameFactory.background.paint();
        GameFactory.ship.paint();
        GameFactory.paintWalls();
        GameFactory.validateWalls();
        GameFactory.initCollisionManager();
    }
}

function initEngine() {
    canvas = document.createElement('canvas');
    canvas.width = GameFactory.viewPortWidth;
    canvas.height = GameFactory.viewPortHeight;

    document.body.appendChild(canvas);

    GameFactory.addCanvas(document.querySelector('canvas'));
    GameFactory.addBackground();

    GameFactory.introScreen();

    bootstrap();

    runFPS();
}

document.body.onload = initEngine;
