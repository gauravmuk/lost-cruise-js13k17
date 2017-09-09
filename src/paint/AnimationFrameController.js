function runFPS() {
    GameFactory.update();
    GameFactory.paint();
    requestAnimationFrame(runFPS);
}