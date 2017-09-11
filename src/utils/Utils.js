function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playAudio(arr) {
    var soundUrl = jsfxr(arr);
    var player = new Audio();
    player.src = soundUrl;
    player.play();
}

function $(id) {
    return document.querySelector(id);
}