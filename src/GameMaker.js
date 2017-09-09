var ctx;
var canvas;

function initEngine() {
    canvas = document.createElement('canvas');
    canvas.width = GameFactory.viewPortWidth;
    canvas.height = GameFactory.viewPortHeight;

    document.body.appendChild(canvas);

    GameFactory.addCanvas(document.querySelector('canvas'));
    GameFactory.addBackground();

    GameFactory.addShip();
    GameFactory.addWalls();
    GameFactory.initCamera();


    GameFactory.background.paint();
    GameFactory.ship.paint();
    GameFactory.paintWalls();
    GameFactory.validateWalls();
    GameFactory.initCollisionManager();

    runFPS();
}

document.body.onload = initEngine;
