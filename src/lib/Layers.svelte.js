import { Container, Graphics } from "pixi.js";
import { nodeBuilder, newNode } from "./Node.svelte";
import { getCurrLayer, getTypingMode } from "./Global.svelte";

export default function createNewLayer(color) {

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

    // generate initial nodes from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const nodeData = JSON.parse(localStorage.getItem(key));
        if (Number(nodeData.parent) === getCurrLayer()) {
            const newNode = nodeBuilder(
                nodeData.id,
                nodeData.title,
                nodeData.content,
                nodeData.parent,
                nodeData.worldX,
                nodeData.worldY,
            );
            layer.addChild(newNode);
        }
    }

    // listen for click to add new nodes
    window.addEventListener("click", (e) => {
        if (getTypingMode()) {
            return;
        }
        else {
            const worldPos = layer.toLocal({ x: e.x, y: e.y });
            layer.addChild(newNode(
                worldPos.x,
                worldPos.y,
            ));
        }
    });

    return layer;
}
