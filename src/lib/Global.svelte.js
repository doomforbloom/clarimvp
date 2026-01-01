let typingMode = false;
let currLayer = document.cookie
    ? parseInt(document.cookie)
    : 0;

export function setTypingMode(mode) {
    typingMode = mode;
}
export function getCurrLayer() {
    return currLayer;
}
export function setCurrLayer(layer) {
    currLayer = layer;
    document.cookie = getCurrLayer().toString();
    location.reload();
}
export function getTypingMode() {
    return typingMode;
}

