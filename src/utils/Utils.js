function pxNumber(number) {
    return number + 'px';
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addStyle(el, options) {
    for (var key in options) {
        var currentOption = options[key];
        currentOption.value = currentOption.addPx ? pxNumber(currentOption.value) : currentOption.value;
        el.style[key] = currentOption.value;
    }
}