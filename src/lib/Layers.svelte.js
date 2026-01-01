import { Container, Graphics } from "pixi.js";

export default function Layer(color) {

    // create grid 10000 x 10 000 with lines every 100 pixels
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
    grid.x = -5000;
    grid.y = -5000;


    // create container for layer
    const layer = new Container();
    layer.addChild(grid);

    return layer;
}
