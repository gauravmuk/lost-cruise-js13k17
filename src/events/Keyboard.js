var keys = {};

function onKeyDown(e) {
    keys[e.keyCode] = true;
}

function onKeyUp(e) {
    keys[e.keyCode] = false;
}

addEventListener('keydown', onKeyDown);
addEventListener('keyup', onKeyUp);