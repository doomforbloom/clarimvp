import { Container, Graphics } from "pixi.js";

export default function HUD() {
    const hud = new Container();

    const redRectangle = new Graphics()
        .rect(50, 50, 100, 100)
        .fill(0xff0000)
        .circle(200, 200, 50)
        .stroke(0x00ff00)
        .setStrokeStyle(5)
        .moveTo(300, 300)
        .lineTo(400, 400);

    hud.addChild(redRectangle);

    return hud;
}