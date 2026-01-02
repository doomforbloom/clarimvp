import { Container, DOMContainer, Graphics } from "pixi.js";
import { getCurrLayer, setCurrLayer, setTypingMode } from "./Global.svelte";

// this builds nodes from new data or localStorage
export function nodeBuilder(id, title, content, currParent, worldX, worldY) {
    // div to hold everything
    const divElement = document.createElement("div");
    divElement.style.backgroundColor = "#f3d3bd";
    divElement.style.border = `4px solid #000000`;
    divElement.style.width = `400px`;
    divElement.style.height = `200px`;

    const titleElement = document.createElement("h1");
    titleElement.style.fontSize = "40px";
    titleElement.textContent = title;

    const contentElement = document.createElement("p");
    contentElement.style.fontSize = "25px";
    contentElement.textContent = content;

    divElement.appendChild(titleElement);
    divElement.appendChild(contentElement);

    // arrow to create new layer for node
    let createLayerBtn = document.createElement("button");
    createLayerBtn.textContent = "Create Layer";
    createLayerBtn.onclick = () => {
        storeNodeData();
        setCurrLayer(currParent - 1);
    };
    divElement.appendChild(createLayerBtn);

    // btn to store node data w/o creating a layer
    let storeNodeDataBtn = document.createElement("button");
    storeNodeDataBtn.textContent = "Store Node Data";
    storeNodeDataBtn.onclick = () => {
        storeNodeData();
    };
    divElement.appendChild(storeNodeDataBtn);

    // text to add content directly to node
    let titleContent = document.createElement("input");
    titleContent.type = "text";
    titleContent.value = title;
    titleContent.onfocus = () => {
        setTypingMode(true);
    };
    titleContent.onblur = () => {
        setTypingMode(false);

    };
    divElement.appendChild(titleContent);

    let textContent = document.createElement("textarea");
    textContent.value = content;
    textContent.onfocus = () => {
        setTypingMode(true);
    };
    textContent.onblur = () => {
        setTypingMode(false);
    };
    divElement.appendChild(textContent);

    // turn node into pixi.js compatible dom element
    const pixiNodeElement = new DOMContainer();
    pixiNodeElement.element = divElement;

    // set position of node
    pixiNodeElement.x = worldX;
    pixiNodeElement.y = worldY;

    // button to delete node
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Node";
    deleteBtn.onclick = () => {
        setTypingMode(false);
        deleteNodeData();
    };
    divElement.appendChild(deleteBtn);

    // store node data
    function storeNodeData() {
        const nodeData = {
            id: id,
            title: titleContent.value,
            content: textContent.value,
            parent: currParent,
            children: [],
            worldX: pixiNodeElement.x,
            worldY: pixiNodeElement.y,
            sizeX: divElement.offsetWidth, // number of pixels wide // using .style.width is a string not useful
            sizeY: divElement.offsetHeight,
        };

        localStorage.setItem(nodeData.id, JSON.stringify(nodeData));
    }

    // remove node data
    function deleteNodeData() {
        pixiNodeElement.removeFromParent();
        localStorage.removeItem(id);
    }

    return pixiNodeElement;
}

export function newNode(worldX, worldY) {
    return nodeBuilder(
        crypto.randomUUID(),
        "",
        "",
        getCurrLayer(),
        worldX,
        worldY,
    );
}