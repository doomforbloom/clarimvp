<script>
    import { Application } from "pixi.js";
    import Layer from "./Layers.svelte";
    import nodeBuilder from "./Node.svelte";
    import { getTypingMode } from "./Global.svelte";
    import { setCurrLayer, getCurrLayer } from "./Global.svelte";

    (async () => {
        // create app, init app, add canvas to DOM
        const app = new Application();
        await app.init({ background: "333333", resizeTo: window });
        app.canvas.style.position = "absolute"; //? why
        document.body.appendChild(app.canvas); 

        // create and add a container to the stage
        const colors = ["#f3d3bd", "#d3f3bd", "#bdd3f3", "#f3bdd3"];
        const layer = Layer(colors.at(getCurrLayer() % colors.length));
        app.stage.addChild(layer);

        // generate initial nodes from localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const nodeData = JSON.parse(localStorage.getItem(key));
            if (nodeData.parent === getCurrLayer()) {
                const newNode = nodeBuilder(
                    nodeData.id,
                    nodeData.title,
                    nodeData.content,
                    nodeData.parent ? parseInt(document.cookie) : 0,
                    nodeData.worldX,
                    nodeData.worldY,
                );
                layer.addChild(newNode);
            }
        }

        // listen for dblclicks to add nodes
        window.addEventListener("dblclick", (e) => {
            const worldPos = layer.toLocal({ x: e.x, y: e.y });
            layer.addChild(
                nodeBuilder(
                    crypto.randomUUID(),
                    "",
                    "",
                    getCurrLayer(),
                    worldPos.x,
                    worldPos.y,
                ),
            );
        });

        // listen for keypresses to change layers
        window.addEventListener("keypress", (e) => {
            if (getTypingMode()) {
                return;
            } else {
                if (e.key === "q") {
                    setCurrLayer(getCurrLayer() + 1);
                }
                if (e.key === "e") {
                    setCurrLayer(getCurrLayer() - 1);
                }
            }
        });

        // create and add movement controls
        const keys = {};
        let zoomDelta = 0;

        window.addEventListener("keydown", (e) => {
            keys[e.key.toLowerCase()] = true;
        });

        window.addEventListener("keyup", (e) => {
            keys[e.key.toLowerCase()] = false;
        });

        window.addEventListener("wheel", (e) => {
            zoomDelta += e.deltaY;
        });

        app.ticker.add(() => {
            const speed = 15;
            // wasd movement
            if (getTypingMode()) {
                return;
            } else {
                if (keys.w) layer.y += speed;
                if (keys.s) layer.y -= speed;
                if (keys.a) layer.x += speed;
                if (keys.d) layer.x -= speed;
            }

            // zoom
            if (zoomDelta !== 0) {
                const zoomSpeed = 0.2;
                const scale = zoomDelta > 0 ? 1 - zoomSpeed : 1 + zoomSpeed;

                const newScale = Math.min(
                    3,
                    Math.max(0.1, layer.scale.x * scale),
                );
                layer.scale.set(newScale);

                zoomDelta = 0; // reset
            }
        });
    })();
</script>

<h1>{getCurrLayer()}</h1>