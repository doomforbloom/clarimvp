import { Graphics } from "pixi.js";

export default function createNewLayer(color) {
    // create grid 10,000 x 10,000 with lines every 100 pixels
    const grid = new Graphics();
    for (let i = 0; i < 101; i++) {
        grid.moveTo(i * 100, 0).lineTo(i * 100, 10000);
    }

    for (let i = 0; i < 101; i++) {
        grid.moveTo(0, i * 100).lineTo(10000, i * 100);
    }
    grid.stroke({
        color: color,
        pixelLine: true
    });
}
