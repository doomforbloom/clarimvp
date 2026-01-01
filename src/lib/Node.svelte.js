import { Container, DOMContainer, Graphics } from "pixi.js";
import { setCurrLayer, setTypingMode } from "./Global.svelte";

export default function nodeBuilder(id, title, content, currParent, worldX, worldY) {
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
    titleContent.onfocus = () => {
        setTypingMode(true);
    };
    titleContent.onblur = () => {
        setTypingMode(false);
        
    };
    divElement.appendChild(titleContent);

    let textContent = document.createElement("textarea");
    textContent.onfocus = () => {
        setTypingMode(true);
    };
    textContent.onblur = () => {
        setTypingMode(false);
    };
    divElement.appendChild(textContent);

    // turn node into pixi.js compatible dom element
    const Node_DOM_Element = new DOMContainer();
    Node_DOM_Element.element = divElement;

    // set position of node
    Node_DOM_Element.x = worldX;
    Node_DOM_Element.y = worldY;

    // button to delete node
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete Node";
    deleteBtn.onclick = () => {
        setTypingMode(false);
        Node_DOM_Element.removeFromParent();
        localStorage.removeItem(id);
    };
    divElement.appendChild(deleteBtn);

    function storeNodeData() {
        const nodeData = {
            id: crypto.randomUUID(),
            title: titleContent.value,
            content: textContent.value,
            parent: currParent,
            children: [],
            worldX: Node_DOM_Element.x,
            worldY: Node_DOM_Element.y,
            sizeX: divElement.style.width,
            sizeY: divElement.style.height,
        };

        localStorage.setItem(nodeData.id, JSON.stringify(nodeData));
    }

    return Node_DOM_Element;
}